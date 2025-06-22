import axios from "axios";

export async function fetchGitHubDetails(accessToken) {
  const headers = { Authorization: `token ${accessToken}` };
  try {
    const { data: user } = await axios.get("https://api.github.com/user", {
      headers,
      withCredentials: true,
    });
    const { data: followers } = await axios.get(user.followers_url, {
      headers,
      withCredentials: true,
    });
    const { data: following } = await axios.get(
      `https://api.github.com/users/${user.login}/following`,
      { headers, withCredentials: true }
    );
    const { data: repos } = await axios.get(
      "https://api.github.com/user/repos?per_page=100",
      { headers, withCredentials: true }
    );

    const repoDetails = await Promise.all(
      repos.map(async (repo) => {
        const [languageRes, contributorsRes] = await Promise.all([
          axios.get(repo.languages_url, { headers, withCredentials: true }),
          axios.get(repo.contributors_url, { headers, withCredentials: true }),
        ]);
        return {
          id: repo.id,
          name: repo.name,
          html_url: repo.html_url,
          languages: Object.keys(languageRes.data),
          contributors: contributorsRes.data.map((c) => ({
            login: c.login,
            html_url: c.html_url,
            avatar_url: c.avatar_url,
          })),
        };
      })
    );

    return {
      profile: {
        username: user.login,
        name: user.name,
        html_url: user.html_url,
        avatarUrl: user.avatar_url,
        bio: user.bio,
        location: user.location,
        email: user.email,
        blog: user.blog,
        company: user.company,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
      },
      followers: followers.map((f) => f.login),
      following: following.map((f) => f.login),
      repos: repoDetails,
    };
  } catch (error) {
    return { error: error.message || "Failed to fetch GitHub details." };
  }
}
