import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ResendVerification = () => {
  const { currentUser, resendVerification } = useAuth();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleResend = async () => {
    try {
      setStatus('sending');
      setError('');
      
      await resendVerification();
      
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 5000); // Reset after 5 seconds
    } catch (error) {
      console.error('Failed to resend verification email:', error);
      setError(error.response?.data?.error || 'Failed to resend verification email');
      setStatus('error');
    }
  };

  if (!currentUser || currentUser.emailVerified) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Email Verification Required</h3>
      <p className="text-gray-600 mb-4">
        Please verify your email address to access all features.
      </p>
      
      {error && (
        <div className="text-red-600 mb-4">
          {error}
        </div>
      )}
      
      {status === 'sent' && (
        <div className="text-green-600 mb-4">
          Verification email sent successfully! Please check your inbox.
        </div>
      )}
      
      <button
        onClick={handleResend}
        disabled={status === 'sending'}
        className={`w-full py-2 px-4 rounded ${
          status === 'sending'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark'
        } text-white font-semibold transition-colors`}
      >
        {status === 'sending' ? 'Sending...' : 'Resend Verification Email'}
      </button>
    </div>
  );
};

export default ResendVerification; 