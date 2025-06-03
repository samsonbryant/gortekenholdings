import React from 'react';
import { useNavigate } from 'react-router-dom';

const Pension = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic Plan',
      price: '1',
      period: 'per day',
      features: [
        'Basic retirement savings',
        'Annual interest rates',
        'Basic health insurance',
        'Quarterly statements',
        'Online account access'
      ],
      recommended: false
    },
    {
      name: 'Standard Plan',
      price: '2',
      period: 'per day',
      features: [
        'Enhanced retirement savings',
        'Higher interest rates',
        'Comprehensive health insurance',
        'Monthly statements',
        'Priority support',
        'Investment options'
      ],
      recommended: true
    },
    {
      name: 'Premium Plan',
      price: '5',
      period: 'per day',
      features: [
        'Maximum retirement benefits',
        'Highest interest rates',
        'Full health coverage',
        'Weekly statements',
        '24/7 VIP support',
        'Diverse investment portfolio',
        'Family coverage options'
      ],
      recommended: false
    }
  ];

  const handleGetStarted = (plan) => {
    navigate('/payment', { state: { selectedPlan: plan } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Private Pension Plans</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure your future with our flexible pension plans. Start with as little as $1 per day
            and build your retirement savings systematically.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                plan.recommended ? 'border-2 border-primary' : ''
              }`}
            >
              {plan.recommended && (
                <div className="bg-primary text-white text-center py-2">
                  <span className="text-sm font-semibold">Recommended</span>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-primary">$</span>
                  <span className="text-6xl font-bold text-primary">{plan.price}</span>
                  <span className="text-xl text-gray-600 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleGetStarted(plan)}
                  className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
                    plan.recommended
                      ? 'bg-primary hover:bg-primary-dark'
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Pension Plans?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Flexible Payments</h3>
              <p className="text-gray-600">Start with just $1 per day and adjust your contributions as needed.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Secure Investment</h3>
              <p className="text-gray-600">Your funds are protected and managed by financial experts.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Health Benefits</h3>
              <p className="text-gray-600">Includes health insurance coverage for added security.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pension; 