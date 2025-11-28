import React, { useState } from "react";
import useSpeechToText from "../../hooks/useSpeechToText";
import API from "../../utils/axiosInstance";

export default function QuestionCard({ question, onResult, onSave }) {
  const { supported, listening, transcript, start, stop, reset, setTranscript } =
    useSpeechToText();
  const [mode, setMode] = useState("speech");
  const [typing, setTyping] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saving, setSaving] = useState(false);

  async function submitAnswer() {
    const textAnswer = mode === "speech" ? transcript : typing;
    if (!textAnswer || !textAnswer.trim()) {
      return alert("Please speak or type your answer before submitting.");
    }
    setSubmitting(true);
    try {
      const payload = {
        questionId: question?.id || question?._id || null,
        textAnswer: textAnswer.trim(),
      };
      const res = await API.post("/interview/evaluate", payload);
      onResult(res.data);
    } catch (err) {
      console.error("Submit answer failed:", err);
      alert("Failed to submit answer. Check console.");
    } finally {
      setSubmitting(false);
    }
  }

  async function saveQuestion() {
    setSaving(true);
    try {
      const payload = {
        text: question?.text || question?.question || JSON.stringify(question),
        source: "practice-session",
      };
      await API.post("/api/questions/add", payload);
      if (typeof onSave === "function") onSave();
      alert("Saved to Question Bank");
    } catch (err) {
      console.error("Save question failed:", err);
      alert("Save failed. Check console.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 relative">


      <div className="flex items-start gap-4 mb-6">
        <div className="flex-1">

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium">
              Question {question?.number || ""}
            </span>
            {question?.difficulty && (
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                {question.difficulty}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-bold mb-3 text-white">Question</h3>

          <p className="text-lg text-slate-300 leading-relaxed">
            {question?.text || question?.question || JSON.stringify(question)}
          </p>

        </div>

        <div className="flex flex-col items-end gap-2">

          <div className="text-sm text-slate-400 mb-1">Answer Mode</div>

          <div className="flex gap-2">
            <button
              onClick={() => setMode("speech")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "speech"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white/10 text-black hover:bg-white/20"
                }`}
            >
              🎤 Speech
            </button>

            <button
              onClick={() => setMode("text")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "text"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white/10 text-black hover:bg-white/20"
                }`}
            >
              ⌨️ Type
            </button>
          </div>

          <button
            onClick={saveQuestion}
            disabled={saving}
            className="mt-3 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : "⭐ Save to Bank"}
          </button>

        </div>
      </div>

      {mode === "speech" ? (
        <div className="mt-8">
          <div className="bg-slate-900 p-8 rounded-xl border-none">

            <div className="flex items-center justify-between mb-6">
              <div className="text-base font-medium text-slate-300">Live Transcript</div>

              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${listening ? "bg-red-500 animate-pulse" : "bg-slate-600"}`}></div>
                <div className="text-sm text-slate-400">
                  {supported ? (listening ? "Recording..." : "Ready") : "Speech unavailable"}
                </div>
              </div>
            </div>

            <div className="min-h-[160px] p-6 bg-slate-950 rounded-xl text-slate-300 whitespace-pre-wrap leading-relaxed text-lg">
              {transcript || (
                <span className="text-slate-600 italic">
                  Start recording to see your transcript here...
                </span>
              )}
            </div>

            <div className="mt-8 flex items-center gap-4">

              <button
                onClick={listening ? stop : start}
                disabled={!supported}
                style={{
                  backgroundColor: listening ? "#dc2626" : "#059669", // Red-600 : Emerald-600
                  color: "#ffffff",
                }}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold shadow-xl transition-all hover:scale-105 ${listening ? "animate-pulse" : ""
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {listening ? (
                  <>
                    <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
                    Stop Recording
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                    Start Recording
                  </>
                )}
              </button>

              {listening && (
                <div className="flex-1 mx-4">
                  <div className="h-12 bg-indigo-900/20 rounded-full overflow-hidden flex items-center justify-center gap-1 px-4">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-indigo-500 rounded-full animate-pulse"
                        style={{
                          height: `${20 + Math.random() * 20}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 ml-auto">

                <button
                  onClick={() => reset()}
                  className="px-6 py-3 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600 transition-all font-medium"
                >
                  🔄 Reset
                </button>

                <button
                  onClick={() => setTranscript((t) => t + " ... ")}
                  className="px-6 py-3 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600 transition-all font-medium"
                >
                  ⏸️ Pause
                </button>

              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <label className="block text-base font-medium text-slate-300 mb-3">Your Answer</label>

          <textarea
            className="w-full p-6 rounded-2xl bg-slate-900 min-h-[200px] text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-lg leading-relaxed resize-none"
            rows={8}
            value={typing}
            onChange={(e) => setTyping(e.target.value)}
            placeholder="Type your answer here... (e.g., 'In my previous role, I handled...')"
          />

          <div className="mt-3 text-sm text-slate-500 text-right">{typing.length} characters</div>
        </div>
      )}

      <div className="mt-8 pt-8 border-t border-slate-700/50 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-900/50 px-4 py-2 rounded-lg">
          <span className="text-indigo-400">💡 Tip:</span> Structure your answer (Situation → Action → Result)
        </div>

        <button
          onClick={submitAnswer}
          disabled={submitting || (!transcript && !typing)}
          className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {submitting ? "Submitting..." : "Submit Answer"}
        </button>
      </div>
    </div>
  );
}
