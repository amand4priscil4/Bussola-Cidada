import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
} from '@mui/material';
import {
  LocationOn,
  QuestionAnswer,
  People,
  TouchApp,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { totemService } from '../services/totemService';
import { perguntaService } from '../services/perguntaService';
import { usuarioService } from '../services/usuarioService';
import { interacaoService } from '../services/interacaoService';
import { formatNumber } from '../utils/formatters';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totens: 0,
    perguntas: 0,
    usuarios: 0,
    interacoes: 0,
  });
  const [chartData, setChartData] = useState({
    respostas: [],
    totensTop: [],
    perguntasTop: [],
    timeline: [],
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [totensRes, perguntasRes, usuariosRes, interacoesRes] = await Promise.all([
        totemService.getAll().catch(err => ({ data: [] })),
        perguntaService.getAll().catch(err => ({ data: [] })),
        usuarioService.getAll().catch(err => ({ data: [] })),
        interacaoService.getAll().catch(err => ({ data: [] })),
      ]);

      // A API retorna os dados direto em response.data (axios wrapper)
      const totens = Array.isArray(totensRes.data) ? totensRes.data : [];
      const perguntas = Array.isArray(perguntasRes.data) ? perguntasRes.data : [];
      const usuarios = Array.isArray(usuariosRes.data) ? usuariosRes.data : [];
      const interacoes = Array.isArray(interacoesRes.data) ? interacoesRes.data : [];

      console.log('📊 Dados carregados da API:', {
        totens: totens.length,
        perguntas: perguntas.length,
        usuarios: usuarios.length,
        interacoes: interacoes.length,
      });

      // Calcular estatísticas
      setStats({
        totens: totens.length,
        perguntas: perguntas.length,
        usuarios: usuarios.length,
        interacoes: interacoes.length,
      });

      // Processar dados para gráficos
      processChartData(interacoes, totens, perguntas);
    } catch (error) {
      console.error('❌ Erro ao carregar dados do dashboard:', error);
      
      // Fallback: usar dados vazios
      setStats({
        totens: 0,
        perguntas: 0,
        usuarios: 0,
        interacoes: 0,
      });
      
      setChartData({
        respostas: [
          { name: 'Sim', value: 0, color: '#10b981' },
          { name: 'Não', value: 0, color: '#ef4444' },
        ],
        totensTop: [],
        perguntasTop: [],
        timeline: [
          { dia: 'Seg', interacoes: 0 },
          { dia: 'Ter', interacoes: 0 },
          { dia: 'Qua', interacoes: 0 },
          { dia: 'Qui', interacoes: 0 },
          { dia: 'Sex', interacoes: 0 },
          { dia: 'Sáb', interacoes: 0 },
          { dia: 'Dom', interacoes: 0 },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (interacoes, totens, perguntas) => {
    // Distribuição de respostas (Sim vs Não)
    const simCount = interacoes.filter((i) => i.resposta === 'sim').length;
    const naoCount = interacoes.filter((i) => i.resposta === 'nao').length;

    const respostasData = [
      { name: 'Sim', value: simCount, color: '#10b981' },
      { name: 'Não', value: naoCount, color: '#ef4444' },
    ];

    // Top 5 Totens mais utilizados
    const totemCount = {};
    interacoes.forEach((i) => {
      totemCount[i.totem_id] = (totemCount[i.totem_id] || 0) + 1;
    });

    const totensTop = Object.entries(totemCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, count]) => {
        const totem = totens.find((t) => t.totem_id === id);
        return {
          name: totem ? (totem.nome || totem.localizacao?.substring(0, 15) || id.substring(0, 8)) + '...' : id.substring(0, 8) + '...',
          interacoes: count,
        };
      });

    // Top 5 Perguntas mais respondidas
    const perguntaCount = {};
    interacoes.forEach((i) => {
      perguntaCount[i.pergunta_id] = (perguntaCount[i.pergunta_id] || 0) + 1;
    });

    const perguntasTop = Object.entries(perguntaCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, count]) => {
        const pergunta = perguntas.find((p) => p.pergunta_id === id);
        return {
          name: pergunta ? pergunta.texto.substring(0, 20) + '...' : id.substring(0, 8) + '...',
          respostas: count,
        };
      });

    // Timeline de interações (últimos 7 dias)
    const hoje = new Date();
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const timeline = [];

    for (let i = 6; i >= 0; i--) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() - i);
      const diaStr = data.toISOString().split('T')[0]; // YYYY-MM-DD
      
      // Contar interações deste dia
      const interacoesDia = interacoes.filter((interacao) => {
        // Se a interação não tem data, ignora
        if (!interacao.created_at && !interacao.data_interacao && !interacao.data) return false;
        
        const dataInteracao = interacao.created_at || interacao.data_interacao || interacao.data;
        const dataInteracaoStr = new Date(dataInteracao).toISOString().split('T')[0];
        
        return dataInteracaoStr === diaStr;
      }).length;

      timeline.push({
        dia: diasSemana[data.getDay()],
        interacoes: interacoesDia,
      });
    }

    setChartData({
      respostas: respostasData,
      totensTop,
      perguntasTop,
      timeline,
    });
  };

  if (loading) {
    return (
      <Layout title="Painel" breadcrumb="Início">
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout title="Painel" breadcrumb="Início">
      {/* Gráficos */}
      <Grid container spacing={2.5} sx={{ mb: '50px' }}>
        {/* Linha do Tempo COM Stats Integrados */}
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <Paper sx={{ p: 3, border: '1px solid #000', minWidth: '500px' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Interações ao Longo do Tempo
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData.timeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="dia" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="interacoes"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Stats integrados no card */}
            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                      <LocationOn sx={{ fontSize: 18, color: '#6366f1' }} />
                      <Typography variant="caption" color="text.secondary">Totens</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {formatNumber(stats.totens)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                      <QuestionAnswer sx={{ fontSize: 18, color: '#8b5cf6' }} />
                      <Typography variant="caption" color="text.secondary">Perguntas</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {formatNumber(stats.perguntas)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                      <People sx={{ fontSize: 18, color: '#ec4899' }} />
                      <Typography variant="caption" color="text.secondary">Usuários</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {formatNumber(stats.usuarios)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                      <TouchApp sx={{ fontSize: 18, color: '#10b981' }} />
                      <Typography variant="caption" color="text.secondary">Interações</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {formatNumber(stats.interacoes)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Pizza de Respostas */}
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <Paper sx={{ p: 3, border: '1px solid #000', minWidth: '500px' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Distribuição de Respostas
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.respostas}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.respostas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Totens */}
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <Paper sx={{ p: 3, border: '1px solid #000', minWidth: '500px' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Top 5 Totens Mais Utilizados
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData.totensTop} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" stroke="#666" />
                <YAxis dataKey="name" type="category" stroke="#666" width={100} />
                <Tooltip />
                <Bar dataKey="interacoes" fill="#3b82f6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Perguntas */}
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <Paper sx={{ p: 3, border: '1px solid #000', minWidth: '500px' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Top 5 Perguntas Mais Respondidas
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData.perguntasTop} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" stroke="#666" />
                <YAxis dataKey="name" type="category" stroke="#666" width={100} />
                <Tooltip />
                <Bar dataKey="respostas" fill="#f59e0b" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;