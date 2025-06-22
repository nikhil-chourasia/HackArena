import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home.jsx";
import HackathonHost from "./components/pages/HackathonHost.jsx";
import Hackathons from "./components/pages/Hackathons.jsx";
import Competitions from "./components/pages/Competitions.jsx";
import Conferences from "./components/pages/Conferences.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import TestUserProfile from "./components/Test/test.jsx";
import DisplayRepos from "./components/Test/RepoFetch.jsx";
import CodeWindow from "./components/pages/CodeWindow.jsx";
import { AuthCallback } from "./components/callbacks/authCallback.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/host" element={<HackathonHost />} />
      <Route path="/hackathons" element={<Hackathons />} />
      <Route path="/competitions" element={<Competitions />} />
      <Route path="/conferences" element={<Conferences />} />
      <Route path="/code" element={<CodeWindow />} />
      <Route path="/test" element={<TestUserProfile />} />
      <Route path="/Repo" element={<DisplayRepos />} />
    </Routes>
  );
}

export default App;
