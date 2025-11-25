import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const token = response.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-1">
            Join PrepTalk to start your interview journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            required
            onChange={handleChange}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            required
            onChange={handleChange}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            required
            onChange={handleChange}
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            required
            onChange={handleChange}
          />

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center font-medium">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full mb-6">
            Sign Up
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
