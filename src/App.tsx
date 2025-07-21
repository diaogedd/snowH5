import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/index';
import { ensureLogin } from './auth/oidc'
import IndexLoginPage from './pages/index_login'
import MeMessage from './pages/MeMessage/MeMessage';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexLoginPage />} />
        <Route path="/index" element={<IndexLoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/me-message" element={<MeMessage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
