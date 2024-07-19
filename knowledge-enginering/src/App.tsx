import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage';
import WriterSignIn from './components/writerSignIn';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/writer-signin" element={<WriterSignIn />} />
    </Routes>
  );
};

export default App;