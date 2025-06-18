import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import avatar from "../../assets/avatar-placeholder.png";

function Navbar() {
  const location = useLocation();
  const githubUser = JSON.parse(localStorage.getItem("githubUser"));

  const isActive = (path) => location.pathname === path ? "active-event-slider text-black opacity-100" : "";
  const isActiveLink = (path) => location.pathname === path ? "active-link text-black opacity-100" : "text-white opacity-90";
  return (
    <nav className="flex justify-between items-center px-[16px]">
    <div className="">
      <Link to="/" className="">
        <h1 className="logo text-white">HackArena</h1>
      </Link>
    </div>
    <div className="event-slider flex items-center space-x-4">
      <ul className="w-[100%] flex justify-center items-center space-x-[20px]">
        <li className={`flex justify-center items-center ${isActive("/hackathons")}`}>
          <Link to="/hackathons" className={`nav-link ${isActiveLink("/hackathons")}`}>Hackathons</Link>
        </li>
        <li className={`flex justify-center items-center ${isActive("/competitions")}`}>
          <Link to="/competitions" className={`nav-link ${isActiveLink("/competitions")}`}>Competitions</Link>
        </li>
        <li className={`flex justify-center items-center ${isActive("/conferences")}`}>
          <Link to="/conferences" className={`nav-link ${isActiveLink("/conferences")}`}>Conferences</Link>
        </li>
      </ul>
    </div>
    <div className="nav-options flex items-center justify-between space-x-12">
      <ul className="flex space-x-12">
        <li>
          <Link to="/" className="nav-link">Past Teammates</Link>
        </li>
        <li>
          <Link to="/host" className="nav-link">Notifications</Link>
        </li>
      </ul>
      <div className="avatar flex items-center">
        <Link to="/profile" className="nav-link">
          <img src={githubUser.avatarUrl} alt="Avatar" className="rounded-full w-[48px]" />
        </Link>
      </div>
    </div>
  </nav>
  )
}

export default Navbar;
