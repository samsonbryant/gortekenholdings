import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const jobs = [
    {
      id: 1,
      title: 'Financial Advisor',
      location: 'Monrovia, Liberia',
      type: 'Full-time',
      description: 'Looking for experienced financial advisors to help clients plan their retirement and manage their pension investments.',
      requirements: [
        'Bachelor\'s degree in Finance, Economics, or related field',
        'Minimum 3 years experience in financial advisory',
        'Strong knowledge of Liberian financial markets',
        'Excellent communication skills',
        'Must be a Liberian citizen or have valid work permit'
      ]
    },
    {
      id: 2,
      title: 'Customer Service Representative',
      location: 'Monrovia, Liberia',
      type: 'Full-time',
      description: 'Join our customer service team to assist clients with their pension and retirement planning needs.',
      requirements: [
        'Bachelor\'s degree in any field',
        'Excellent communication skills in English',
        'Knowledge of local languages is a plus',
        'Customer service experience preferred',
        'Must be a Liberian citizen'
      ]
    },
    {
      id: 3,
      title: 'Investment Analyst',
      location: 'Monrovia, Liberia',
      type: 'Full-time',
      description: 'Analyze investment opportunities and manage client portfolios in the Liberian market.',
      requirements: [
        'Bachelor\'s degree in Finance, Economics, or related field',
        'Strong analytical skills',
        'Knowledge of Liberian investment landscape',
        'Proficiency in financial modeling',
        'Must be a Liberian citizen or have valid work permit'
      ]
    }
  ];

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        form.current,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      setStatus({
        type: 'success',
        message: 'Your application has been submitted successfully!'
      });
      form.current.reset();
      setSelectedJob(null);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'There was an error submitting your application. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Career Opportunities</h1>
          <p className="text-xl max-w-3xl">
            Join our team and help shape the future of retirement planning in Liberia.
          </p>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {selectedJob ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-primary hover:text-primary-dark mb-6 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Jobs
                </button>

                <h2 className="text-3xl font-bold mb-4">{selectedJob.title}</h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                    {selectedJob.location}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                    {selectedJob.type}
                  </span>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Job Description</h3>
                  <p className="text-gray-600 mb-6">{selectedJob.description}</p>
                  
                  <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <form ref={form} onSubmit={handleApply} className="space-y-6">
                  <input
                    type="hidden"
                    name="job_title"
                    value={selectedJob.title}
                  />
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="user_name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="user_phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-gray-700 mb-2">
                      Work Experience
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                      placeholder="Please describe your relevant work experience"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="resume" className="block text-gray-700 mb-2">
                      Resume/CV
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  {status.message && (
                    <div
                      className={`p-4 rounded-lg ${
                        status.type === 'success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {status.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary-dark'
                    }`}
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="grid gap-6">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                            {job.location}
                          </span>
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers; 