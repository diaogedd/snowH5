import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';
import { oidcConfig } from './auth/oidc-config';
import AuthGuard from './components/AuthGuard';
import HomePage from './pages/home/index';
import IndexLoginPage from './pages/index_login';
import MeMessage from './pages/MeMessage/MeMessage';
import { MeGroupPage } from './pages/MeMessage/MeGroup';
import { MeJoinPage } from './pages/MeMessage/MeJoin';

import { UpdateGroup } from './pages/updateGroup';

const App: React.FC = () => {
  return (
    <AuthProvider {...oidcConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexLoginPage />} />
          <Route path="/index" element={<IndexLoginPage />} />
          <Route
            path="/home"
            element={
              <AuthGuard>
                <HomePage />
              </AuthGuard>
            }
          />
          <Route
            path="/me-message"
            element={
              <AuthGuard>
                <MeMessage />
              </AuthGuard>
            }
          />
          <Route
            path="/me-group"
            element={
              <AuthGuard>
                <MeGroupPage />
              </AuthGuard>
            }
          />
          <Route
            path="/me-join"
            element={
              <AuthGuard>
                <MeJoinPage />
              </AuthGuard>
            }
          />

          <Route
            path="/update-group/:type/:id"
            element={
              <AuthGuard>
                <UpdateGroup />
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
