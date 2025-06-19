const axios = require("axios");

// Fetch GitHub user profile
async function fetchGitHubProfile(username, accessToken) {
  const res = await axios.get(`https://api.github.com/users/${username}`, {
    headers: { Authorization: `token ${accessToken}` },
  });
  return res.data;
}

// Fetch GitHub user repositories
async function fetchGitHubRepos(username, accessToken) {
  const res = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    {
      headers: { Authorization: `token ${accessToken}` },
    }
  );
  return res.data;
}

// Fetch languages for a repo
async function fetchRepoLanguages(owner, repo, accessToken) {
  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
    {
      headers: { Authorization: `token ${accessToken}` },
    }
  );
  return res.data;
}

// Fetch contributors for a repo
async function fetchRepoContributors(owner, repo, accessToken) {
  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/contributors`,
    {
      headers: { Authorization: `token ${accessToken}` },
    }
  );
  return res.data;
}

module.exports = {
  fetchGitHubProfile,
  fetchGitHubRepos,
  fetchRepoLanguages,
  fetchRepoContributors,
};
