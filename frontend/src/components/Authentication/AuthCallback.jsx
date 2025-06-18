import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const githubUser = localStorage.getItem("githubUser");
    if (githubUser) {
      navigate("/dashbord");
    } else {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        axios
          .get(`http://localhost:3001/auth/github/token?code=${code}`)
          .then((res) => {
            if (res.data.user) {
              localStorage.setItem("githubUser", JSON.stringify(res.data.user));
              navigate("/dashbord");
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
