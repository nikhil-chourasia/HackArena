import axios from "axios";

// Fetch GitHub user profile
export async function fetchGitHubProfile(username, accessToken) {
  const res = await axios.get(`https://api.github.com/users/${username}`, {
    headers: { Authorization: `token ${accessToken}` },
  });
  return res.data;
}

// Fetch GitHub user repositories
export async function fetchGitHubRepos(username, accessToken) {
  const res = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    {
      headers: { Authorization: `token ${accessToken}` },
    }
  );
  return res.data;
}

// Fetch languages for a repo
export async function fetchRepoLanguages(owner, repo, accessToken) {
  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
    {
      headers: { Authorization: `token ${accessToken}` },
    }
  );
  return res.data;
}

// Fetch contributors for a repo
export async function fetchRepoContributors(owner, repo, accessToken) {
  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/contributors`,
    {
      headers: { Authorization: `token ${accessToken}` },
    }
  );
  return res.data;
}
