import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f6f6f6] flex items-center justify-between px-4 py-2 shadow-sm">
      <div className="flex flex-col items-start -space-y-3">
        <span className="text-2xl font-bold">Knowledge</span>
        <span className="text-2xl font-bold text-custom-blue ml-[25%]">Engineering</span>
      </div>
      <nav className="flex space-x-6">
        <Link to="/signin" className="text-gray-600 hover:text-custom-blue">
          Writer Sign In
        </Link>
        <a href="#" className="text-gray-600 hover:text-custom-blue">Our Mission</a>
        <a href="#" className="text-gray-600 hover:text-custom-blue">Twitter</a>
        <a href="#" className="text-gray-600 hover:text-custom-blue">Facebook</a>
        <a href="#" className="text-gray-600 hover:text-custom-blue">Instagram</a>
        <Link to="/signup" className="text-gray-600 hover:text-custom-blue">
          Write For Us
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;