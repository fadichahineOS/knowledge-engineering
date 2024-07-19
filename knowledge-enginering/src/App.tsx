import React from 'react';
import Header from './components/header/header';
import BodyOne from './components/bodyOne/bodyOne';
import BodyTwo from './components/bodyTwo/bodyTwo';
import Footer from './components/footer/footer';

const App: React.FC = () => {
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

export default App;