import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Auth callback function (for OAuth)
export function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    if (!code) {
      navigate("/");
      return;
    }
    fetch("http://localhost:3001/auth/github/callback", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Backend endpoint not found or error occurred");
        }
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          localStorage.setItem("githubUser", JSON.stringify(data.user));
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        // Optionally show an error message to the user
        navigate("/");
      });
  }, [navigate, location]);

  return <div>Authenticating...</div>;
}

export default AuthCallback;
