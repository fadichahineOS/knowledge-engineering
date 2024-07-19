import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white flex items-center justify-between px-4 py-2">
      <div className="flex flex-col items-start -space-y-3">
        <span className="text-2xl font-bold">Knowledge</span>
        <span className="text-2xl font-bold text-custom-blue ml-[25%]">Engineering</span>
      </div>
      <div className="flex-grow flex justify-center">
        <nav>
          <ul className="flex space-x-6">
            {['Software', 'Electronic', 'Bio-Medical', 'Civil', 'Computer'].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-600 hover:text-custom-blue">{item}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="pl-8 pr-2 py-1 border-b border-custom-blue focus:outline-none"
        />
        <svg
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-custom-blue"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;