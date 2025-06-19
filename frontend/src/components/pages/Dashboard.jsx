import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom";
import UserProfile from "./userProfile";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <h1 className="text-white">This is Dashbord</h1>
    <button className="bg-white" onClick={() => navigate("/profile")}>
      Go to Profile
    </button>
      
    </>
  );
}

export default Dashboard