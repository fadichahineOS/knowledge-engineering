import React from 'react';
import { Link } from 'react-router-dom';

const ContactConfirmation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6f6f6] px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="block">Knowledge</span>
          <span className="block text-custom-blue">Engineering</span>
        </h1>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Thanks for signing up</h2>
        <p className="mb-4">We endeavor to respond in three to five business days.</p>
        <p className="mb-8">Please check your spam</p>
        <Link 
          to="/" 
          className="bg-custom-blue text-white px-6 py-3 rounded-md shadow-md hover:bg-opacity-90 transition duration-300 inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ContactConfirmation;