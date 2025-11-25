import React, { useEffect, useState } from "react";
import QuestionCard from "../../components/cards/QuestionCard";
import API from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function PracticeSession() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [started, setStarted] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("generatedQuestions");
    if (!saved) return;
    try {
      const list = JSON.parse(saved);
      setQuestions(list);
    } catch (e) {}
  }, []);

  const currentQuestion = questions[index];

  const startPractice = () => {
    setStarted(true);
  };

  const nextQuestion = () => {
    setResult(null);
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      alert("🎉 You completed all questions!");
    }
  };

  const handleSaveCallback = () => {
    // visual feedback if needed
  };

  const fetchAllFromServer = async () => {
    setLoadingQuestions(true);
    try {
      const res = await API.get("/api/sessions"); // fallback to fetch sessions or questions endpoint if available
      console.log(res.data);
    } catch (err) {
      console.error("Fetch sessions failed", err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0e1a] to-[#071026] text-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Practice Session</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/create-session")} className="px-4 py-2 bg-indigo-600 rounded">Start Session</button>
            <button onClick={fetchAllFromServer} className="px-3 py-2 bg-slate-700 rounded">Sync</button>
          </div>
        </div>

        {!started ? (
          <div className="rounded-2xl bg-white/5 border border-white/6 p-12 text-center">
            <p className="text-slate-300 max-w-2xl mx-auto">
              Practice using generated questions. Click start to begin, use the microphone button to record your answer, or type answers manually.
            </p>
            <div className="mt-8">
              <button onClick={startPractice} className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-full text-lg shadow">Start Practice</button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {currentQuestion ? (
                  <QuestionCard
                    question={currentQuestion}
                    onResult={(r) => setResult(r)}
                    onSave={handleSaveCallback}
                  />
                ) : (
                  <div className="p-8 bg-white/5 rounded-2xl text-slate-400">
                    No question loaded. Create a session first or go to Sessions to generate questions.
                  </div>
                )}

                <div className="mt-6 flex items-center gap-4">
                  <button onClick={nextQuestion} className="px-6 py-2 bg-slate-800 rounded-full hover:bg-slate-700">Next Question</button>
                  <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(currentQuestion)) }} className="px-4 py-2 bg-slate-700 rounded">Copy Q</button>
                </div>
              </div>

              <aside className="p-6 bg-white/5 rounded-2xl text-slate-300">
                <h4 className="font-semibold text-lg mb-3">Session Summary</h4>
                {result ? (
                  <>
                    <p className="mb-2"><strong>Score:</strong> {result.score ?? "N/A"}</p>
                    <p className="mb-2"><strong>Tips:</strong> {result.tips}</p>
                  </>
                ) : (
                  <p className="text-slate-400">Your performance summary will appear here after submitting an answer.</p>
                )}
                <div className="mt-4 text-sm text-slate-400">Questions in queue: {questions.length}</div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
