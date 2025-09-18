import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { payments } from '../services/api';
import ResendVerification from '../components/auth/ResendVerification';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const selectedPlan = location.state?.selectedPlan;
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: location, selectedPlan } });
      return;
    }

    // Define available payment methods based on the plan
    const getPaymentMethods = () => {
      const baseMethods = [
        {
          id: 'mtn',
          name: 'MTN Mobile Money',
          icon: '📱',
          description: 'Pay using MTN Mobile Money',
          minAmount: 1,
          maxAmount: 1000
        },
        {
          id: 'orange',
          name: 'Orange Money',
          icon: '📱',
          description: 'Pay using Orange Money',
          minAmount: 1,
          maxAmount: 1000
        }
      ];

      const bankMethods = [
        {
          id: 'bank_transfer',
          name: 'Bank Transfer',
          icon: '🏦',
          description: 'Direct bank transfer to our account',
          minAmount: 50,
          maxAmount: 10000
        }
      ];

      const cardMethods = [
        {
          id: 'credit_card',
          name: 'Credit/Debit Card',
          icon: '💳',
          description: 'Pay with Visa, Mastercard, or other cards',
          minAmount: 10,
          maxAmount: 5000
        }
      ];

      // Add payment methods based on plan
      switch (selectedPlan?.name) {
        case 'Premium Plan':
          return [...baseMethods, ...bankMethods, ...cardMethods];
        case 'Standard Plan':
          return [...baseMethods, ...bankMethods];
        case 'Basic Plan':
        default:
          return baseMethods;
      }
    };

    setPaymentMethods(getPaymentMethods());
  }, [currentUser, navigate, location, selectedPlan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const paymentData = {
        planId: selectedPlan.name,
        amount: selectedPlan.price,
        paymentMethod,
        mobileNumber: paymentMethod === 'mtn' || paymentMethod === 'orange' ? mobileNumber : undefined
      };

      const response = await payments.create(paymentData);
      setTransactionId(response.data.payment.transactionId);
      setPaymentStatus('pending');

      // For mobile money payments, start polling for status updates
      if (paymentMethod === 'mtn' || paymentMethod === 'orange') {
        startStatusPolling(response.data.payment.transactionId);
      }

      // For bank transfer, show instructions
      if (paymentMethod === 'bank_transfer') {
        setPaymentStatus('awaiting_transfer');
      }

    } catch (error) {
      console.error('Payment error:', error);
      setError(error.response?.data?.error || 'Failed to process payment');
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  const startStatusPolling = async (tid) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await payments.getStatus(tid);
        const status = response.data.payment.status;

        setPaymentStatus(status);

        if (status === 'completed' || status === 'failed') {
          clearInterval(pollInterval);
          if (status === 'completed') {
            // Redirect to success page or show success message
            setTimeout(() => {
              navigate('/dashboard', { 
                state: { message: 'Payment successful! Your plan is now active.' }
              });
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Status polling error:', error);
        clearInterval(pollInterval);
      }
    }, 5000); // Poll every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(pollInterval);
  };

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  if (!currentUser?.emailVerified) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Email Verification Required
          </h1>
          <p className="text-gray-600 mb-6">
            To access the payment features, please verify your email address first.
          </p>
          <ResendVerification />
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">No plan selected</h2>
          <p className="mt-2 text-gray-600">Please select a pension plan first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Selected Plan Summary */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Details</h2>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{selectedPlan.name}</h3>
                  <p className="text-gray-600">{selectedPlan.period}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-primary">${selectedPlan.price}</span>
                  <span className="text-gray-600 ml-1">/day</span>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            {paymentStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                paymentStatus === 'completed' ? 'bg-green-50' :
                paymentStatus === 'failed' ? 'bg-red-50' :
                'bg-yellow-50'
              }`}>
                <p className={`font-semibold ${
                  paymentStatus === 'completed' ? 'text-green-700' :
                  paymentStatus === 'failed' ? 'text-red-700' :
                  'text-yellow-700'
                }`}>
                  {paymentStatus === 'completed' && 'Payment completed successfully!'}
                  {paymentStatus === 'failed' && 'Payment failed. Please try again.'}
                  {paymentStatus === 'pending' && 'Processing your payment...'}
                  {paymentStatus === 'awaiting_transfer' && 'Awaiting bank transfer...'}
                </p>
              </div>
            )}

            {/* Payment Method Selection */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-gray-700 font-semibold block mb-4">
                  Select Payment Method
                </label>
                <div className="grid gap-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary bg-opacity-5'
                          : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                        disabled={loading || paymentStatus === 'pending'}
                      />
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <div className="flex-grow">
                        <p className="font-semibold">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Limit: ${method.minAmount} - ${method.maxAmount}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {(paymentMethod === 'mtn' || paymentMethod === 'orange') && (
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    disabled={loading || paymentStatus === 'pending'}
                  />
                </div>
              )}

              {paymentMethod === 'bank_transfer' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Bank Transfer Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Bank Name:</strong> Gorteken Bank</p>
                    <p><strong>Account Name:</strong> Gorteken Holdings Ltd</p>
                    <p><strong>Account Number:</strong> 1234567890</p>
                    <p><strong>Swift Code:</strong> GRTKNBK</p>
                    {transactionId && (
                      <p><strong>Transaction Reference:</strong> {transactionId}</p>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!paymentMethod || loading || paymentStatus === 'pending'}
                className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
                  !paymentMethod || loading || paymentStatus === 'pending'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>

          {/* Payment Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Instructions</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                  1
                </span>
                <p className="text-gray-600">Select your preferred payment method from the options above.</p>
              </div>
              {(paymentMethod === 'mtn' || paymentMethod === 'orange') && (
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                    2
                  </span>
                  <p className="text-gray-600">Enter your mobile number and wait for the payment prompt on your phone.</p>
                </div>
              )}
              {paymentMethod === 'bank_transfer' && (
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                    2
                  </span>
                  <p className="text-gray-600">Make the transfer using the provided bank details and include the Transaction Reference.</p>
                </div>
              )}
              {paymentMethod === 'credit_card' && (
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                    2
                  </span>
                  <p className="text-gray-600">Enter your card details on the secure payment page.</p>
                </div>
              )}
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                  3
                </span>
                <p className="text-gray-600">Once payment is confirmed, you'll receive a confirmation email with your plan details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 