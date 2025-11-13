import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Available Foods", path: "/available-foods" },
  ];

  const userLinks = [
    { name: "Add Food", path: "/add-food" },
    { name: "Manage My Foods", path: "/manage-my-foods" },
    { name: "My Requests", path: "/my-food-requests" },
  ];

  const handleLogout = async () => {
    try {
      if (!logoutUser) throw new Error("Logout function not defined");
      await logoutUser();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // NavLink active class helper
  const linkClass = ({ isActive }) =>
    `font-medium transition-colors ${
      isActive ? "text-red-500 border-b-2 border-red-500" : "text-gray-700 hover:text-red-500"
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-teal-600">
          <span role="img" aria-label="logo">🥬</span>
          <span>FeedHope</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.name}
            </NavLink>
          ))}

          {user &&
            userLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClass}>
                {link.name}
              </NavLink>
            ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {!user ? (
            <Link to="/login">
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow">
                Login
              </button>
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user.photoURL || "/default-user.png"}
                alt={user.displayName || user.email}
                className="w-10 h-10 rounded-full border-2 border-teal-500 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
              />

              {/* Dropdown */}
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg py-2 text-gray-700 z-50 transition-all">
                  <li className="px-4 py-2 font-semibold">{user.displayName || user.email}</li>
                  <hr className="my-1" />
                  {userLinks.map((link) => (
                    <li key={link.path}>
                      <NavLink
                        to={link.path}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                  <hr className="my-1" />
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg transition-all">
          <ul className="flex flex-col px-4 py-2 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive ? "text-red-500" : "text-gray-700 hover:text-red-500"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {user &&
              userLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive ? "text-red-500" : "text-gray-700 hover:text-red-500"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}

            {!user && (
              <NavLink
                to="/login"
                className="font-medium text-white bg-red-500 px-4 py-2 rounded-lg shadow text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;