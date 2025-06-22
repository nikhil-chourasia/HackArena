import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <h1 className="text-white">This is Dashbord</h1>
      <button className="bg-white" onClick={() => navigate("/profile")}>
        Go to Profile
      </button>
      <br />
      <button className="bg-white" onClick={() => navigate("/test")}>
        Go to Profile 2nd logic
      </button>
      <br />
      <button className="bg-white" onClick={() => navigate("/Repo")}>
        Repo
      </button>
    </>
  );
}

export default Dashboard;
