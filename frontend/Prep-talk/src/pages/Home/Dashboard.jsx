import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  BookOpen,
  BarChart2,
  Activity,
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "AI Sessions",
      value: "12",
      icon: <Activity className="w-5 h-5 text-indigo-600" />,
      link: "/sessions",
    },
    {
      title: "Questions Solved",
      value: "45",
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
      link: "/question-bank",
    },
    {
      title: "Avg. Score",
      value: "82%",
      icon: <BarChart2 className="w-5 h-5 text-indigo-600" />,
      link: null, // Static stat
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 mt-1">Track your progress and start new sessions.</p>
          </div>
          <button
            onClick={() => navigate("/create-session")}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:shadow transition-all active:scale-[0.99]"
          >
            <PlusCircle className="w-5 h-5" />
            New Session
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              onClick={() => stat.link && navigate(stat.link)}
              className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-200 
                ${stat.link
                  ? "cursor-pointer hover:shadow-md hover:border-indigo-100 group"
                  : "cursor-default"
                }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  {stat.icon}
                </div>
                {stat.link && <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />}
              </div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
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
