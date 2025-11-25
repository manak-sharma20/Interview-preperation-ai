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
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    setLoadingQuestions(true);
    setError(null);
    
    const saved = localStorage.getItem("generatedQuestions");
    console.log("📦 Loading questions from localStorage:", saved);
    
    if (saved) {
      try {
        const list = JSON.parse(saved);
        console.log("✅ Parsed questions:", list);
        if (list && list.length > 0) {
          setQuestions(list);
          setLoadingQuestions(false);
          return;
        }
      } catch (e) {
        console.error("❌ Failed to parse questions:", e);
      }
    }
    
    // No questions found - create sample questions for testing
    console.log("⚠️ No questions in localStorage, creating sample questions");
    const sampleQuestions = [
      {
        id: 1,
        question: "What is the difference between var, let, and const in JavaScript?",
        difficulty: "Medium",
        category: "JavaScript",
        number: 1
      },
      {
        id: 2,
        question: "Explain the concept of closures in JavaScript with an example.",
        difficulty: "Hard",
        category: "JavaScript",
        number: 2
      },
      {
        id: 3,
        question: "What are the main differences between SQL and NoSQL databases?",
        difficulty: "Medium",
        category: "Databases",
        number: 3
      }
    ];
    
    setQuestions(sampleQuestions);
    localStorage.setItem("generatedQuestions", JSON.stringify(sampleQuestions));
    setLoadingQuestions(false);
  };

  const currentQuestion = questions[index];

  const startPractice = () => {
    if (questions.length === 0) {
      setError("No questions available. Please create a session first.");
      return;
    }
    setStarted(true);
  };

  const nextQuestion = () => {
    setResult(null);
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      alert("🎉 You completed all questions!");
      setStarted(false);
      setIndex(0);
    }
  };

  const prevQuestion = () => {
    setResult(null);
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleSaveCallback = () => {
    console.log("Question saved successfully");
  };

  const fetchAllFromServer = async () => {
    setLoadingQuestions(true);
    setError(null);
    try {
      const res = await API.get("/api/sessions");
      console.log("Fetched sessions:", res.data);
      if (res.data?.questions && res.data.questions.length > 0) {
        setQuestions(res.data.questions);
        localStorage.setItem("generatedQuestions", JSON.stringify(res.data.questions));
      }
    } catch (err) {
      console.error("Fetch sessions failed", err);
      setError("Failed to sync with server. Using local questions.");
    } finally {
      setLoadingQuestions(false);
    }
  };

  if (loadingQuestions) {
    return (
      <div className="min-h-screen bg-[#1a1d2e] text-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mb-4"></div>
              <p className="text-slate-300 text-lg">Loading questions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1d2e] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Practice Session
            </h1>
            {questions.length > 0 && started && (
              <p className="text-slate-400 mt-2 text-lg">
                Question {index + 1} of {questions.length}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/create-session")} 
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all font-medium shadow-lg hover:shadow-indigo-500/50"
            >
              + New Session
            </button>
            <button 
              onClick={fetchAllFromServer} 
              className="px-4 py-2.5 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg transition-all font-medium"
              disabled={loadingQuestions}
            >
              {loadingQuestions ? "⏳ Syncing..." : "🔄 Sync"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-yellow-400 font-medium">{error}</p>
                <button 
                  onClick={() => navigate("/create-session")} 
                  className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 underline"
                >
                  Create a new session →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Start Screen */}
        {!started ? (
          <div className="rounded-2xl bg-slate-800 border border-slate-700 p-12 text-center shadow-2xl">
            <div className="mb-6">
              <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-3">
                Ready to Practice?
              </h2>
            </div>
            
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Practice with AI-generated interview questions. Record your answers using speech or type them out. Get instant feedback to improve your performance.
            </p>

            {questions.length > 0 ? (
              <div className="mb-8 p-5 bg-green-900/30 border border-green-600/50 rounded-xl max-w-md mx-auto">
                <p className="text-green-300 text-lg">
                  <strong className="text-2xl font-bold text-white">{questions.length}</strong> {questions.length === 1 ? "question" : "questions"} loaded and ready to go! 🚀
                </p>
              </div>
            ) : (
              <div className="mb-8 p-5 bg-red-900/30 border border-red-600/50 rounded-xl max-w-md mx-auto">
                <p className="text-red-300 text-lg font-medium">
                  No questions available. Please create a session first.
                </p>
              </div>
            )}
            
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={startPractice} 
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full text-lg font-bold shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={questions.length === 0}
              >
                🎯 Start Practice
              </button>
              {questions.length === 0 && (
                <button 
                  onClick={() => navigate("/create-session")} 
                  className="px-10 py-4 bg-slate-700 hover:bg-slate-600 rounded-full text-lg font-bold shadow-2xl transition-all hover:scale-105"
                >
                  ➕ Create Session
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Practice Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Question Area */}
              <div className="lg:col-span-2 space-y-6">
                {currentQuestion ? (
                  <>
                    <QuestionCard
                      question={currentQuestion}
                      onResult={(r) => setResult(r)}
                      onSave={handleSaveCallback}
                    />

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between gap-4 p-5 bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
                      <button 
                        onClick={prevQuestion} 
                        className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                        disabled={index === 0}
                      >
                        ← Previous
                      </button>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-slate-400 text-sm">
                          {index + 1} / {questions.length}
                        </div>
                      </div>

                      <button 
                        onClick={nextQuestion} 
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all font-semibold shadow-lg"
                      >
                        {index === questions.length - 1 ? "Finish 🎉" : "Next →"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-10 bg-slate-800 rounded-2xl border border-slate-700 text-center shadow-xl">
                    <p className="text-slate-300 text-lg mb-4">No question loaded.</p>
                    <button 
                      onClick={() => navigate("/create-session")}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium"
                    >
                      Create a Session
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="p-6 bg-slate-800 rounded-2xl border border-slate-700 h-fit shadow-xl sticky top-6">
                <h4 className="font-bold text-xl mb-5 flex items-center gap-2 text-white">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                  Session Summary
                </h4>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-900/50 rounded-xl border border-indigo-600/50">
                      <p className="text-sm text-slate-300 mb-2">Your Score</p>
                      <p className="text-4xl font-bold text-white">
                        {result.score ?? "N/A"}
                      </p>
                    </div>
                    
                    {result.tips && (
                      <div className="p-4 bg-slate-700 rounded-xl border border-slate-600">
                        <p className="text-sm font-medium text-slate-200 mb-2 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Tips for Improvement
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed">{result.tips}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 bg-slate-700 rounded-xl border border-slate-600">
                    <svg className="w-12 h-12 text-slate-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-slate-400 text-sm text-center">
                      Submit your answer to see performance feedback here
                    </p>
                  </div>
                )}
                
                {/* Progress Info */}
                <div className="mt-6 pt-6 border-t border-slate-700 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Total Questions</span>
                    <span className="font-bold text-white">{questions.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Current Position</span>
                    <span className="font-bold text-indigo-400">{index + 1}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Remaining</span>
                    <span className="font-bold text-white">{questions.length - index - 1}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="pt-3">
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>Progress</span>
                      <span className="font-bold text-indigo-400">
                        {Math.round(((index + 1) / questions.length) * 100)}%
                      </span>
                    </div>
                    <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                        style={{ width: `${((index + 1) / questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Exit Button */}
                <button 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to exit? Your progress will be lost.")) {
                      setStarted(false);
                      setIndex(0);
                      setResult(null);
                    }
                  }}
                  className="w-full mt-6 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all text-sm font-medium border border-red-500/30"
                >
                  🚪 Exit Session
                </button>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
}