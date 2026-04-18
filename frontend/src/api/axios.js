//frontend/src/api/axios.js
import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://portfolio-app-nn9w.onrender.com/api';
export const UPLOAD_BASE_URL = API_BASE_URL.replace(/\/api$/, '');

const instance = axios.create({
  baseURL: API_BASE_URL,
});

// This interceptor runs before EVERY request.
// It reads the token from localStorage and adds it to the Authorization header.
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;