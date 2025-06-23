import React, { useState } from 'react';
import { createShortUrl } from "../services/apiService.js";

export default function UrlShortenerForm({ onShorten }) {
     const [url, setUrl] = useState('');
    const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState('');
  const [error, setError] = useState('');
  const [shortLink, setShortLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createShortUrl({ url, validity, shortcode });
      setShortLink(data.shortLink);
      onShorten?.(data);
    } catch (err) {
      setError(err.message || 'Failed to shorten URL');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" required />
      <input value={validity} onChange={(e) => setValidity(e.target.value)} placeholder="Validity (min)" />
      <input value={shortcode} onChange={(e) => setShortcode(e.target.value)} placeholder="Custom Shortcode" />
      <button type="submit">Shorten</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortLink && <p>Short Link: <a href={shortLink}>{shortLink}</a></p>}</form>
  );
}