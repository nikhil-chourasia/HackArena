import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home.jsx";
import HackathonHost from "./components/pages/HackathonHost.jsx";
import Authentication from "./components/Authentication/Authentication.jsx";
import AuthCallback from "./components/Authentication/AuthCallback.jsx";
import Hackathons from "./components/pages/Hackathons.jsx";
import Competitions from "./components/pages/Competitions.jsx"; 
import Conferences from "./components/pages/Conferences.jsx";
import Dashbord from "./components/pages/Dashbord.jsx";
import UserProfile from "./components/User/UserProfile.jsx";
import RepoExplorer from "./components/pages/RepoExplorer.jsx";
import CodeEditor from "./components/pages/CodeEditor.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/host" element={<HackathonHost />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/conferences" element={<Conferences />} />
        <Route path="/code" element={<CodeEditor />} />
        <Route path="/explorer" element={<RepoExplorer />} />
      </Routes>
    </>
  );
}

export default App;
