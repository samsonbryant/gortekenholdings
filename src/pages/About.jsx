import React from 'react';
import gortekenLogo from '../assets/gorteken_logo.jpg';

const About = () => {
  const teamMembers = [
    {
      name: 'Jappah Maxwell Hooks',
      position: 'CEO & Founder /President',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Ms Jeziah Quiyea',
      position: 'Director of Administration',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Cllr. Roosevelt Gould',
      position: 'Vice for President for Legal Affairs',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Welewon Walterson Teah',
      position: 'Vice President for Finance & CFO',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const values = [
    "Increase participants' savings by adding yearly interest",
    "Participants Assistance Program (PAP) including legal assistance, family counseling, and skills training",
    "Medical Insurance Assistance Cost-Sharing Fund (MEDICS-FUND)",
    "Participatory & joint decision making for investment",
    "Entrepreneurship and loan scheme for business startup",
    "Target demographic: Liberians aged 18-50",
    "Flexible Alternative Plan Years",
    "Early and voluntary retirement options",
    "Cancellation/withdrawal and re-enrollment options",
    "Affordable premium/daily payments",
    "Fund withdrawal options after 'Vesting Period'",
    "Advanced system and financial management infrastructure"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-primary text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center">
            <img src={gortekenLogo} alt="Gorteken Logo" className="h-32 w-auto mb-8" />
            <h1 className="text-5xl font-bold mb-6">About Gorteken Holdings & Financials</h1>
            <p className="text-xl max-w-3xl mx-auto">
              A subsidiary of Gorteken Holdings, LLC, transforming retirement planning in Liberia
              through innovative pension solutions and comprehensive financial services.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To redefine retirement planning in Liberia by offering innovative pension solutions,
                  personalized financial guidance, and a trusted platform for savings growth. We are
                  committed to prudent stewardship, transparency, and delivering lifelong value—helping
                  every client achieve the retirement they've worked for and dreamed of.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be Liberia's most trusted and transformative private pension fund—where excellence,
                  integrity, agility, and client empowerment converge. We envision a future where every
                  Liberian retires with confidence, comfort, and complete control over their financial destiny.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Description Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Business Overview</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Gorteken Holdings & Financials is registered under the laws of the Republic of Liberia
                with Tax Identification Number (TIN) 501810668 and is engaged in other Monetary
                Intermediation with code 6419 of the Liberia Business Registry Act.
              </p>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Services</h3>
                  <ul className="space-y-4">
                    {[
                      "Pension and Retirement Services",
                      "Financial Management",
                      "Business Development Consultancy",
                      "Insurance and Investment",
                      "Project Management",
                      "Real Estate Development",
                      "Energy and Health Services"
                    ].map((service, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-6 w-6 text-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Target Market</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      Our service targets 18-50 years old Liberians who would like to enroll in this
                      unique brand of service. The PPRP, fashioned after the United States IRS 401K,
                      will manage, save and invest millions of retirement funds for thousands of
                      Liberians to help them live a comfortable life after retirement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values & Benefits</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 flex items-start">
                  <svg className="h-6 w-6 text-primary mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Mitigation Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Risk Mitigation</h2>
            <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
              We understand the concerns regarding financial security and have implemented robust
              measures to protect our clients' savings and guarantee their future financial security.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Regulatory Compliance",
                  content: "Compliance with CBL regulations and proposed supervision as an Independent Oversight Body (IOB).",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                },
                {
                  title: "International Partnership",
                  content: "MOU with SULLY TRUST, a British Wealth & Funds Management entity with over 700 years of experience.",
                  icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                },
                {
                  title: "Modern Infrastructure",
                  content: "Advanced system infrastructure and applications for online fund monitoring.",
                  icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                },
                {
                  title: "Banking Partnerships",
                  content: "Strategic partnerships with banks for enhanced monitoring and security.",
                  icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <svg className="h-8 w-8 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-700">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-full mx-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 