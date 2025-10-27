import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#1a1a1a',
        color: 'white',
        borderTop: '1px solid #333',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Coluna 1: Nome do Projeto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Bússola Cidadã
            </Typography>
            <Typography variant="body2" color="grey.400">
              Sistema de Gestão de Interações em Totens
            </Typography>
            <Typography variant="caption" color="grey.500" sx={{ mt: 1, display: 'block' }}>
              Versão 1.0.0
            </Typography>
          </Grid>

          {/* Coluna 2: Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Links Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link
                href="#"
                color="grey.400"
                underline="hover"
                sx={{ '&:hover': { color: 'white' } }}
              >
                Sobre
              </Link>
              <Link
                href="#"
                color="grey.400"
                underline="hover"
                sx={{ '&:hover': { color: 'white' } }}
              >
                Contato
              </Link>
              <Link
                href="#"
                color="grey.400"
                underline="hover"
                sx={{ '&:hover': { color: 'white' } }}
              >
                Política de Privacidade
              </Link>
            </Box>
          </Grid>

          {/* Coluna 3: Copyright */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Informações
            </Typography>
            <Typography variant="body2" color="grey.400">
              © 2025 Bússola Cidadã
            </Typography>
            <Typography variant="body2" color="grey.400">
              Todos os direitos reservados.
            </Typography>
          </Grid>
        </Grid>

        {/* Linha de Copyright no fundo */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: '1px solid #333',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="grey.500">
            Desenvolvido para análise de Big Data em Transporte Público
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;