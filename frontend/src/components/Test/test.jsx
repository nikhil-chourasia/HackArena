import React, { useEffect, useState } from "react";

const TestUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    try {
      const storedUser = localStorage.getItem("githubUser");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && typeof parsed === "object") {
          setUser(parsed);
        } else {
          setError("User data in localStorage is invalid.");
        }
      } else {
        setError("No user data found in localStorage.");
      }
    } catch (err) {
      setError("Failed to parse user data from localStorage.");
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <section
      className="user-profile"
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        background: "#18181b",
        color: "#fff",
        borderRadius: 8,
        padding: 24,
      }}
    >
      <h2 className="text-xl font-bold mb-2">MongoDB User Details</h2>
      <ul className="mb-4">
        <li>
          <strong>MongoDB _id:</strong>{" "}
          {user._id || <span style={{ color: "#888" }}>N/A</span>}
        </li>
        <li>
          <strong>GitHub ID:</strong>{" "}
          {user.githubId || <span style={{ color: "#888" }}>N/A</span>}
        </li>
        <li>
          <strong>Username:</strong>{" "}
          {user.username || <span style={{ color: "#888" }}>N/A</span>}
        </li>
        <li>
          <strong>Name:</strong>{" "}
          {user.name || <span style={{ color: "#888" }}>N/A</span>}
        </li>
        <li>
          <strong>Email:</strong>{" "}
          {user.email || <span style={{ color: "#888" }}>N/A</span>}
        </li>
        <li>
          <strong>Avatar URL:</strong>{" "}
          {user.avatarUrl ? (
            <a
              href={user.avatarUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#70c278" }}
            >
              {user.avatarUrl}
            </a>
          ) : (
            <span style={{ color: "#888" }}>N/A</span>
          )}
        </li>
      </ul>
      {user.avatarUrl && (
        <img
          src={user.avatarUrl}
          alt="avatar"
          width={100}
          style={{
            borderRadius: "50%",
            marginBottom: 12,
          }}
        />
      )}
      <h2>
        {user.name || "Unknown"} ({user.username || "Unknown"})
      </h2>
      {user.accessToken && (
        <p>
          Access Token:{" "}
          <span style={{ wordBreak: "break-all" }}>{user.accessToken}</span>
        </p>
      )}
    </section>
  );
};

export default TestUserProfile;
