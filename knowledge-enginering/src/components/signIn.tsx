import React from 'react';
import Header from './header/header';
import SignInPage from './signInPage/signInPage';
import Footer from './footer/footer';

const WriterSignIn: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f6]">
      <Header />
      <main className="flex-grow">
        <SignInPage/>
      </main>
      <Footer/>
    </div>
  );
};

export default WriterSignIn;