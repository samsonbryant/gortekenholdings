import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired token and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        await api.post('/refresh-token');
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get('/me');
      setCurrentUser(response.data.user);
      setError(null);
    } catch (error) {
      setCurrentUser(null);
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error) => {
    console.error('Auth error:', error);
    const errorMessage = error.response?.data?.error || error.message;
    setError(errorMessage);
    throw new Error(errorMessage);
  };

  async function signup(email, password) {
    try {
      const response = await api.post('/signup', {
        email,
        password
      });
      setCurrentUser(response.data.user);
      setError(null);
      return response.data;
    } catch (error) {
      handleAuthError(error);
    }
  }

  async function login(email, password) {
    try {
      const response = await api.post('/login', {
        email,
        password
      });
      setCurrentUser(response.data.user);
      setError(null);
      return response.data;
    } catch (error) {
      handleAuthError(error);
    }
  }

  async function logout() {
    try {
      await api.post('/logout');
      setCurrentUser(null);
      setError(null);
    } catch (error) {
      handleAuthError(error);
    }
  }

  async function resetPassword(email) {
    try {
      await api.post('/reset-password', { email });
      setError(null);
    } catch (error) {
      handleAuthError(error);
    }
  }

  async function verifyEmail(token) {
    try {
      await api.get(`/verify-email/${token}`);
      await checkAuth();
      setError(null);
    } catch (error) {
      handleAuthError(error);
    }
  }

  const value = {
    currentUser,
    error,
    signup,
    login,
    logout,
    resetPassword,
    verifyEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 