import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home.jsx";
import Navbar from "./components/pages/Navbar.jsx";
import HackathonHost from "./components/pages/HackathonHost.jsx";
import Hackathons from "./components/pages/Hackathons.jsx";
import Competitions from "./components/pages/Competitions.jsx"; 
import Conferences from "./components/pages/Conferences.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host" element={<HackathonHost />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/conferences" element={<Conferences />} />
      </Routes>
    </>
  );
}

export default App;
