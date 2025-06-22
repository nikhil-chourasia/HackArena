import React, { useState } from "react";

export default function DisplayRepos() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  const fetchRepos = async () => {
    setError("");
    setRepos([]);
    try {
      const response = await fetch(
        `http://localhost:3000/api/repos?username=${username}`
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
      <h2>GitHub User Repositories</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={fetchRepos}>Fetch Repos</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
