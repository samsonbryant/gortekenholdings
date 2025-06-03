import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">GHF</h3>
            <p className="text-gray-300">
              Gorteken Holdings and Financial - Your trusted partner in retirement planning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-secondary">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-secondary">About</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-secondary">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-secondary">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/pension" className="text-gray-300 hover:text-secondary">Private Pension</Link>
              </li>
              <li>
                <Link to="/retirement" className="text-gray-300 hover:text-secondary">Retirement Planning</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-secondary">Job Openings</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@gortekenpension.com</li>
              <li>Phone: (231) 770-153-566</li>
              <li>Address: 16th Street, Sinkor, Monrovia-Liberia</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Gorteken Holdings and Financial. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 