import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';
import { oidcConfig } from './auth/oidc-config';
import AuthGuard from './components/AuthGuard';
import HomePage from './pages/home/index';
import IndexLoginPage from './pages/index_login';
import MeMessage from './pages/MeMessage/MeMessage';
import { MeGroup } from './pages/MeMessage/MeGroup/MeGroup';
import { MyGroups } from './pages/MeMessage/MyGroups/MyGroups';

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
                <MeGroup />
              </AuthGuard>
            }
          />
          <Route
            path="/my-groups"
            element={
              <AuthGuard>
                <MyGroups />
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
