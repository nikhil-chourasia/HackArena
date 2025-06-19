import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import UserProfile from "./userProfile";

function Navbar() {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path
      ? "active-event-slider text-black opacity-100"
      : "";
  const isActiveLink = (path) =>
    location.pathname === path
      ? "active-link text-black opacity-100"
      : "text-white opacity-90";

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-[#18181b] shadow-md">
      <div>
        <Link to="/">
          <h1 className="logo text-white text-2xl font-bold tracking-tight">
            HackArena
          </h1>
        </Link>
      </div>
      <div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/hackathons"
              className={`px-4 py-2 rounded-lg text-base transition-colors duration-200 ${isActiveLink(
                "/hackathons"
              )} hover:bg-white/10`}
            >
              Hackathons
            </Link>
          </li>
          <li>
            <Link
              to="/competitions"
              className={`px-4 py-2 rounded-lg text-base transition-colors duration-200 ${isActiveLink(
                "/competitions"
              )} hover:bg-white/10`}
            >
              Competitions
            </Link>
          </li>
          <li>
            <Link
              to="/conferences"
              className={`px-4 py-2 rounded-lg text-base transition-colors duration-200 ${isActiveLink(
                "/conferences"
              )} hover:bg-white/10`}
            >
              Conferences
            </Link>
          </li>
        </ul>
      </div>
      <div>
        {/* <UserProfile /> */}
      </div>
    </nav>
  );
}

export default Navbar;
