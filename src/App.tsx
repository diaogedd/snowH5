import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/index/index';
import MeMessage from './pages/MeMessage/MeMessage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/me-message" element={<MeMessage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
