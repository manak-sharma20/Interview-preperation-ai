// src/pages/Sessions/MySessions.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { Link } from "react-router-dom";

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
        setSessions(res.data.sessions || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Your Interview Sessions
        </h2>

        {/* Loading */}
        {loading && (
          <div className="text-gray-500 animate-pulse">Loading your sessions...</div>
        )}

        {/* No Sessions Case */}
        {!loading && sessions.length === 0 && (
          <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-600 border">
            You haven’t created any interview sessions yet.
            <br />
            <Link
              to="/create-session"
              className="text-indigo-600 font-semibold mt-2 inline-block"
            >
              Start a new session →
            </Link>
          </div>
        )}

        {/* Sessions List */}
        <div className="grid gap-5 mt-4">
          {sessions.map((s) => (
            <Link
              key={s._id}
              to={`/interview-prep/${s._id}`}
              className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition duration-200 flex justify-between items-center group"
            >
              <div>
                <h3 className="font-semibold text-xl text-gray-900 group-hover:text-indigo-600 transition">
                  {s.role} — {s.experience}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {s.topicsToFocus}
                </p>
              </div>

              <div className="text-sm text-gray-400">
                {new Date(s.createdAt).toLocaleDateString()} <br />
                <span className="opacity-80">
                  {new Date(s.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MySessions;
