import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import { connectDB } from "./Database.js";
import user from "./models/user.js";
import {
  fetchGitHubProfile,
  fetchGitHubRepos,
  fetchRepoLanguages,
  fetchRepoContributors,
} from "./fetch.js";

dotenv.config();

connectDB(); // Connect to MongoDB

const app = express();

app.use(
  cors({
    origin: true, // Update with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax", // Use 'lax' for local dev, 'none' for HTTPS
      secure: false, // Set to true if using HTTPS
    },
  })
);

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// STEP 1: Redirect to GitHub OAuth
app.get("/auth/github", (req, res) => {
  const redirect_uri = "http://localhost:5173/auth/callback";
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user`;
  res.redirect(githubAuthURL);
});

// STEP 2: Exchange code for token and return user data
app.get("/auth/github/token", async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res
      .status(400)
      .json({ error: "Missing code parameter from GitHub OAuth callback." });
  }
  try {
    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
          redirect_uri: "http://localhost:5173/auth/callback",
        }),
      }
    );
    const tokenData = await tokenRes.json();
    const access_token = tokenData.access_token;
    if (!access_token) {
      return res.status(401).json({
        error: "Bad credentials: Could not obtain access token from GitHub.",
      });
    }
    // Fetch minimal user info( this will saved in mongoDB)
    const githubUser = await fetchGitHubProfile("user", access_token);
    const userDoc = await user.findOneAndUpdate(
      { githubId: githubUser.id },
      {
        githubId: githubUser.id,
        username: githubUser.login,
        avatarUrl: githubUser.avatar_url,
        name: githubUser.name,
        email: githubUser.email || null, // GitHub may not return email
      },
      { upsert: true, new: true }
    );
    req.session.user = userDoc; // Store user in session
    res.json({ user: userDoc, access_token });
  } catch (err) {
    res.status(500).json({ error: "GitHub OAuth failed" });
  }
});

// Route to get real-time GitHub profile
app.get("/api/github/profile/:username", async (req, res) => {
  try {
    const access_token = req.session.user
      ? req.session.user.access_token
      : null;
    if (!access_token)
      return res.status(401).json({ error: "Not authenticated" });
    const profile = await fetchGitHubProfile(req.params.username, access_token);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Route to get real-time GitHub repos
app.get("/api/github/repos/:username", async (req, res) => {
  try {
    const access_token = req.session.user
      ? req.session.user.access_token
      : null;
    if (!access_token)
      return res.status(401).json({ error: "Not authenticated" });
    const repos = await fetchGitHubRepos(req.params.username, access_token);
    // Optionally, fetch languages and contributors for each repo
    const detailedRepos = await Promise.all(
      repos.map(async (repo) => {
        const languages = await fetchRepoLanguages(
          repo.owner.login,
          repo.name,
          access_token
        );
        const contributors = await fetchRepoContributors(
          repo.owner.login,
          repo.name,
          access_token
        );
        return { ...repo, languages, contributors };
      })
    );
    res.json(detailedRepos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch repos" });
  }
});

app.listen(3001, () => {
  console.log("✅ Backend running at http://localhost:3001");
});
