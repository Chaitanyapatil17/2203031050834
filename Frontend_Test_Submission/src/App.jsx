import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UrlShortenerPage from './pages/UrlShortenerPage.jsx';
import UrlStatsPage from './pages/UrlStatsPage.jsx';
import Header from './components/Header.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Optional Header with Navigation */}
        <Header />

        
        <Routes>
          <Route path="/" element={<Navigate to="/shorten" replace />} />
          <Route path="/shorten" element={<UrlShortenerPage />} />
          <Route path="/stats/:shortcode" element={<UrlStatsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;