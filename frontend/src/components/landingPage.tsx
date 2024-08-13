import React from 'react';
import Header from './header/header';
import BodyOne from './bodyOne/bodyOne';
import BodyTwo from './bodyTwo/bodyTwo';
import Footer from './footer/footer';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f6]">
      <Header />
      <main className="flex-grow">
        <BodyOne />
        <BodyTwo />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;