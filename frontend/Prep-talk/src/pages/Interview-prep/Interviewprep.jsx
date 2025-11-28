// src/pages/Interview-prep/Interviewprep.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import {
  ArrowLeft,
  Save,
  Loader2,
  Pin,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteEditing, setNoteEditing] = useState({});
  const [savingNotes, setSavingNotes] = useState({});

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
    setSavingNotes((prev) => ({ ...prev, [qId]: true }));
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
    } finally {
      setSavingNotes((prev) => ({ ...prev, [qId]: false }));
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );

  if (!session)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Not Found</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Return to Dashboard
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {session.jobRole} Interview
            </h1>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wide">
              {session.experienceLevel}
            </span>
          </div>
          <p className="text-gray-500">
            Focus topics: {session.topics?.join(", ") || "General"}
          </p>
        </div>

        {/* Questions List */}
        <div className="space-y-8">
          {session.questions?.map((q, idx) => (
            <div
              key={q._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Question Header */}
              <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                      {q.question}
                    </h3>
                    {q.isPinned && (
                      <Pin className="w-4 h-4 text-indigo-500 flex-shrink-0 fill-current" />
                    )}
                  </div>
                </div>
              </div>

              {/* Answer Section */}
              <div className="p-6 md:p-8">
                <div className="mb-8">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    Suggested Answer
                  </h4>
                  <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-xl border border-gray-100">
                    {q.answer}
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    <HelpCircle className="w-4 h-4 text-indigo-500" />
                    Your Notes
                  </h4>
                  <div className="relative">
                    <textarea
                      className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none resize-y min-h-[120px] text-gray-700"
                      placeholder="Write your key takeaways, self-feedback, or alternative answers here..."
                      value={
                        noteEditing[q._id] !== undefined
                          ? noteEditing[q._id]
                          : q.note || ""
                      }
                      onChange={(e) =>
                        setNoteEditing({ ...noteEditing, [q._id]: e.target.value })
                      }
                    />
                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={() => saveNote(q._id)}
                        disabled={savingNotes[q._id]}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                      >
                        {savingNotes[q._id] ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          "Save Note"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
