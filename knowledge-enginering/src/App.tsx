import React from 'react';
import Header from './components/header/header';
import BodyOne from './components/bodyOne/bodyOne';
import BodyTwo from './components/bodyTwo/bodyTwo';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <BodyOne />
        <BodyTwo />
      </main>
    </div>
  );
};

export default App;