// services/studentAPI.js
import api from './api';

const studentAPI = {
  getAllStudents: (filters) => api.get('/students', { params: filters }),
  getStudentById: (id) => api.get(`/students/${id}`),
  updateProfile: (id, data) => api.put(`/students/${id}`, data),
  uploadResume: (id, file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return api.post(`/students/${id}/resume`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getApplications: (id) => api.get(`/students/${id}/applications`)
};

export default studentAPI;