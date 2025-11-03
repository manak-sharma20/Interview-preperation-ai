import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, LogIn, CheckCircle, TrendingUp, Feather, X, Menu } from 'lucide-react';

// --- Mock Data and Utilities (Since external files are not available) ---

// Placeholder image URL to simulate the hero image
const HERO_IMAGE_URL = "https://placehold.co/800x450/1f2937/d1d5db?text=AI+Interview+Coach";

// Feature data for the main value proposition
const APP_FEATURES = [
  {
    icon: <Sparkles className="w-8 h-8 text-indigo-400" />,
    title: "Instant AI Feedback",
    description: "Receive detailed, data-driven critiques on your answers, tone, and body language immediately.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-indigo-400" />,
    title: "Performance Analytics",
    description: "Track your progress over time with insights on confidence, clarity, and keyword optimization.",
  },
  {
    icon: <Feather className="w-8 h-8 text-indigo-400" />,
    title: "Customizable Scenarios",
    description: "Practice behavioral, technical, and situational questions tailored to your specific role and industry.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-indigo-400" />,
    title: "Confidence Builder",
    description: "Overcome interview anxiety through realistic simulation and guided confidence-boosting exercises.",
  },
];

// Mock Navigation (since react-router-dom is not available)
const useMockNavigation = () => {
    const [route, setRoute] = useState('/');
    const navigate = (newRoute) => setRoute(newRoute);
    return { route, navigate };
};


// --- Core Components ---

const AuthModal = ({ isOpen, onClose, currentPage, setCurrentPage }) => {
  if (!isOpen) return null;

  const isLogin = currentPage === "Login";

  const handleAuth = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log(`${currentPage} attempt...`);
    onClose();
    // In a real app, this would navigate to the dashboard upon successful auth
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 transform scale-100 transition-transform duration-300">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {isLogin ? "Welcome Back" : "Join Interview Prep AI"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => setCurrentPage("Login")}
            className={`flex-1 py-3 text-lg font-medium transition-colors ${
              isLogin
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setCurrentPage("SignUp")}
            className={`flex-1 py-3 text-lg font-medium transition-colors ${
              !isLogin
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/50"
          >
            {isLogin ? "Log In Securely" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Renamed the main component back to 'App'
const App = () => {
  const { navigate } = useMockNavigation(); // Use mock navigation
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("Login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCTA = () => {
    // In a real app: navigate("/dashboard");
    console.log("Navigating to Dashboard (Mock)");
    setOpenAuthModel(true); // Direct to auth for the demo
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
      <AuthModal
        isOpen={openAuthModel}
        onClose={() => setOpenAuthModel(false)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Header (Sticky and professional) */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-indigo-700 tracking-tight">
            InterviewPrep<span className="text-gray-900">AI</span>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition font-medium">Features</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition font-medium">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition font-medium">Testimonials</a>
            <button
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30"
              onClick={() => {
                setCurrentPage("Login");
                setOpenAuthModel(true);
              }}
            >
              <span className="flex items-center"><LogIn className="w-5 h-5 mr-2" /> Log In</span>
            </button>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <Menu className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 pb-4">
            <div className="flex flex-col space-y-2 px-4">
                <a href="#" className="text-gray-700 hover:text-indigo-600 py-2 border-b border-gray-100">Features</a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 py-2 border-b border-gray-100">Pricing</a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 py-2 mb-2">Testimonials</a>
                <button
                className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all"
                onClick={() => {
                    setCurrentPage("Login");
                    setOpenAuthModel(true);
                    setIsMobileMenuOpen(false);
                }}
                >
                <span className="flex items-center justify-center"><LogIn className="w-5 h-5 mr-2" /> Log In</span>
                </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section (Dark, contrast, and engaging) */}
        <section className="bg-gray-900 text-white pt-20 pb-28 md:pt-32 md:pb-40 overflow-hidden relative">
          {/* Subtle background glow effect for futuristic look */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 opacity-20 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 opacity-15 blur-3xl rounded-full transform translate-x-1/2 translate-y-1/2"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl text-center md:text-left">
                <h1 className="text-5xl sm:text-6xl font-extrabold leading-snug">
                  Master Any Interview with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300">Intelligent Coaching</span>
                </h1>
                <p className="mt-6 text-xl text-gray-300">
                  Step into your next job interview with unshakable confidence. Our AI provides personalized feedback, mock scenarios, and powerful analytics.
                </p>
                <button
                  className="mt-10 px-10 py-4 bg-indigo-600 text-white text-xl font-bold rounded-xl hover:bg-indigo-500 transition-all transform hover:scale-[1.02] active:scale-100 shadow-xl shadow-indigo-600/40"
                  onClick={handleCTA}
                >
                  Start Your Free Session
                </button>
                <p className="mt-3 text-sm text-gray-400">No credit card required.</p>
              </div>

              {/* Hero Image / Placeholder */}
              <div className="mt-12 md:mt-0 w-full max-w-lg shadow-2xl rounded-3xl overflow-hidden border border-indigo-700/50">
                <img
                  src={HERO_IMAGE_URL}
                  alt="AI assistant interacting with a user"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    // Fallback in case the placeholder service is down
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/800x450/4f46e5/ffffff?text=AI+Coach+Graphic";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section (Why Choose Us) */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-indigo-600 font-semibold uppercase tracking-wider flex items-center justify-center mb-2">
                <Sparkles className="w-5 h-5 mr-1" /> The Advantage
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900">
                Level Up Your Interview Game
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Our platform integrates cutting-edge AI to simulate real-world interviews and deliver actionable insights you won't find anywhere else.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {APP_FEATURES.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-500"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50/50 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-bold mb-2">InterviewPrepAI</p>
          <p className="text-gray-400">© 2025 All rights reserved. | Built for future success.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
