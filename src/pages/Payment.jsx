import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const selectedPlan = location.state?.selectedPlan;
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      icon: '📱',
      description: 'Pay using MTN Mobile Money'
    },
    {
      id: 'orange',
      name: 'Orange Money',
      icon: '📱',
      description: 'Pay using Orange Money'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Pay using bank transfer'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Here you would integrate with your payment processing service
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Payment initiated! Please complete the transaction on your mobile phone.');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
                      />
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <div>
                        <p className="font-semibold">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
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
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={!paymentMethod || loading}
                className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
                  loading
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
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                  2
                </span>
                <p className="text-gray-600">Enter your mobile number if using mobile money.</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                  3
                </span>
                <p className="text-gray-600">Click "Proceed to Payment" and follow the instructions on your phone.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 