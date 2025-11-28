// src/pages/LandingPage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  TrendingUp,
  Feather,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import HERO_IMG from "../assets/HERO_IMG.png";

const FEATURES = [
  {
    icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
    title: "Instant AI Feedback",
    description:
      "Get detailed critiques on your responses, tone, and structure instantly.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
    title: "Performance Analytics",
    description:
      "Track your progress and identify areas for improvement with detailed insights.",
  },
  {
    icon: <Feather className="w-6 h-6 text-indigo-600" />,
    title: "Custom Scenarios",
    description:
      "Practice behavioral, HR, and technical rounds tailored to your role.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-indigo-600" />,
    title: "Confidence Booster",
    description:
      "Build fluency and clarity with realistic mock interview simulations.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-8">
            <span className="flex w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
            AI-Powered Interview Coach
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 text-balance">
            Master your next interview with <span className="text-indigo-600">confidence.</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Practice live interview rounds, get personalized feedback, and level up your career with expert AI coaching.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition shadow-sm flex items-center justify-center gap-2"
            >
              Start Practicing <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition flex items-center justify-center"
            >
              Log In
            </button>
          </div>
        </div>
      </section>

      {/* Hero Image / Demo */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
            <img src={HERO_IMG} alt="App Interface" className="w-full h-auto opacity-90" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Comprehensive tools designed to help you ace every round of your interview process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xl font-bold text-gray-900 mb-4">PrepTalk<span className="text-indigo-600">AI</span></p>
          <p className="text-gray-500">
            © {new Date().getFullYear()} PrepTalk AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
