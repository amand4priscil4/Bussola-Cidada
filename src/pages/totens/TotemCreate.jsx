import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Layout from '../../components/layout/Layout';
import { totemService } from '../../services/totemService';
import { useNotification } from '../../contexts/NotificationContext';

// Fix para o ícone do marcador do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
};

const TotemCreate = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({
    lat: -8.0522,
    lng: -34.8953, // Recife, PE (Brasil)
  });
  const [errors, setErrors] = useState({});

  const handleLatitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setPosition({ ...position, lat: value });
    }
  };

  const handleLongitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setPosition({ ...position, lng: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!position.lat || position.lat < -90 || position.lat > 90) {
      newErrors.latitude = 'Latitude deve estar entre -90 e 90';
    }

    if (!position.lng || position.lng < -180 || position.lng > 180) {
      newErrors.longitude = 'Longitude deve estar entre -180 e 180';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      showError('Por favor, corrija os erros no formulário');
      return;
    }

    setLoading(true);
    try {
      await totemService.create(position.lat, position.lng);
      showSuccess('Totem criado com sucesso!');
      navigate('/totens');
    } catch (error) {
      console.error('Erro ao criar totem:', error);
      showError('Erro ao criar totem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Novo Totem" breadcrumb="Gestão / Totens / Novo">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Informações do Totem
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Latitude"
                type="number"
                value={position.lat}
                onChange={handleLatitudeChange}
                error={!!errors.latitude}
                helperText={errors.latitude || 'Valor entre -90 e 90'}
                inputProps={{
                  step: 'any',
                  min: -90,
                  max: 90,
                }}
                sx={{ mb: 3 }}
                required
              />

              <TextField
                fullWidth
                label="Longitude"
                type="number"
                value={position.lng}
                onChange={handleLongitudeChange}
                error={!!errors.longitude}
                helperText={errors.longitude || 'Valor entre -180 e 180'}
                inputProps={{
                  step: 'any',
                  min: -180,
                  max: 180,
                }}
                sx={{ mb: 3 }}
                required
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/totens')}
                  fullWidth
                  sx={{
                    color: 'text.primary',
                    borderColor: 'divider',
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar Totem'}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Localização no Mapa
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Clique no mapa para selecionar a localização do totem
            </Typography>

            <Box sx={{ height: 400, borderRadius: 2, overflow: 'hidden', border: '2px solid #e0e0e0' }}>
              <MapContainer
                center={[position.lat, position.lng]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} setPosition={setPosition} />
              </MapContainer>
            </Box>

            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <strong>Coordenadas selecionadas:</strong>
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', mt: 1 }}>
                Lat: {position.lat.toFixed(6)}, Lng: {position.lng.toFixed(6)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default TotemCreate;
