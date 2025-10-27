import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';

const AppBar = ({ title, breadcrumb, onAddClick, showAddButton = false }) => {
  return (
    <MuiAppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        color: 'text.primary',
        mb: 2,
      }}
    >
      <Toolbar sx={{ px: 0, minHeight: '60px !important', alignItems: 'center', pt: 1, pb: 1 }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          {breadcrumb && (
            <>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                {breadcrumb}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                /
              </Typography>
            </>
          )}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>

        {showAddButton && (
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddClick}
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Adicionar
            </Button>
          </Box>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;