import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2023 Knowledge Engineering. All rights reserved.</p>
        <Link to="/writer-signin" className="bg-custom-blue text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300">
          Writer Sign In
        </Link>
      </div>
    </footer>
  );
};

export default Footer;