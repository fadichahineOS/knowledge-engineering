import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage';
import SignUpPage from './components/signUp';
import Article from './components/article';
import SignIn from './components/signIn';
import WriterProfile from './components/writerProfile';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/article" element={<Article/>} />
      <Route path="/writer-profile" element={<WriterProfile />} />
    </Routes>
  );
};

export default App;