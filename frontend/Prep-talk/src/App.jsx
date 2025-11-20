// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Home/Dashboard";
import CreateSession from "./pages/Sessions/CreateSession";
import MySessions from "./pages/Sessions/MySessions";
import QuestionBank from "./pages/QuestionBank/QuestionBank";
import InterviewPrep from "./pages/Interview-prep/Interviewprep";
import Analytics from "./pages/Analytics/Analytics";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create-session" element={<ProtectedRoute><CreateSession /></ProtectedRoute>} />
          <Route path="/my-sessions" element={<ProtectedRoute><MySessions /></ProtectedRoute>} />
          <Route path="/question-bank" element={<ProtectedRoute><QuestionBank /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/interview-prep/:sessionId" element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
        </Routes>
      </main>

      <Toaster toastOptions={{ className: "", style: { fontSize: "13px" } }} />
    </Router>
  );
};

export default App;
