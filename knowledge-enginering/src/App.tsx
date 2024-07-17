import React from 'react';
import Header from './components/header/header';
import BodyOne from './components/bodyOne/bodyOne';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="h-[90vh]">
        <BodyOne />
        {/* Article carousel component will go here */}
      </main>
    </div>
  );
};

export default App;