// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-indigo-600">PrepTalk<span className="text-gray-900">AI</span></Link>
          <nav className="hidden md:flex gap-4">
            <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
            <Link to="/my-sessions" className="text-gray-700 hover:text-indigo-600">Sessions</Link>
            <Link to="/question-bank" className="text-gray-700 hover:text-indigo-600">Question Bank</Link>
            <Link to="/analytics" className="text-gray-700 hover:text-indigo-600">Analytics</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {!token ? (
            <Link to="/login" className="px-4 py-2 rounded-lg bg-indigo-600 text-white flex items-center gap-2">
              <LogIn className="w-4 h-4" /> Log in
            </Link>
          ) : (
            <>
              <button
                onClick={() => navigate("/create-session")}
                className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
              >
                Start Session
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
