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
        for (let i = event.resultIndex; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setTranscript((prev) => {
          const combined = text;
          return combined;
        });
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
      } catch (e) {}
    };
  }, []);

  const start = async () => {
    if (!supported) return alert("Speech recognition not supported in this browser.");
    try {
      if (navigator.permissions && navigator.permissions.query) {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (e) {}
      }
      setTranscript("");
      setListening(true);
      recognitionRef.current.start();
    } catch (err) {
      setListening(false);
      alert("Unable to start microphone. Check permissions.");
    }
  };

  const stop = () => {
    try {
      recognitionRef.current.stop();
    } catch (e) {}
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
