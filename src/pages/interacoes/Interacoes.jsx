import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import Layout from '../../components/layout/Layout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { interacaoService } from '../../services/interacaoService';
import { perguntaService } from '../../services/perguntaService';

const Interacoes = () => {
  const [interacoes, setInteracoes] = useState([]);
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statsPorPergunta, setStatsPorPergunta] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    processarEstatisticas();
  }, [interacoes, perguntas, searchTerm]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [interacoesRes, perguntasRes] = await Promise.all([
        interacaoService.getAll(),
        perguntaService.getAll(),
      ]);

      const interacoesData = Array.isArray(interacoesRes.data) ? interacoesRes.data : [];
      const perguntasData = Array.isArray(perguntasRes.data) ? perguntasRes.data : [];

      setInteracoes(interacoesData);
      setPerguntas(perguntasData);

      console.log('📊 Dados carregados:', {
        interacoes: interacoesData.length,
        perguntas: perguntasData.length,
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setInteracoes([]);
      setPerguntas([]);
    } finally {
      setLoading(false);
    }
  };

  const processarEstatisticas = () => {
    // Agrupar interações por pergunta
    const grupos = {};

    interacoes.forEach((interacao) => {
      const perguntaId = interacao.pergunta_id;
      
      if (!grupos[perguntaId]) {
        grupos[perguntaId] = {
          pergunta_id: perguntaId,
          total: 0,
          sim: 0,
          nao: 0,
        };
      }

      grupos[perguntaId].total += 1;
      if (interacao.resposta === 'sim') {
        grupos[perguntaId].sim += 1;
      } else if (interacao.resposta === 'nao') {
        grupos[perguntaId].nao += 1;
      }
    });

    // Converter para array e adicionar texto da pergunta
    let stats = Object.values(grupos).map((stat) => {
      const pergunta = perguntas.find((p) => p.pergunta_id === stat.pergunta_id);
      
      return {
        ...stat,
        texto: pergunta ? pergunta.texto : 'Pergunta não encontrada',
        percentualSim: stat.total > 0 ? ((stat.sim / stat.total) * 100).toFixed(1) : 0,
        percentualNao: stat.total > 0 ? ((stat.nao / stat.total) * 100).toFixed(1) : 0,
      };
    });

    // Filtrar por busca
    if (searchTerm.trim()) {
      stats = stats.filter((stat) =>
        stat.texto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stat.pergunta_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar por total de respostas (decrescente)
    stats.sort((a, b) => b.total - a.total);

    setStatsPorPergunta(stats);
  };

  if (loading) {
    return (
      <Layout title="Interações" breadcrumb="Início" showAddButton={false}>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout title="Interações" breadcrumb="Início" showAddButton={false}>
      {/* Campo de Busca */}
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Buscar por pergunta..."
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            maxWidth: 500,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Tabela de Estatísticas por Pergunta */}
      <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid #000' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600, width: '40%' }}>Pergunta</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '10%', textAlign: 'center' }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '15%', textAlign: 'center' }}>Sim</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '15%', textAlign: 'center' }}>Não</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '10%', textAlign: 'center' }}>% Sim</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '10%', textAlign: 'center' }}>% Não</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statsPorPergunta.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      {searchTerm ? 'Nenhuma pergunta encontrada' : 'Nenhuma interação registrada'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                statsPorPergunta.map((stat, index) => (
                  <TableRow 
                    key={stat.pergunta_id}
                    sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                        {stat.texto}
                      </Typography>
                      <Chip 
                        label={stat.pergunta_id.substring(0, 10) + '...'} 
                        size="small" 
                        sx={{ fontFamily: 'monospace', fontSize: 10 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {stat.total}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={stat.sim}
                        sx={{ 
                          backgroundColor: '#10b98120',
                          color: '#10b981',
                          fontWeight: 600,
                          minWidth: 50,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={stat.nao}
                        sx={{ 
                          backgroundColor: '#ef444420',
                          color: '#ef4444',
                          fontWeight: 600,
                          minWidth: 50,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#10b981' }}>
                        {stat.percentualSim}%
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#ef4444' }}>
                        {stat.percentualNao}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Resumo Total */}
      {statsPorPergunta.length > 0 && (
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Chip 
            label={`Total de Perguntas: ${statsPorPergunta.length}`}
            sx={{ fontSize: 14, py: 2, px: 1 }}
          />
          <Chip 
            label={`Total de Interações: ${interacoes.length}`}
            sx={{ fontSize: 14, py: 2, px: 1 }}
          />
        </Box>
      )}
    </Layout>
  );
};

export default Interacoes;