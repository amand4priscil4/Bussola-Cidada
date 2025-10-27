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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Chip,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
  } from '@mui/icons-material';
  import Layout from '../../components/layout/Layout';
  import LoadingSpinner from '../../components/common/LoadingSpinner';
  import { perguntaService } from '../../services/perguntaService';
  import { formatDate } from '../../utils/formatters';

const Perguntas = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [novaPergunta, setNovaPergunta] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadPerguntas();
  }, []);

  const loadPerguntas = async () => {
    setLoading(true);
    try {
      const response = await perguntaService.getAll();
      const data = Array.isArray(response.data) ? response.data : [];
      setPerguntas(data);
      console.log('📋 Perguntas carregadas:', data.length);
    } catch (error) {
      console.error('Erro ao carregar perguntas:', error);
      setPerguntas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setNovaPergunta('');
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNovaPergunta('');
    setError('');
  };

  const handleCreatePergunta = async () => {
    if (!novaPergunta.trim()) {
      setError('Por favor, digite uma pergunta');
      return;
    }

    try {
      await perguntaService.create(novaPergunta);
      console.log('✅ Pergunta criada com sucesso!');
      handleCloseDialog();
      loadPerguntas();
    } catch (error) {
      console.error('Erro ao criar pergunta:', error);
      setError('Erro ao criar pergunta. Tente novamente.');
    }
  };

  const handleDeletePergunta = async (perguntaId) => {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      try {
        await perguntaService.delete(perguntaId);
        console.log('🗑️ Pergunta excluída com sucesso!');
        loadPerguntas();
      } catch (error) {
        console.error('Erro ao excluir pergunta:', error);
        alert('Erro ao excluir pergunta. Tente novamente.');
      }
    }
  };

  if (loading) {
    return (
      <Layout title="Perguntas" breadcrumb="Início" showAddButton={false}>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout 
      title="Perguntas" 
      breadcrumb="Início"
      showAddButton={true}
      onAddClick={handleOpenDialog}
    >
      <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid #000' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600, width: '60%' }}>Pergunta</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '15%' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '15%' }}>Data de Criação</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '10%', textAlign: 'center' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {perguntas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      Nenhuma pergunta cadastrada
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                perguntas.map((pergunta) => (
                  <TableRow 
                    key={pergunta.pergunta_id}
                    sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                  >
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {pergunta.texto}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={pergunta.pergunta_id.substring(0, 8) + '...'} 
                        size="small" 
                        sx={{ fontFamily: 'monospace' }}
                      />
                    </TableCell>
                    <TableCell>
                      {pergunta.data_criacao ? formatDate(pergunta.data_criacao) : '-'}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleDeletePergunta(pergunta.pergunta_id)}
                        sx={{ 
                          color: 'error.main',
                          '&:hover': { backgroundColor: 'error.light' }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog para criar nova pergunta */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Nova Pergunta
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              label="Texto da pergunta"
              fullWidth
              multiline
              rows={3}
              value={novaPergunta}
              onChange={(e) => setNovaPergunta(e.target.value)}
              error={!!error}
              helperText={error}
              placeholder="Ex: Você está satisfeito com o transporte público?"
              autoFocus
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancelar
          </Button>
          <Button 
            onClick={handleCreatePergunta} 
            variant="contained"
            disabled={!novaPergunta.trim()}
          >
            Criar Pergunta
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Perguntas;