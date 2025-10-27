import api from './api';

export const interacaoService = {
  getAll: () => api.get('/interacoes'),  // ← REMOVA A BARRA /
  create: (vemHash, perguntaId, totemId, resposta) => 
    api.post(`/interacoes?vem_hash=${vemHash}&pergunta_id=${perguntaId}&totem_id=${totemId}&resposta=${resposta}`),  // ← REMOVA A /? e deixe só ?
  verificar: (vemHash, perguntaId) => 
    api.get(`/interacoes/verificar?vem_hash=${vemHash}&pergunta_id=${perguntaId}`),
  getScore: (perguntaId) => api.get(`/interacoes/score/${perguntaId}`),
  deleteByPergunta: (perguntaId) => api.delete(`/interacoes/pergunta/${perguntaId}`),
};