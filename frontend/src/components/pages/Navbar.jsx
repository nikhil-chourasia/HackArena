import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
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
          <li>
            <a
              href="http://localhost:3001/auth/github"
              className="px-4 py-2 rounded-lg text-base transition-colors duration-200 text-white bg-green-700 hover:bg-green-800"
            >
              Login with GitHub
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
