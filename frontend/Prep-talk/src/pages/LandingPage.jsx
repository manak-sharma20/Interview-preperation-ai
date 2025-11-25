// src/pages/LandingPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Sparkles,
  TrendingUp,
  Feather,
  CheckCircle,
  LogIn,
} from "lucide-react";

import HERO_IMG from "../assets/HERO_IMG.png";

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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ⭐ Navbar */}
      

      {/* ⭐ Hero Section */}
      <section className="bg-gray-900 text-white pt-28 pb-32 relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 opacity-20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 opacity-20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-snug tracking-tight">
              Ace Every Interview With
              <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300">
                PrepTalk AI
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              Practice live interview rounds, get personalized feedback, and
              level-up with expert AI coaching.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-10 px-10 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-500 transition shadow-lg flex items-center gap-2 mx-auto md:mx-0"
            >
              <LogIn className="w-5 h-5" /> Start Practicing
            </button>
            <p className="text-gray-400 text-sm mt-2">
              No credit card required.
            </p>
          </div>

          {/* Hero Image */}
          <div className="shadow-2xl rounded-3xl overflow-hidden border border-indigo-700/50 max-w-lg w-full">
            <img src={HERO_IMG} alt="AI Interview Coach" className="w-full" />
          </div>
        </div>
      </section>

      {/* ⭐ Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center">
            Why Choose PrepTalk?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl border-t-4 border-indigo-500 transition text-center"
              >
                <div className="flex justify-center mb-4">{f.icon}</div>
                <h3 className="font-semibold text-xl">{f.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <p className="text-lg font-bold">PrepTalk</p>
        <p className="text-gray-400">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
