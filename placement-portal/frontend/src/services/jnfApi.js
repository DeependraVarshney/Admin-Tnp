// services/jnfAPI.js
import api from './api';

const jnfAPI = {
  getAllJNFs: (filters) => api.get('/jnf', { params: filters }),
  getJNFById: (id) => api.get(`/jnf/${id}`),
  createJNF: (data) => api.post('/jnf', data),
  updateJNF: (id, data) => api.put(`/jnf/${id}`, data),
  deleteJNF: (id) => api.delete(`/jnf/${id}`),
  submitJNF: (id) => api.post(`/jnf/${id}/submit`),
  approveJNF: (id) => api.post(`/jnf/${id}/approve`),
  rejectJNF: (id, reason) => api.post(`/jnf/${id}/reject`, { reason })
};

export default jnfAPI;

