import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/index';
import { ensureLogin } from './auth/oidc'
import IndexLoginPage from './pages/index_login'
import MeMessage from './pages/MeMessage/MeMessage';
import { MeGroup } from './pages/MeMessage/MeGroup/MeGroup';
import { MyGroups } from './pages/MeMessage/MyGroups/MyGroups';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexLoginPage />} />
        <Route path="/index" element={<IndexLoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/me-message" element={<MeMessage />} />
        <Route path="/me-group" element={<MeGroup />} />
        <Route path="/my-groups" element={<MyGroups />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
