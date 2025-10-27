import api from './api';

export const usuarioService = {
  getAll: () => api.get('/usuarios'),
  getByHash: (vemHash) => api.get(`/usuarios/${vemHash}`),
  create: (vemHash) => api.post(`/usuarios/${vemHash}`),
  delete: (vemHash) => api.delete(`/usuarios/${vemHash}`),
  updatePontuacao: (vemHash, pontos) => api.patch(`/usuarios/${vemHash}/pontuacao?pontos=${pontos}`),
};

export default usuarioService;