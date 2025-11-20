import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, TrendingUp, Feather, CheckCircle, LogIn, Menu, X } from "lucide-react";

// Hero Image Placeholder
const HERO_IMAGE_URL = "https://placehold.co/800x450/1f2937/d1d5db?text=AI+Interview+Coach";

// Features List
const FEATURES = [
  {
    icon: <Sparkles className="w-8 h-8 text-indigo-500" />,
    title: "Instant AI Feedback",
    description:
      "Receive detailed critiques on your responses, tone, confidence, and structure instantly.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-indigo-500" />,
    title: "Performance Analytics",
    description:
      "Track progress, identify weaknesses, and improve with role-specific insights.",
  },
  {
    icon: <Feather className="w-8 h-8 text-indigo-500" />,
    title: "Custom Scenarios",
    description:
      "Practice behavioral, HR, and technical rounds designed for your job position.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-indigo-500" />,
    title: "Confidence Booster",
    description:
      "Use realistic mock interviews to build clarity, fluency, and confidence.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 bg-white shadow-sm border-b z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-indigo-600">InterviewPrepAI</h1>

          <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <Link to="/login" className="hover:text-indigo-600">Login</Link>
            <Link to="/signup" className="hover:text-indigo-600">Sign Up</Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t shadow-sm py-4 px-4 flex flex-col space-y-3">
            <Link
              to="/login"
              onClick={() => setMobileMenu(false)}
              className="text-gray-800 py-2 border-b"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileMenu(false)}
              className="text-gray-800 py-2 border-b"
            >
              Sign Up
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white pt-20 pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 opacity-20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 opacity-20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-5xl font-extrabold leading-tight">
              Ace Every Interview With
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300 ml-2">
                AI Coaching
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Practice, analyze, and improve with personalized AI-powered interview training.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-10 px-10 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-500 transition shadow-lg flex items-center gap-2 mx-auto md:mx-0"
            >
              <LogIn className="w-5 h-5" /> Start Practicing
            </button>
            <p className="text-gray-400 text-sm mt-2">No credit card required.</p>
          </div>

          {/* Hero Image */}
          <div className="shadow-2xl rounded-3xl overflow-hidden border border-indigo-700/40 max-w-lg w-full">
            <img
              src={HERO_IMAGE_URL}
              alt="AI Interview Coach"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-900">Why Choose Us?</h2>
          <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto text-lg">
            Our AI-powered platform simulates real interviews and helps you master every round.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            {FEATURES.map((f, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition border-t-4 border-indigo-500 text-center"
              >
                <div className="flex justify-center mb-4">{f.icon}</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center mt-10">
        <p className="text-lg font-bold mb-2">InterviewPrepAI</p>
        <p className="text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;