import React, { useState } from "react";

export default function DisplayRepos({ onRepoClick }) {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  const fetchRepos = async () => {
    setError("");
    setRepos([]);
    try {
      const response = await fetch(
        "http://localhost:3001/auth/github/repos", // Update to your backend endpoint
        { credentials: "include" } // Important for session cookies
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>My GitHub Repositories</h2>
      <button onClick={fetchRepos}>Fetch My Repos</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onRepoClick && onRepoClick(repo);
              }}
            >
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
