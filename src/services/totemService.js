import api from './api';

export const totemService = {
  getAll: () => api.get('/totens'),  // ← REMOVA A BARRA /
  getById: (id) => api.get(`/totens/${id}`),
  create: (latitude, longitude) => 
    api.post(`/totens?latitude=${latitude}&longitude=${longitude}`),  // ← REMOVA A /? e deixe só ?
  delete: (id) => api.delete(`/totens/${id}`),
};