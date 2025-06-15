import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
    <div className="text-2xl font-bold">
      <Link to="/" className="hover:text-blue-400 transition-colors">
        HackArena
      </Link>
    </div>
    <ul className="flex space-x-8 text-lg">
      <li>
        <Link
          to="/hackathons"
          className="hover:text-blue-400 transition-colors"
        >
          Find Hackathons
        </Link>
      </li>
      <li>
        <Link to="/host" className="hover:text-blue-400 transition-colors">
          Host Hackathon
        </Link>
      </li>
      <li>
        <Link to="/profile" className="hover:text-blue-400 transition-colors">
          Profile
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
