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
    <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8 text-black relative *:text-black *:placeholder-black">


      <div className="flex items-start gap-4 mb-6">
        <div className="flex-1">

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-indigo-500/20 text-black rounded-full text-sm font-medium">
              Question {question?.number || ""}
            </span>
            {question?.difficulty && (
              <span className="px-3 py-1 bg-purple-500/20 text-black rounded-full text-sm">
                {question.difficulty}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-bold mb-3 text-black">Question</h3>

          <p className="text-lg text-black leading-relaxed">
            {question?.text || question?.question || JSON.stringify(question)}
          </p>

        </div>

        <div className="flex flex-col items-end gap-2">

          <div className="text-sm text-black mb-1">Answer Mode</div>

          <div className="flex gap-2">
            <button
              onClick={() => setMode("speech")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                mode === "speech"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white/10 text-black hover:bg-white/20"
              }`}
            >
              🎤 Speech
            </button>

            <button
              onClick={() => setMode("text")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                mode === "text"
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
            className="mt-3 px-4 py-2 rounded-lg bg-yellow-500/20 text-black border border-yellow-500/30 hover:bg-yellow-500/30 transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : "⭐ Save to Bank"}
          </button>

        </div>
      </div>

      {mode === "speech" ? (
        <div className="mt-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">

            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-black">Live Transcript</div>

              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${listening ? "bg-red-500 animate-pulse" : "bg-slate-600"}`}></div>
                <div className="text-sm text-black">
                  {supported ? (listening ? "Recording..." : "Ready") : "Speech unavailable"}
                </div>
              </div>
            </div>

            <div className="min-h-[140px] p-4 bg-slate-950 rounded-lg border border-slate-800 text-black whitespace-pre-wrap">
              {transcript || (
                <span className="text-black italic">
                  Start recording to see your transcript here...
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center gap-3">

              <button
                onClick={listening ? stop : start}
                disabled={!supported}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg transition-all ${
                  listening
                    ? "bg-red-600 hover:bg-red-700 text-white animate-pulse"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {listening ? "Stop Recording" : "Start Recording"}
              </button>

              {listening && (
                <div className="flex-1">
                  <div className="h-10 bg-gradient-to-r from-indigo-900/30 via-indigo-600/30 to-indigo-900/30 rounded-full overflow-hidden flex items-center justify-center gap-1 px-3">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-indigo-500 rounded-full animate-pulse"
                        style={{
                          height: `${20 + Math.random() * 20}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 ml-auto">

                <button
                  onClick={() => reset()}
                  className="px-4 py-2 rounded-lg bg-white/10 text-black hover:bg-white/20 transition-all"
                >
                  🔄 Reset
                </button>

                <button
                  onClick={() => setTranscript((t) => t + " ... ")}
                  className="px-4 py-2 rounded-lg bg-white/10 text-black hover:bg-white/20 transition-all"
                >
                  ⏸️ Pause
                </button>

              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <label className="block text-sm font-medium text-black mb-2">Your Answer</label>

          <textarea
            className="w-full p-4 rounded-xl border border-slate-700 bg-slate-900 min-h-[180px] text-black placeholder-black focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
            rows={7}
            value={typing}
            onChange={(e) => setTyping(e.target.value)}
            placeholder="Type your answer here..."
          />

          <div className="mt-2 text-xs text-black">{typing.length} characters</div>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-slate-700 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-black">
          Tip: Structure your answer (Situation → Action → Result)
        </div>

        <button
          onClick={submitAnswer}
          disabled={submitting || (!transcript && !typing)}
          className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit Answer"}
        </button>
      </div>
    </div>
  );
}
