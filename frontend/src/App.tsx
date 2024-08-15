import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage';
import SignUpPage from './components/signUp';
import SignIn from './components/signIn';
import WriterProfile from './components/writerProfile';
import ReaderProfile from './components/readerProfile';
import ContactUs from './components/contactUs';
import ContactConfirmation from './components/contactConfirmation';
import PostBuilder from './components/postBuilder';
import AdminDashboard from './components/adminDashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/contact-confirmation" element={<ContactConfirmation/>} />
      <Route path="/writer-profile" element={<WriterProfile />} />
      <Route path="/reader-profile" element={<ReaderProfile />} />
      <Route path="/write-article" element={<PostBuilder />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;