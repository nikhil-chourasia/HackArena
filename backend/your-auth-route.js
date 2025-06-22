import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/auth/github/token", async (req, res) => {
  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        redirect_uri: "http://localhost:5173/auth/callback",
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    // Log the full response for debugging
    console.log("GitHub token response:", response.data);

    if (response.data.error) {
      console.error("GitHub OAuth error:", response.data);
      return res.status(401).json({
        message: "GitHub auth failed: " + response.data.error_description,
      });
    }

    // Success: send token to frontend or start session
    res.json(response.data);
  } catch (err) {
    console.error("Token exchange failed:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error during token exchange" });
  }
});

export default router;
