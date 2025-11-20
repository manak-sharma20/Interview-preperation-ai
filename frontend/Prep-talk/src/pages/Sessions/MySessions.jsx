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
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Sessions</h2>
      {loading ? <p>Loading...</p> : null}
      <div className="grid gap-4">
        {sessions.length === 0 && !loading && <p>No sessions yet — start one!</p>}
        {sessions.map(s => (
          <Link key={s._id} to={`/interview-prep/${s._id}`} className="bg-white p-4 rounded shadow hover:shadow-lg flex justify-between">
            <div>
              <h3 className="font-semibold">{s.role} — {s.experience}</h3>
              <p className="text-sm text-gray-600">{s.topicsToFocus}</p>
            </div>
            <div className="text-sm text-gray-500">{new Date(s.createdAt).toLocaleString()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MySessions;
