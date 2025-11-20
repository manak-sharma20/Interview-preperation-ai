// src/pages/Sessions/CreateSession.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const CreateSession = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [topicsToFocus, setTopicsToFocus] = useState("");
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (index, field, value) => {
    const copy = [...questions];
    copy[index][field] = value;
    setQuestions(copy);
  };

  const addQuestion = () => setQuestions(prev => [...prev, { question: "", answer: "" }]);
  const removeQuestion = (i) => setQuestions(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        role,
        experience,
        topicsToFocus,
        description: "",
        questions
      };
      const res = await axiosInstance.post(API_PATHS.SESSION.CREATE, payload);
      toast.success("Session created");
      const sessionId = res.data.session?._id || res.data.session?.id;
      navigate(`/interview-prep/${sessionId}`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Interview Session</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium">Role</label>
          <input className="w-full border p-2 rounded" value={role} onChange={e => setRole(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium">Experience</label>
          <input className="w-full border p-2 rounded" value={experience} onChange={e => setExperience(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium">Topics to focus (comma separated)</label>
          <input className="w-full border p-2 rounded" value={topicsToFocus} onChange={e => setTopicsToFocus(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Questions</label>
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                <input
                  className="col-span-5 border p-2 rounded"
                  placeholder="Question"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(idx, "question", e.target.value)}
                  required
                />
                <input
                  className="col-span-6 border p-2 rounded"
                  placeholder="Sample Answer (optional)"
                  value={q.answer}
                  onChange={(e) => handleQuestionChange(idx, "answer", e.target.value)}
                />
                <button type="button" onClick={() => removeQuestion(idx)} className="col-span-1 text-red-500">✕</button>
              </div>
            ))}
            <button type="button" onClick={addQuestion} className="mt-2 text-indigo-600">+ Add question</button>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded" disabled={loading}>
            {loading ? "Creating..." : "Create Session"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSession;
