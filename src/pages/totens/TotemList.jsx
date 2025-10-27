import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import Layout from '../../components/layout/Layout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { totemService } from '../../services/totemService';
import { useNotification } from '../../contexts/NotificationContext';
import { formatDate, formatCoordinates } from '../../utils/formatters';

const TotemList = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totens, setTotens] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, totem: null });

  useEffect(() => {
    loadTotens();
  }, []);

  const loadTotens = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await totemService.getAll();
      setTotens(response.data);
    } catch (error) {
      console.error('Erro ao carregar totens:', error);
      setError(true);
      showError('Erro ao carregar totens');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await totemService.delete(deleteDialog.totem.totem_id);
      showSuccess('Totem excluído com sucesso');
      setDeleteDialog({ open: false, totem: null });
      loadTotens();
    } catch (error) {
      console.error('Erro ao excluir totem:', error);
      showError('Erro ao excluir totem');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Layout title="Totens" breadcrumb="Gestão / Totens" showAddButton onAddClick={() => navigate('/totens/novo')}>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Totens" breadcrumb="Gestão / Totens" showAddButton onAddClick={() => navigate('/totens/novo')}>
        <ErrorMessage onRetry={loadTotens} />
      </Layout>
    );
  }

  const paginatedTotens = totens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Layout title="Totens" breadcrumb="Gestão / Totens" showAddButton onAddClick={() => navigate('/totens/novo')}>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>ID do Totem</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Coordenadas</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Latitude</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Longitude</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Data de Criação</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTotens.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Box sx={{ color: 'text.secondary' }}>
                      Nenhum totem cadastrado
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTotens.map((totem) => (
                  <TableRow
                    key={totem.totem_id}
                    hover
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={totem.totem_id.substring(0, 12) + '...'}
                        size="small"
                        sx={{
                          fontFamily: 'monospace',
                          backgroundColor: '#f5f5f5',
                          color: '#1a1a1a',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {formatCoordinates(totem.latitude, totem.longitude)}
                    </TableCell>
                    <TableCell>{totem.latitude?.toFixed(6)}</TableCell>
                    <TableCell>{totem.longitude?.toFixed(6)}</TableCell>
                    <TableCell>{formatDate(totem.data_criacao)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Ver detalhes">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/totens/${totem.totem_id}`)}
                          sx={{ color: 'primary.main' }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteDialog({ open: true, totem });
                          }}
                          sx={{ color: 'error.main', ml: 1 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totens.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>

      <ConfirmDialog
        open={deleteDialog.open}
        title="Confirmar Exclusão"
        message={`Deseja realmente excluir o totem ${deleteDialog.totem?.totem_id?.substring(0, 12)}...? Esta ação não pode ser desfeita.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ open: false, totem: null })}
      />
    </Layout>
  );
};

export default TotemList;
