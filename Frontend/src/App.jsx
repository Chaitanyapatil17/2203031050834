import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UrlShortenerPage from "./pages/UrlShortenerPage.jsx";
import UrlStatsPage from './pages/UrlStatsPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortenerPage />} />
        <Route path="/stats/:shortcode" element={<UrlStatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;