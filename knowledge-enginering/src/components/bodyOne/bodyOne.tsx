import React from 'react';
import js from '../../assets/js.svg'
import bridge from '../../assets/bridge.svg'


const BodyOne: React.FC = () => {
  return (
    <div className="h-[40vh] w-full flex justify-between items-center px-8 overflow-hidden">
      <div className="flex flex-col justify-center space-y-4 w-1/3">
        <h1 className="text-6xl font-bold">Welcome</h1>
        <p className="text-lg">
          Knowledge Engineering is a platform by young professionals, for young professionals.
          Stay up to date with your industry, or write for us and express your passion for engineering.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md w-40 shadow-md hover:bg-blue-700 transition duration-300 text-lg">
          Contact Us
        </button>
      </div>
      <div className="relative flex flex-col items-end justify-end w-1/2 h-full">
        <div className="absolute right-[-10%] bottom-0">
          <img src={bridge} alt="Bridge" className="w-[500px] h-auto object-cover" />
        </div>
        <img src={js} alt="JavaScript Logo" className="w-20 h-auto absolute bottom-4 right-4 z-10" />
      </div>
    </div>
  );
};

export default BodyOne;

