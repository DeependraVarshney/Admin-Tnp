// services/api/jnfService.js
import api from './index';

const jnfService = {
  getAll: (params) => api.get('/jnf', { params }),
  getById: (id) => api.get(`/jnf/${id}`),
  create: (data) => api.post('/jnf', data),
  update: (id, data) => api.put(`/jnf/${id}`, data),
  delete: (id) => api.delete(`/jnf/${id}`),
  approve: (id) => api.put(`/jnf/${id}/approve`),
  reject: (id, reason) => api.put(`/jnf/${id}/reject`, { reason }),
  submit: (id) => api.put(`/jnf/${id}/submit`)
};

export default jnfService;

