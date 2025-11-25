// src/pages/Interview-prep/Interviewprep.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteEditing, setNoteEditing] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
        setSession(res.data.session || res.data);
      } catch (err) {
        toast.error("Failed to load session");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sessionId]);

  const saveNote = async (qId) => {
    try {
      await axiosInstance.put(API_PATHS.QUESTION.UPDATE_NOTE(qId), {
        note: noteEditing[qId] || "",
      });

      toast.success("Note saved");

      setSession((prev) => ({
        ...prev,
        questions: prev.questions.map((q) =>
          q._id === qId ? { ...q, note: noteEditing[qId] } : q
        ),
      }));
    } catch (err) {
      toast.error("Failed to save note");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!session) return <div className="p-6 text-center">Session not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-2">
        {session.role} — {session.experience}
      </h2>
      <p className="text-gray-600 mb-8">{session.topicsToFocus}</p>

      {/* ------------------ Question Cards ------------------ */}
      <div className="space-y-6">
        {session.questions.map((q) => (
          <div
            key={q._id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-gray-900 leading-snug">
                {q.question}
              </h3>

              {q.isPinned && <span className="text-yellow-500 text-xl">📌</span>}
            </div>

            <p className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 leading-relaxed shadow-sm">
              {q.answer}
            </p>

            {/* Notes */}
            <label className="text-sm font-semibold text-gray-700 mt-5 block">
              Your Notes
            </label>

            <textarea
              value={noteEditing[q._id] ?? q.note ?? ""}
              onChange={(e) =>
                setNoteEditing((prev) => ({
                  ...prev,
                  [q._id]: e.target.value,
                }))
              }
              placeholder="Add personal notes, key points, or reminders..."
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={() => saveNote(q._id)}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition shadow-sm"
              >
                Save Note
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrep;
