import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {currentUser.email}
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Email verified:</span>{' '}
                  {currentUser.emailVerified ? 'Yes' : 'No'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary bg-opacity-10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Pension Plan
                </h3>
                <p className="text-gray-600 mb-4">
                  View and manage your pension plan details.
                </p>
                <button
                  onClick={() => navigate('/pension')}
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  View Details →
                </button>
              </div>

              <div className="bg-secondary bg-opacity-10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">
                  Payments
                </h3>
                <p className="text-gray-600 mb-4">
                  View your payment history and make new payments.
                </p>
                <button
                  onClick={() => navigate('/payment')}
                  className="text-secondary hover:text-secondary-dark font-medium"
                >
                  View Payments →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 