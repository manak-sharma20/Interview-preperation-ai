// src/pages/QuestionBank/QuestionBank.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL); // reuse sessions endpoint then aggregate questions
        const sessions = res.data.sessions || res.data;
        const allQs = sessions.flatMap(s => s.questions || []);
        setQuestions(allQs);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const togglePin = async (id) => {
    try {
      const res = await axiosInstance.put(API_PATHS.QUESTION.PIN(id));
      // update in place
      setQuestions(prev => prev.map(q => q._id === id ? res.data.question : q));
    } catch (err) {
      toast.error("Failed to toggle pin");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Question Bank</h2>
      <div className="space-y-3">
        {questions.length === 0 && <p>No saved questions.</p>}
        {questions.map(q => (
          <div key={q._id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <p className="font-medium">{q.question}</p>
              <p className="text-sm text-gray-600 mt-1">{q.answer}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => togglePin(q._id)} className="text-sm px-3 py-1 border rounded">
                {q.isPinned ? "Unpin" : "Pin"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionBank;
