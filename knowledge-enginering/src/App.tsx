import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage';
import WriterSignIn from './components/signIn';
import SignUpPage from './components/signUp';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<WriterSignIn />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default App;