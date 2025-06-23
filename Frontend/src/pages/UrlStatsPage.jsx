import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShortUrlStats } from "../services/apiService.js"

export default function UrlStatsPage() {
  const { shortcode } = useParams();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getShortUrlStats(shortcode);
        setStats(data);
      } catch (err) {
        setError('Failed to load stats');
      }
    };
    fetchStats();
  }, [shortcode]);

  if (error) return <p>{error}</p>;
  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h2>Stats for {shortcode}</h2>
      <p><strong>Original URL:</strong> {stats.originalUrl}</p>
      <p><strong>Clicks:</strong> {stats.clicks}</p>
      <p><strong>Created At:</strong> {new Date(stats.creationDate).toLocaleString()}</p>
      <p><strong>Expiry:</strong> {new Date(stats.expiry).toLocaleString()}</p>
    </div>
  );
}