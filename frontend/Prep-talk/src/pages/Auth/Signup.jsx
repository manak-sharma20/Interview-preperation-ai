import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Input = ({ label, ...props }) => {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none bg-white"
      />
    </div>
  );
};

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.99]"
    >
      {children}
    </button>
  );
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        name,
        email,
        password,
      });

      const token = response.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setError("Invalid signup response. Try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h1>
            <p className="text-gray-500 mt-2">Join PrepTalk to start practicing</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup}>
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="Email"
              type="email"
              placeholder="name@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && (
              <div className="p-3 mb-6 rounded-lg bg-red-50 text-red-600 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <Button type="submit">Sign Up</Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 pt-8 border-t border-gray-100">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-semibold hover:text-indigo-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
