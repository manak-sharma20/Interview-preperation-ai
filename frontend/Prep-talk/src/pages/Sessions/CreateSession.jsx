// src/pages/Sessions/CreateSession.jsx
import React, { useState } from "react";
import API from "../../utils/axiosInstance";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateSession = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    jobRole: "",
    experience: "",
    topics: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.jobRole || !form.experience || !form.topics) {
      return alert("Please fill all fields.");
    }

    const payload = {
      role: form.jobRole,
      experience: form.experience,
      topicsToFocus: form.topics,
      numberOfQuestions: 5,
    };

    setLoading(true);
    try {
      const res = await API.post("/api/ai/generate-questions", payload);
      console.log("AI RAW RESPONSE:", res.data);


      // save questions for practice session
      localStorage.setItem(
        "generatedQuestions",
        JSON.stringify(res.data.questions || res.data)
      );
      

      // redirect to practice page
      navigate("/practice-session");
    } catch (error) {
      console.error("Session create error:", error?.response?.data || error);
      alert("Failed: " + (error?.response?.data || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Create Interview Session
        </h1>

        <div className="space-y-6">
          <div>
            <label className="text-gray-700 font-medium">Job Role</label>
            <input
              type="text"
              name="jobRole"
              value={form.jobRole}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Experience Level</label>
            <select
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="">Select experience</option>
              <option value="0–1 years">0–1 years</option>
              <option value="1–3 years">1–3 years</option>
              <option value="3–5 years">3–5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>

          <div>
            <label className="text-gray-700 font-medium">Topics to Focus</label>
            <input
              name="topics"
              value={form.topics}
              onChange={handleChange}
              placeholder="e.g. DSA, System Design, React"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center justify-center transition"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin w-5 h-5" />
              Generating Questions...
            </div>
          ) : (
            "Start Interview Session"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateSession;
