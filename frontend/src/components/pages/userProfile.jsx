import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null); // minimal user info from session
  const [profile, setProfile] = useState(null); // real-time profile info
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    axios
      .get("/api/auth/user")
      .then((res) => {
        setUser(res.data);
        return axios.get(`/api/github/profile/${res.data.username}`);
      })
      .then((res) => {
        setProfile(res.data);
        return axios.get(`/api/github/repos/${res.data.login}`);
      })
      .then((res) => {
        // Ensure repos is always an array
        if (Array.isArray(res.data)) {
          setRepos(res.data);
        } else {
          setRepos([]);
        }
        setLoading(false);
        setShowProfile(true); // Always show profile, no button
      })
      .catch(() => {
        setRepos([]);
        setLoading(false);
        setShowProfile(true); // Always show profile, even on error
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user || !profile) return <div>No user data found.</div>;

  return (
    <div className="user-profile">
      {!showProfile && (
        <button
          onClick={() => setShowProfile(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          Go to Profile
        </button>
      )}
      {showProfile && (
        <div>
          <img src={user.avatarUrl} alt="avatar" width={100} />
          <h2>
            {user.name} ({user.username})
          </h2>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 mt-2 text-sm underline hover:text-blue-100"
          >
            GitHub Profile
          </a>
          <p>Bio: {profile.bio}</p>
          <p>Email: {profile.email}</p>
          <p>
            Blog:{" "}
            <a
              href={profile.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-200"
            >
              {profile.blog}
            </a>
          </p>
          <p>Company: {profile.company}</p>
          <p>Location: {profile.location}</p>
          <p>
            Followers: {profile.followers} | Following: {profile.following}
          </p>
          <p>Public Repos: {profile.public_repos}</p>
          <h3>Repositories</h3>
          <ul>
            {Array.isArray(repos) && repos.length > 0 ? (
              repos.map((repo) => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-200 hover:text-blue-100"
                  >
                    {repo.name}
                  </a>
                  <div>
                    Languages:{" "}
                    {repo.languages
                      ? Object.keys(repo.languages).join(", ")
                      : "N/A"}
                  </div>
                  <div>
                    Contributors:{" "}
                    {repo.contributors && repo.contributors.length > 0
                      ? repo.contributors
                          .map((c) => `${c.login} (${c.id})`)
                          .join(", ")
                      : "N/A"}
                  </div>
                </li>
              ))
            ) : (
              <li>No repositories found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
