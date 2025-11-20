import React from "react";
import { Sparkles, BookOpen, ClipboardList, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-12 px-8 shadow-lg">
        <h1 className="text-4xl font-extrabold mb-2">Welcome back 👋</h1>
        <p className="text-lg opacity-90">
          Continue your interview preparation journey with PrepTalk.
        </p>
      </div>

      {/* Dashboard Sections */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition cursor-pointer"
               onClick={() => navigate("/my-sessions")}>
            <Sparkles className="w-10 h-10 text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold">AI Sessions</h2>
            <p className="text-gray-500 mt-1 text-sm">Practice interviews completed</p>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition cursor-pointer"
               onClick={() => navigate("/question-bank")}>
            <BookOpen className="w-10 h-10 text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold">Saved Questions</h2>
            <p className="text-gray-500 mt-1 text-sm">Your personal library</p>
            <p className="text-3xl font-bold mt-2">34</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition cursor-pointer"
               onClick={() => navigate("/mock-tests")}>
            <ClipboardList className="w-10 h-10 text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold">Mock Tests</h2>
            <p className="text-gray-500 mt-1 text-sm">Completed assessments</p>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition cursor-pointer">
            <Activity className="w-10 h-10 text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold">Performance Score</h2>
            <p className="text-gray-500 mt-1 text-sm">Overall improvement</p>
            <p className="text-3xl font-bold mt-2">82%</p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Start new interview session */}
            <button
              onClick={() => navigate("/create-session")}
              className="bg-indigo-600 text-white py-4 px-6 rounded-2xl shadow hover:bg-indigo-700 transition font-medium"
            >
              Start AI Interview
            </button>

            {/* View question bank */}
            <button
              onClick={() => navigate("/question-bank")}
              className="bg-white border py-4 px-6 rounded-2xl shadow hover:shadow-lg transition font-medium"
            >
              View Question Bank
            </button>

            {/* Analytics */}
            <button
              onClick={() => navigate("/analytics")}
              className="bg-white border py-4 px-6 rounded-2xl shadow hover:shadow-lg transition font-medium"
            >
              Analyze Performance
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 mb-20">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>

          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <ul className="space-y-4">
              <li className="flex justify-between text-gray-700">
                <span>Completed AI Mock Interview - Behavioral Round</span>
                <span className="opacity-70">2 hours ago</span>
              </li>

              <li className="flex justify-between text-gray-700">
                <span>Saved 5 new questions to library</span>
                <span className="opacity-70">Yesterday</span>
              </li>

              <li className="flex justify-between text-gray-700">
                <span>Performance score updated</span>
                <span className="opacity-70">3 days ago</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
