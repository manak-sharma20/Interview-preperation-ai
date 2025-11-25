// src/pages/QuestionBank/QuestionBank.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import QAList from "../../components/cards/QAList";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("all");

  // NEW STATE FOR YOUR 5 Q&A CARDS
  const [qaData, setQaData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
        const sessions = res.data.sessions || res.data;
        const allQs = sessions.flatMap((s) => s.questions || []);
        setQuestions(allQs);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  // NEW: LOAD STATIC Q&A LIST
  useEffect(() => {
    const loadQA = async () => {
      try {
        const res = await axiosInstance.get("/your-qa-endpoint");
        setQaData(JSON.parse(res.data.rawText))
;
      } catch (err) {
        console.error("Failed to load QA list");
      }
    };
    loadQA();
  }, []);

  const togglePin = async (id) => {
    try {
      const res = await axiosInstance.put(API_PATHS.QUESTION.PIN(id));
      setQuestions((prev) =>
        prev.map((q) => (q._id === id ? res.data.question : q))
      );
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  const filteredQs =
    filter === "pinned" ? questions.filter((q) => q.isPinned) : questions;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Question Bank</h2>
          <p className="text-gray-600 mt-1">
            Your saved & AI-generated interview questions
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg border transition ${
            filter === "all"
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          All Questions
        </button>

        <button
          onClick={() => setFilter("pinned")}
          className={`px-4 py-2 rounded-lg border transition ${
            filter === "pinned"
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          📌 Pinned
        </button>
      </div>

      {/* NEW: Q&A CARD LIST ABOVE QUESTION LIST */}
      {qaData.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Suggested Interview Q&A
          </h3>

          <QAList data={qaData} />
        </div>
      )}

      {/* Question List */}
      <div className="space-y-5 mt-10">
        {filteredQs.length === 0 && (
          <div className="text-center py-10 text-gray-500 bg-white rounded-xl border shadow-sm">
            No questions found.
          </div>
        )}

        {filteredQs.map((q) => (
          <div
            key={q._id}
            className="p-6 bg-white rounded-2xl border shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="flex justify-between gap-6">
              <div className="flex-1">
                <p className="font-semibold text-lg text-gray-900">
                  {q.question}
                </p>

                {q.answer && (
                  <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-3 rounded-lg border leading-relaxed">
                    {q.answer}
                  </p>
                )}
              </div>

              <button
                onClick={() => togglePin(q._id)}
                className={`h-10 px-4 rounded-xl border shadow-sm text-sm font-medium transition 
                ${
                  q.isPinned
                    ? "bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
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
