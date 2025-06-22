import express from "express";
const router = express.Router();

router.get("/api/repos", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username" });
  try {
    const url = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Github API error: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
