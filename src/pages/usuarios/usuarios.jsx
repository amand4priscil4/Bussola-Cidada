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
  InputAdornment,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import Layout from '../../components/layout/Layout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { usuarioService } from '../../services/usuarioService';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPontuacaoDialog, setOpenPontuacaoDialog] = useState(false);
  const [novoHash, setNovoHash] = useState('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [pontos, setPontos] = useState(0);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    setLoading(true);
    try {
      const response = await usuarioService.getAll();
      const data = Array.isArray(response.data) ? response.data : [];
      setUsuarios(data);
      console.log('👤 Usuários carregados:', data.length);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setNovoHash('');
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNovoHash('');
    setError('');
  };

  const handleCreateUsuario = async () => {
    if (!novoHash.trim()) {
      setError('Por favor, digite um hash de usuário');
      return;
    }

    try {
      await usuarioService.create(novoHash);
      console.log('✅ Usuário criado com sucesso!');
      handleCloseDialog();
      loadUsuarios();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setError(error.response?.data?.detail || 'Erro ao criar usuário. Tente novamente.');
    }
  };

  const handleDeleteUsuario = async (vemHash) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await usuarioService.delete(vemHash);
        console.log('🗑️ Usuário excluído com sucesso!');
        loadUsuarios();
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        alert('Erro ao excluir usuário. Tente novamente.');
      }
    }
  };

  const handleOpenPontuacaoDialog = (usuario) => {
    setUsuarioSelecionado(usuario);
    setPontos(0);
    setOpenPontuacaoDialog(true);
    setError('');
  };

  const handleClosePontuacaoDialog = () => {
    setOpenPontuacaoDialog(false);
    setUsuarioSelecionado(null);
    setPontos(0);
    setError('');
  };

  const handleAtualizarPontuacao = async () => {
    if (!pontos || pontos === 0) {
      setError('Por favor, digite uma quantidade de pontos');
      return;
    }

    try {
      await usuarioService.updatePontuacao(usuarioSelecionado.vem_hash, pontos);
      console.log('✅ Pontuação atualizada com sucesso!');
      handleClosePontuacaoDialog();
      loadUsuarios();
    } catch (error) {
      console.error('Erro ao atualizar pontuação:', error);
      setError('Erro ao atualizar pontuação. Tente novamente.');
    }
  };

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.vem_hash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Layout title="Usuários" breadcrumb="Início" showAddButton={false}>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout 
      title="Usuários" 
      breadcrumb="Início"
      showAddButton={true}
      onAddClick={handleOpenDialog}
    >
      {/* Campo de Busca */}
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Buscar usuário por hash..."
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

      <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid #000' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600, width: '60%' }}>Hash do Usuário</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '20%', textAlign: 'center' }}>Pontuação</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '20%', textAlign: 'center' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuariosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      {searchTerm ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                usuariosFiltrados.map((usuario) => (
                  <TableRow 
                    key={usuario.vem_hash}
                    sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                  >
                    <TableCell>
                      <Chip 
                        label={usuario.vem_hash} 
                        sx={{ 
                          fontFamily: 'monospace',
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={usuario.pontuacao || 0}
                        sx={{ 
                          backgroundColor: '#6366f110',
                          color: '#6366f1',
                          fontWeight: 700,
                          fontSize: 16,
                          minWidth: 60,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenPontuacaoDialog(usuario)}
                        sx={{ 
                          color: 'primary.main',
                          mr: 1,
                          '&:hover': { backgroundColor: 'primary.light' }
                        }}
                        title="Atualizar pontuação"
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteUsuario(usuario.vem_hash)}
                        sx={{ 
                          color: 'error.main',
                          '&:hover': { backgroundColor: 'error.light' }
                        }}
                        title="Excluir usuário"
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

      {/* Resumo */}
      {usuarios.length > 0 && (
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Chip 
            label={`Total de Usuários: ${usuarios.length}`}
            sx={{ fontSize: 14, py: 2, px: 1 }}
          />
          <Chip 
            label={`Pontuação Total: ${usuarios.reduce((acc, u) => acc + (u.pontuacao || 0), 0)}`}
            sx={{ fontSize: 14, py: 2, px: 1 }}
          />
        </Box>
      )}

      {/* Dialog para criar novo usuário */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Novo Usuário
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              label="Hash do Usuário"
              fullWidth
              value={novoHash}
              onChange={(e) => setNovoHash(e.target.value)}
              error={!!error}
              helperText={error}
              placeholder="Ex: user123"
              autoFocus
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancelar
          </Button>
          <Button 
            onClick={handleCreateUsuario} 
            variant="contained"
            disabled={!novoHash.trim()}
          >
            Criar Usuário
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para atualizar pontuação */}
      <Dialog 
        open={openPontuacaoDialog} 
        onClose={handleClosePontuacaoDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Atualizar Pontuação
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Usuário: <strong>{usuarioSelecionado?.vem_hash}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Pontuação atual: <strong>{usuarioSelecionado?.pontuacao || 0}</strong>
            </Typography>
            <TextField
              label="Pontos a adicionar/remover"
              fullWidth
              type="number"
              value={pontos}
              onChange={(e) => setPontos(parseInt(e.target.value) || 0)}
              error={!!error}
              helperText={error || "Use valores positivos para adicionar ou negativos para remover"}
              placeholder="Ex: 10 ou -5"
              autoFocus
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClosePontuacaoDialog} variant="outlined">
            Cancelar
          </Button>
          <Button 
            onClick={handleAtualizarPontuacao} 
            variant="contained"
            disabled={!pontos || pontos === 0}
          >
            Atualizar
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Usuarios;