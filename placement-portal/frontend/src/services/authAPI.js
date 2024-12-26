// services/authAPI.js
import api from './api';

const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verifyToken: () => api.get('/auth/verify'),
  resetPassword: (email) => api.post('/auth/reset-password', { email }),
  updatePassword: (data) => api.put('/auth/update-password', data)
};

export default authAPI;

