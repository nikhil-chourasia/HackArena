import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { useRef, useEffect } from "react";


function Navbar() {
  const location = useLocation();
  const githubUser = JSON.parse(localStorage.getItem("githubUser"));

  const isActive = (path) => location.pathname === path ? "active-event-slider text-black opacity-100" : "";
  const isActiveLink = (path) => location.pathname === path ? "active-link text-black opacity-100" : "text-white opacity-90";
  
  const [profileOpen, setProfileOpen] = useState(false);

  // Close profile dropdown when clicking outside
  // Ref for the dropdown
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-[#18181b] shadow-md">
      <div>
        <Link to="/" className="">
          <h1 className="logo text-white text-2xl font-bold tracking-tight">HackArena</h1>
        </Link>
      </div>
      <div className="event-slider flex items-center">
        <ul className="flex justify-center items-center space-x-6">
          <li className={`flex justify-center items-center ${isActive("/hackathons")}`}>
            <Link
              to="/hackathons"
              className={`nav-link px-4 py-2 rounded-lg text-base transition-colors duration-200 ${isActiveLink("/hackathons")} hover:bg-white/10`}
            >
              Hackathons
            </Link>
          </li>
          <li className={`flex justify-center items-center ${isActive("/competitions")}`}>
            <Link
              to="/competitions"
              className={`nav-link px-4 py-2 rounded-lg text-base transition-colors duration-200 ${isActiveLink("/competitions")} hover:bg-white/10`}
            >
              Competitions
            </Link>
          </li>
          <li className={`flex justify-center items-center ${isActive("/conferences")}`}>
            <Link
              to="/conferences"
              className={`nav-link px-4 py-2 rounded-lg text-base transition-colors duration-200 ${isActiveLink("/conferences")} hover:bg-white/10`}
            >
              Conferences
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav-options flex items-center space-x-8">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="nav-link px-4 py-2 rounded-lg text-base transition-colors duration-200 text-white opacity-90 hover:bg-white/10"
            >
              Past Teammates
            </Link>
          </li>
          <li>
            <Link
              to="/host"
              className="nav-link px-4 py-2 rounded-lg text-base transition-colors duration-200 text-white opacity-90 hover:bg-white/10"
            >
              Notifications
            </Link>
          </li>
        </ul>
        <div className="avatar flex items-center relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="focus:outline-none border-2 border-white rounded-full p-1 hover:border-blue-400 transition"
            style={{ width: 48, height: 48 }}
          >
            <img src={githubUser.avatarUrl} alt="Avatar" className="rounded-full w-10 h-10 object-cover" />
          </button>
          {profileOpen && (
            <div className="h-100 w-50 bg-white shadow-lg rounded-lg p-4 absolute top-12 right-0 z-50 flex flex-col items-center">
              <div className="flex flex-col items-center relative">
                <img
                  src={githubUser.avatarUrl}
                  alt="Profile"
                  className="rounded-full w-20 h-20 mb-3 border-4 border-blue-200 object-cover"
                />
                <h2 className="font-semibold text-lg">{githubUser.username}</h2>
                <a
                  href={githubUser.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mt-2 text-sm underline hover:text-blue-700"
                >
                  View GitHub Profile
                </a>
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
                  onClick={() => setProfileOpen(false)}
                  aria-label="Close profile"
                  type="button"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
