import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

// Reusable Input Component
const Input = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

// Reusable Button Component
const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
    >
      {children}
    </button>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const token = response.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setError("Invalid login response. Try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <div className="auth-container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="auth-card bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <div className="auth-header text-center mb-6">
          <h1 className="auth-title text-3xl font-bold">Welcome Back</h1>
          <p className="auth-subtitle text-gray-500">
            Sign in to your PrepTalk account
          </p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="text-right mb-4">
            <Link to="/forgot-password" className="text-indigo-600 text-sm">
              Forgot your password?
            </Link>
          </div>

          <Button type="submit">Sign In</Button>
        </form>

        <div className="auth-footer text-center mt-6">
          <p className="auth-footer-text text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signUp" className="text-indigo-600 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
