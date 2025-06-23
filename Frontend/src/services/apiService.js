import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function createShortUrl(data) {
  const response = await axios.post(`${API_URL}/shorturls`, data);
  return response.data;
}

export async function getShortUrlStats(shortcode) {
  const response = await axios.get(`${API_URL}/shorturls/stats/${shortcode}`);
  return response.data;
}