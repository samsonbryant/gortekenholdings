import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { auth } from '../services/api';

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
      const response = await auth.getCurrentUser();
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
      const response = await auth.signup({ email, password });
      setCurrentUser(response.data.user);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      setError(null);
      return response.data;
    } catch (error) {
      handleAuthError(error);
    }
  }

  async function login(email, password) {
    try {
      const response = await auth.login({ email, password });
      setCurrentUser(response.data.user);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      setError(null);
      return response.data;
    } catch (error) {
      handleAuthError(error);
    }
  }

  async function logout() {
    try {
      await auth.logout();
      localStorage.removeItem('token');
      setCurrentUser(null);
      setError(null);
    } catch (error) {
      handleAuthError(error);
    }
  }

  async function verifyEmail(token) {
    try {
      await auth.verifyEmail(token);
      await checkAuth();
      setError(null);
    } catch (error) {
      handleAuthError(error);
    }
  }

  async function resendVerification() {
    try {
      await auth.resendVerification();
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
    verifyEmail,
    resendVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 