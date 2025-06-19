import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home.jsx";
import HackathonHost from "./components/pages/HackathonHost.jsx";
import AuthCallback from "./components/Authentication/AuthCallback.jsx";
import Hackathons from "./components/pages/Hackathons.jsx";
import Competitions from "./components/pages/Competitions.jsx";
import Conferences from "./components/pages/Conferences.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import UserProfile from "./components/pages/userProfile.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/host" element={<HackathonHost />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/conferences" element={<Conferences />} />
      </Routes>
    </>
  );
}

export default App;
