import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail, currentUser } = useAuth();
  const [status, setStatus] = useState(token ? 'verifying' : 'awaiting');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        return;
      }

      try {
        setStatus('verifying');
        await verifyEmail(token);
        setStatus('success');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Email verified successfully. Please log in.',
              from: location
            }
          });
        }, 3000);
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setError(error.message || 'Failed to verify email');
      }
    };

    verify();
  }, [token, navigate, location, verifyEmail]);

  const handleResendVerification = async () => {
    try {
      setIsResending(true);
      setError('');
      
      await axios.post('/api/auth/resend-verification', {}, {
        withCredentials: true
      });
      
      setStatus('resent');
      setTimeout(() => setStatus('awaiting'), 5000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
          
          {status === 'verifying' && (
            <div className="mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600">Verifying your email...</p>
            </div>
          )}

          {status === 'awaiting' && (
            <div className="mt-8">
              <p className="text-lg text-gray-600">
                Please check your email for a verification link.
              </p>
              <div className="mt-4">
                <button
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    isResending ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isResending ? 'Sending...' : 'Resend Verification Email'}
                </button>
              </div>
            </div>
          )}

          {status === 'resent' && (
            <div className="mt-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="mt-4 text-lg text-gray-600">
                Verification email sent! Please check your inbox.
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="mt-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="mt-4 text-lg text-gray-600">
                Your email has been verified successfully!
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Redirecting to login page...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="mt-4 text-lg text-red-600">{error}</p>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => navigate('/login')}
                  className="text-primary hover:text-primary-dark block mx-auto"
                >
                  Return to Login
                </button>
                {currentUser && !currentUser.emailVerified && (
                  <button
                    onClick={handleResendVerification}
                    disabled={isResending}
                    className="text-gray-500 hover:text-gray-700 block mx-auto"
                  >
                    {isResending ? 'Sending...' : 'Resend Verification Email'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 