import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const githubUser = localStorage.getItem("githubUser");
    if (githubUser) {
      navigate("/dashboard");
      console.log(
        "User loged in through browser storage:",
        JSON.parse(githubUser)
      );
    } else {
      const code = new URLSearchParams(window.location.search).get("code");
      console.log("GitHub auth code:", code);
      if (code) {
        axios
          .get(`http://localhost:3001/auth/github/token?code=${code}`)
          .then((res) => {
            if (res.data.user) {
              // Store user and accessToken together
              const userWithToken = {
                ...res.data.user,
                accessToken: res.data.access_token || code,
              };
              localStorage.setItem("githubUser", JSON.stringify(userWithToken));
              navigate("/dashboard");
              console.log("User logged in though Token:", userWithToken);
            } else {
              navigate("/");
            }
          })
          .catch(() => {
            navigate("/");
          });
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  return <p>Logging in...</p>;
}

export default AuthCallback;
