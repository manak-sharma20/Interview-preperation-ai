import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Input = ({ label, ...props }) => {
  return (
    <div className="mb-5">
      <label className="block mb-1.5 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white transition-all outline-none 
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 
                 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back 👋</h1>
          <p className="text-gray-500 mt-1">Sign in to continue with PrepTalk</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
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

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-indigo-600 text-sm hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <Button type="submit">Sign In</Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signUp"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
