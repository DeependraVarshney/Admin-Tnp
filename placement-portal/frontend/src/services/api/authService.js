// services/api/authService.js
import api from './index';

const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verifyToken: () => api.get('/auth/verify'),
  resetPassword: (email) => api.post('/auth/reset-password', { email }),
  changePassword: (data) => api.post('/auth/change-password', data),
  updateProfile: (data) => api.put('/auth/profile', data)
};

export default authService;

