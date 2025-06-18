import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home.jsx";
import HackathonHost from "./components/pages/HackathonHost.jsx";
import Authentication from "./components/Authentication/Authentication.jsx";
import AuthCallback from "./components/Authentication/AuthCallback.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/home" element={<Home />} />
        <Route path="/host" element={<HackathonHost />} />
      </Routes>
    </>
  );
}

export default App;
