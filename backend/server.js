import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import session from "express-session";
import { connectDB } from "./Database.js"; // Import the connectDB function
import user from "./models/user.js";

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
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: "http://localhost:5173/auth/callback",
      },
      {
        headers: { Accept: "application/json" },
      }
    );
    const access_token = tokenRes.data.access_token;
    if (!access_token) {
      return res.status(401).json({
        error: "Bad credentials: Could not obtain access token from GitHub.",
      });
    }
    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${access_token}` },
    });
    const githubUser = userRes.data;
    const userDoc = await user.findOneAndUpdate(
      { githubId: githubUser.id },
      {
        githubId: githubUser.id,
        username: githubUser.login,
        avatarUrl: githubUser.avatar_url,
        name: githubUser.name,
        email: githubUser.email,
        repos: [],
        skills: [],
      },
      { upsert: true, new: true }
    );
    req.session.user = userDoc; // Store user in session
    console.log("User saved to MongoDB:", userDoc);
    res.json({ user: userDoc }); // Return the saved user from MongoDB
  } catch (err) {
    if (
      err.response &&
      err.response.data &&
      err.response.data.error === "bad_verification_code"
    ) {
      return res
        .status(401)
        .json({ error: "Bad credentials: Invalid or expired code." });
    }
    console.error("Token Error:", err.response?.data || err.message);
    res.status(500).json({ error: "GitHub OAuth failed" });
  }
});

app.listen(3001, () => {
  console.log("✅ Backend running at http://localhost:3001");
});
