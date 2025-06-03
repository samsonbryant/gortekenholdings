import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/slider.css';
import gortekenLogo from '../assets/gorteken_logo.jpg';

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3',
      title: 'Secure Your Future with Private Pension',
      description: 'Plan for a comfortable retirement with our innovative pension solutions'
    },
    {
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3',
      title: 'Expert Financial Management',
      description: 'Professional guidance for your investment portfolio'
    },
    {
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3',
      title: 'Business Development Services',
      description: 'Comprehensive solutions for your business growth'
    },
    {
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3',
      title: 'Insurance & Investment',
      description: 'Protect your assets and grow your wealth'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <div className="relative">
        <Slider {...sliderSettings} className="home-slider">
          {slides.map((slide, index) => (
            <div key={index} className="relative">
              <div className="relative h-[600px]">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 transform transition-all duration-500 translate-y-0">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl max-w-2xl mx-auto transform transition-all duration-500 translate-y-0">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose GHF?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Planning</h3>
              <p className="text-gray-600">
                Personalized retirement strategies designed by industry experts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Future</h3>
              <p className="text-gray-600">
                Your retirement savings are protected and managed with utmost security.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Growth Focused</h3>
              <p className="text-gray-600">
                Optimized investment strategies for maximum retirement benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Planning Your Future?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let our experts help you create a retirement plan that suits your needs.
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-block"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 