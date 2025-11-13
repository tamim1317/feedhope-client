import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white shadow-inner mt-12">
      <div className="container mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">

          {/* Website Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 text-3xl font-bold text-teal-400 mb-4">
              <span role="img" aria-label="logo">🥬</span>
              <span>FeedHope</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting surplus food with people who need it most. Our mission is zero food waste.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-teal-300">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/" className="hover:text-teal-400 hover:scale-105 transition transform duration-200 inline-block">Home</a>
              </li>
              <li>
                <a href="/available-foods" className="hover:text-teal-400 hover:scale-105 transition transform duration-200 inline-block">Available Foods</a>
              </li>
              <li>
                <a href="/about" className="hover:text-teal-400 hover:scale-105 transition transform duration-200 inline-block">Our Mission</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-teal-400 hover:scale-105 transition transform duration-200 inline-block">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Media + Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-teal-300">Connect & Subscribe</h3>
            
            {/* Social Icons */}
            <div className="flex space-x-4 mb-4">
              {[FaFacebook, FaTwitter, FaInstagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="bg-gray-800 hover:bg-teal-500 p-3 rounded-full text-white transition transform hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

            {/* Newsletter Input */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg font-semibold transition">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 text-center text-sm text-gray-500">
          &copy; {currentYear} FeedHope. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
