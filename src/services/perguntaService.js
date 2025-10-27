import api from './api';

export const perguntaService = {
  getAll: () => api.get('/perguntas'),  // ← REMOVA A BARRA /
  getById: (id) => api.get(`/perguntas/${id}`),
  getUltima: () => api.get('/perguntas/ultima'),
  create: (texto) => api.post(`/perguntas?texto=${encodeURIComponent(texto)}`),  // ← REMOVA A /? e deixe só ?
  delete: (id) => api.delete(`/perguntas/${id}`),
};