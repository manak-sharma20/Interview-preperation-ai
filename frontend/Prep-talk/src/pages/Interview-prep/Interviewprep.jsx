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
  const [noteEditing, setNoteEditing] = useState({}); // {questionId: note}

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
        setSession(res.data.session || res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load session");
      } finally {
        setLoading(false);
      }
    };
    if (sessionId) load();
  }, [sessionId]);

  const saveNote = async (qId) => {
    try {
      await axiosInstance.put(API_PATHS.QUESTION.UPDATE_NOTE(qId), { note: noteEditing[qId] || "" });
      toast.success("Note saved");
      // update local state
      setSession(prev => ({
        ...prev,
        questions: prev.questions.map(q => q._id === qId ? { ...q, note: noteEditing[qId] } : q)
      }));
    } catch (err) {
      toast.error("Failed to save note");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!session) return <div className="p-6">Session not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{session.role} — {session.experience}</h2>
      <p className="text-gray-600 mb-6">{session.topicsToFocus}</p>

      <div className="space-y-4">
        {session.questions.map(q => (
          <div key={q._id} className="bg-white p-4 rounded shadow flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{q.question}</p>
                <p className="text-sm text-gray-600 mt-1">{q.answer}</p>
              </div>
              <div className="text-sm text-gray-500">{q.isPinned ? "📌" : null}</div>
            </div>

            <div className="mt-3">
              <textarea
                value={noteEditing[q._id] ?? q.note ?? ""}
                onChange={(e) => setNoteEditing(prev => ({ ...prev, [q._id]: e.target.value }))}
                className="w-full border p-2 rounded"
                placeholder="Add personal note or key points"
              />
              <div className="flex justify-end mt-2">
                <button onClick={() => saveNote(q._id)} className="px-3 py-1 bg-indigo-600 text-white rounded">Save Note</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrep;
