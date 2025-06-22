import express from "express";
import crypto from "crypto";
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌ Missing CLIENT_ID or CLIENT_SECRET in environment variables.");
}

// Returns the user session if authenticated
router.get("/auth/user", (req, res) => {
  if (req.session?.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// Step 1: Redirect to GitHub OAuth with required parameters and state
router.get("/", (req, res) => {
  const redirect_uri = "http://localhost:5173/auth/callback";
  const state = crypto.randomBytes(16).toString("hex");
  req.session.oauthState = state;
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&state=${state}&scope=read:user`;
  res.redirect(githubAuthURL);
});

// Step 2: Exchange code for access token, validate state, fetch user, save session
router.post("/callback", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "No code provided" });

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
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
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token)
      return res.status(401).json({ error: "Token exchange failed", details: tokenData });

    // Fetch user info
    const userRes = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    if (!userRes.ok) {
      return res.status(500).json({ error: "Failed to fetch user profile" });
    }
    const githubUser = await userRes.json();

    // Save/update user in DB
    const userModel = (await import("./models/user.js")).default;
    const userDoc = await userModel.findOneAndUpdate(
      { githubId: githubUser.id },
      {
        githubId: githubUser.id,
        username: githubUser.login,
        avatarUrl: githubUser.avatar_url,
        name: githubUser.name,
        email: githubUser.email || null,
      },
      { upsert: true, new: true }
    );
    req.session.user = userDoc;
    req.session.accessToken = tokenData.access_token;
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: "Session save failed" });
      }
      res.json({ user: userDoc, access_token: tokenData.access_token });
    });
  } catch (err) {
    console.error("GitHub OAuth failed:", err);
    res.status(500).json({ error: "GitHub OAuth failed", details: err.message });
  }
});

export default router;