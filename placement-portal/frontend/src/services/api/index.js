// services/api/index.js
import axios from 'axios';
import { store } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { setError } from '../../store/slices/uiSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch(logout());
          break;
        case 403:
          store.dispatch(setError({ message: 'Access denied', severity: 'error' }));
          break;
        case 500:
          store.dispatch(setError({ message: 'Server error', severity: 'error' }));
          break;
        default:
          store.dispatch(setError({ 
            message: error.response.data.message || 'An error occurred', 
            severity: 'error' 
          }));
      }
    }
    return Promise.reject(error);
  }
);

export default api;

