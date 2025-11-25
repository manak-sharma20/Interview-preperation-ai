// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isLandingPage = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo → Dynamic redirect */}
        <Link
          to={token ? "/dashboard" : "/"}
          className="text-2xl font-extrabold tracking-tight text-indigo-600"
        >
          PrepTalk<span className="text-gray-900">AI</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          {!isLandingPage && token && (
            <>
              <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
              <Link to="/my-sessions" className="hover:text-indigo-600">Sessions</Link>
              <Link to="/question-bank" className="hover:text-indigo-600">Question Bank</Link>
              <Link to="/analytics" className="hover:text-indigo-600">Analytics</Link>
            </>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/create-session")}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Start Session
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md border hover:bg-gray-100 flex items-center gap-2 transition"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm py-4 px-4 flex flex-col space-y-3">

          {token && !isLandingPage && (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/my-sessions" onClick={() => setOpen(false)}>Sessions</Link>
              <Link to="/question-bank" onClick={() => setOpen(false)}>Question Bank</Link>
              <Link to="/analytics" onClick={() => setOpen(false)}>Analytics</Link>
            </>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="font-medium"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="font-medium"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/create-session");
                }}
                className="text-left font-medium"
              >
                Start Session
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="text-left font-medium text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
