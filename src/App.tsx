import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/index/index';
import { ensureLogin } from './auth/oidc'

import MeMessage from './pages/MeMessage/MeMessage';

const App: React.FC = () => {

  useEffect(() => {
    ensureLogin()
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/index" element={<IndexPage />} />
        <Route path="/me-message" element={<MeMessage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
