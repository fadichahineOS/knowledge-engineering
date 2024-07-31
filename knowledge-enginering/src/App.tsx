import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage';
import SignUpPage from './components/signUp';
import Article from './components/article';
import SignIn from './components/signIn';
import WriterProfile from './components/writerProfile';
import ReaderProfile from './components/readerProfile';
import BlogPostBuilder from './components/blogPostBuilder';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/article" element={<Article/>} />
      <Route path="/writer-profile" element={<WriterProfile />} />
      <Route path="/reader-profile" element={<ReaderProfile />} />
      <Route path="/create-post" element={<BlogPostBuilder />} />
    </Routes>
  );
};

export default App;