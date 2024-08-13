import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage';
import SignUpPage from './components/signUp';
import Article from './components/article';
import SignIn from './components/signIn';
import WriterProfile from './components/writerProfile';
import ReaderProfile from './components/readerProfile';
import ContactUs from './components/contactUs';
import ContactConfirmation from './components/contactConfirmation';
import PostBuilder from './components/postBuilder';



const App: React.FC = () => {

  const dummyArticleData: articleData = {
    title: "Sample Article",
    author: "John Doe",
    uploadDate: "2023-08-08",
    likes: 10,
    dislikes: 2,
    content: "This is a sample article content.\nIt can have multiple paragraphs.",
    images: []
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/contact-confirmation" element={<ContactConfirmation/>} />
      <Route path="/article" element={<Article articleData={dummyArticleData} />} />
      <Route path="/writer-profile" element={<WriterProfile />} />
      <Route path="/reader-profile" element={<ReaderProfile />} />
      <Route path="/write-article" element={<PostBuilder />} />

    </Routes>
  );
};

export default App;