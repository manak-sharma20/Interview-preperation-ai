import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';


const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const token = response.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your PrepTalk account</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div style={{ marginBottom: '24px' }}>
            <Link to="/forgot-password" className="auth-link">
              Forgot your password?
            </Link>
          </div>

          <Button
            type="submit"
            size="large"
            className="btn-full"
            style={{ marginBottom: '24px' }}
          >
            Sign In
          </Button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Don’t have an account?{' '}
            <Link to="/signUp" className="auth-footer-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
