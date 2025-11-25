import React from "react";
import { Sparkles, BookOpen, ClipboardList, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-16 px-8 shadow-xl">
        <h1 className="text-4xl font-extrabold tracking-tight">Welcome back 👋</h1>
        <p className="text-lg opacity-90 mt-1">
          Continue your interview preparation journey with PrepTalk.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-6">

          {[
            {
              title: "AI Sessions",
              subtitle: "Practice interviews completed",
              value: 12,
              icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
              link: "/my-sessions",
            },
            {
              title: "Saved Questions",
              subtitle: "Your personal library",
              value: 34,
              icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
              link: "/question-bank",
            },
            {
              title: "Mock Tests",
              subtitle: "Completed assessments",
              value: 5,
              icon: <ClipboardList className="w-8 h-8 text-indigo-600" />,
              link: "/mock-tests",
            },
            {
              title: "Performance Score",
              subtitle: "Overall improvement",
              value: "82%",
              icon: <Activity className="w-8 h-8 text-indigo-600" />,
            },
          ].map((card, idx) => (
            <div
              key={idx}
              onClick={() => card.link && navigate(card.link)}
              className="bg-white p-7 rounded-3xl border shadow-sm hover:shadow-xl 
                         cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4">{card.icon}</div>
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="text-gray-500 mt-1 text-sm">{card.subtitle}</p>
              <p className="text-4xl font-bold mt-3">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/create-session")}
              className="bg-indigo-600 text-white py-4 px-6 rounded-2xl 
                         shadow hover:bg-indigo-700 hover:shadow-lg transition-all font-medium"
            >
              Start AI Interview
            </button>

            <button
              onClick={() => navigate("/question-bank")}
              className="bg-white border py-4 px-6 rounded-2xl shadow hover:shadow-lg 
                         transition-all font-medium"
            >
              View Question Bank
            </button>

            <button
              onClick={() => navigate("/analytics")}
              className="bg-white border py-4 px-6 rounded-2xl shadow hover:shadow-lg 
                         transition-all font-medium"
            >
              Analyze Performance
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-14 mb-20">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>

          <div className="bg-white p-7 rounded-3xl shadow-sm border">
            <ul className="space-y-4 text-gray-700">

              {[
                {
                  text: "Completed AI Mock Interview - Behavioral Round",
                  time: "2 hours ago",
                },
                {
                  text: "Saved 5 new questions to library",
                  time: "Yesterday",
                },
                {
                  text: "Performance score updated",
                  time: "3 days ago",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center py-2 px-1 rounded-lg 
                            hover:bg-gray-50 transition-all"
                >
                  <span className="font-medium">{item.text}</span>
                  <span className="opacity-70 text-sm">{item.time}</span>
                </li>
              ))}

            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
