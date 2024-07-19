import React from 'react';
import Header from './header/header';

const WriterSignIn: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f6]">
      <Header />
      <main className="flex-grow">
        <h1 className="text-3xl font-bold text-center mt-8">Writer Sign In</h1>
        {/* Add sign-in form or content here */}
      </main>
    </div>
  );
};

export default WriterSignIn;