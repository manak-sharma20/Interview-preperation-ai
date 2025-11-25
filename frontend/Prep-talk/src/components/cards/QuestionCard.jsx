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
    <div className="bg-white rounded-2xl shadow-xl p-6 text-slate-900 relative">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-2">Question</h3>
          <p className="text-black leading-relaxed">
            {question?.text || question?.question || JSON.stringify(question)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-sm text-slate-500">Mode</div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("speech")}
              className={`px-3 py-1 rounded-md ${mode === "speech" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}
            >
              Speech
            </button>
            <button
              onClick={() => setMode("text")}
              className={`px-3 py-1 rounded-md ${mode === "text" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}
            >
              Type
            </button>
          </div>
          <button
            onClick={saveQuestion}
            disabled={saving}
            className="mt-3 px-3 py-1 rounded-md bg-yellow-400 text-slate-900 shadow"
          >
            {saving ? "Saving..." : "⭐ Save to Bank"}
          </button>
        </div>
      </div>

      {mode === "speech" ? (
        <div className="mt-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-500">Live Transcript</div>
              <div className="text-sm text-slate-400">{supported ? "Speech supported" : "Speech unavailable"}</div>
            </div>
            <div className="min-h-[120px] p-3 bg-white rounded-md border border-slate-100 text-slate-700 whitespace-pre-wrap">
              {transcript || <span className="text-slate-400">(say something…)</span>}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={listening ? stop : start}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-md ${listening ? "bg-red-500 text-white" : "bg-emerald-600 text-white"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 012 0v6a1 1 0 11-2 0V2z" />
                    <path d="M5 8a4 4 0 008 0V7a1 1 0 112 0v1a6 6 0 11-12 0V7a1 1 0 112 0v1z" />
                    <path d="M12 14.5V16a4 4 0 11-4 0v-1.5h4z" />
                  </svg>
                  {listening ? "Stop" : "Start"}
                </button>
                <div style={{ position: "absolute", right: -14, top: -12 }} className="text-xs text-slate-400">Mic</div>
              </div>

              <div className="flex-1">
                <div className="h-8 bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-300 rounded-full overflow-hidden">
                  <div className="flex gap-1 items-end h-full px-2 animate-wave">
                    <div style={{width:6,height:Math.max(6, Math.random()*28)}} className="bg-indigo-500 rounded-sm" />
                    <div style={{width:6,height:Math.max(6, Math.random()*18)}} className="bg-indigo-400 rounded-sm" />
                    <div style={{width:6,height:Math.max(6, Math.random()*24)}} className="bg-indigo-500 rounded-sm" />
                    <div style={{width:6,height:Math.max(6, Math.random()*12)}} className="bg-indigo-400 rounded-sm" />
                    <div style={{width:6,height:Math.max(6, Math.random()*20)}} className="bg-indigo-500 rounded-sm" />
                  </div>
                </div>
                <style>{`.animate-wave > div { transition: height 220ms ease; }`}</style>
              </div>

              <div className="flex gap-2 ml-auto">
                <button onClick={() => reset()} className="px-3 py-2 rounded bg-slate-100 text-slate-700">Reset</button>
                <button onClick={() => setTranscript((t) => t + " ... ")} className="px-3 py-2 rounded bg-slate-100 text-slate-700">Pause</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <textarea
            className="w-full p-4 rounded-xl border border-slate-100 min-h-[160px] text-slate-700"
            rows={6}
            value={typing}
            onChange={(e) => setTyping(e.target.value)}
            placeholder="Type your answer here..."
          />
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-slate-500">Tip: keep answers structured (Situation → Action → Result)</div>
        <div className="flex gap-2">
          <button
            onClick={submitAnswer}
            disabled={submitting}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white"
          >
            {submitting ? "Submitting..." : "Submit Answer"}
          </button>
        </div>
      </div>
    </div>
  );
}
