import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home.jsx";
import Navbar from "./components/pages/Navbar.jsx";
import HackathonHost from "./components/pages/HackathonHost.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host" element={<HackathonHost />} />
      </Routes>
    </>
  );
}

export default App;
