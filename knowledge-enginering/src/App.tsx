import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingPage';
import WriterSignIn from './components/writerSignIn';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/writer-signin" element={<WriterSignIn />} />
      </Routes>
    </Router>
  );
};

export default App;