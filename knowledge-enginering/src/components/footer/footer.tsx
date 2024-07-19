import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full h-[50vh] bg-gray-100 flex justify-between items-stretch px-4 sm:px-8 overflow-hidden">
      <div className="flex flex-col justify-center space-y-4 text-xl">
        <a href="#" className="block hover:text-blue-600">Writer Log-in</a>
        <a href="#" className="block hover:text-blue-600">Our Mission</a>
        <a href="#" className="block hover:text-blue-600">Twitter</a>
        <a href="#" className="block hover:text-blue-600">Facebook</a>
        <a href="#" className="block hover:text-blue-600">Instagram</a>
        <a href="#" className="block hover:text-blue-600">Write For Us</a>
      </div>
      <div className="flex items-end pb-8">
        <div className="flex flex-col items-start -space-y-1 sm:-space-y-2">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold">Knowledge</span>
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 ml-[25%]">Engineering</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
