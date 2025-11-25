import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login token
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="
      fixed top-0 left-0 right-0 z-50 
      bg-white/70 backdrop-blur-xl 
      border-b border-gray-200/50 shadow-sm
    ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-tight text-primary hover:text-primary/80 transition"
          >
            PrepTalk<span className="text-black">AI</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-10">
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#how-it-works" className="nav-link">
              How It Works
            </a>
            <a href="#pricing" className="nav-link">
              Pricing
            </a>
          </nav>

          {/* Buttons (Hide when logged in) */}
          {!isLoggedIn && (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="small">
                  Sign In
                </Button>
              </Link>
              <Link to="/signUp">
                <Button variant="primary" size="small">
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu (basic) */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary transition">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Reusable nav-link style */}
      <style>{`
        .nav-link {
          color: #4b5563;
          font-weight: 500;
          transition: 0.25s ease;
        }

        .nav-link:hover {
          color: var(--primary);
        }
      `}</style>
    </header>
  );
};

export default Header;
