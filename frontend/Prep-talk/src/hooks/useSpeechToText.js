import { useState, useRef, useEffect } from "react";

export default function useSpeechToText() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }
    setSupported(true);
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        let text = "";
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setTranscript(text);
      };

      recognitionRef.current.onerror = () => {
        setListening(false);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch (e) { }
    };
  }, []);

  const start = async () => {
    console.log("🎤 Starting speech recognition...");
    if (!supported) return alert("Speech recognition not supported in this browser.");
    try {
      if (navigator.permissions && navigator.permissions.query) {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          console.log("🎤 Microphone permission granted");
        } catch (e) {
          console.error("🎤 Microphone permission error:", e);
        }
      }
      setTranscript("");
      setListening(true);
      recognitionRef.current.start();
      console.log("🎤 Recognition started");
    } catch (err) {
      console.error("🎤 Start error:", err);
      setListening(false);
      alert("Unable to start microphone. Check permissions.");
    }
  };

  const stop = () => {
    console.log("🎤 Stopping speech recognition...");
    try {
      recognitionRef.current.stop();
    } catch (e) { }
    setListening(false);
  };

  const reset = () => {
    setTranscript("");
  };

  return {
    supported,
    listening,
    transcript,
    start,
    stop,
    reset,
    setTranscript,
  };
}
