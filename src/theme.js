import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a1a1a',
      light: '#333333',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#666666',
      light: '#999999',
      dark: '#333333',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
    success: {
      main: '#10b981', // Verde para respostas "Sim" e gráficos
    },
    error: {
      main: '#ef4444', // Vermelho para respostas "Não"
    },
    info: {
      main: '#3b82f6', // Azul para informações
    },
    warning: {
      main: '#f59e0b', // Amarelo para avisos
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: 700,
      color: '#1a1a1a',
    },
    h2: {
      fontSize: '36px',
      fontWeight: 700,
      color: '#1a1a1a',
    },
    h3: {
      fontSize: '28px',
      fontWeight: 600,
      color: '#1a1a1a',
    },
    h4: {
      fontSize: '24px',
      fontWeight: 600,
      color: '#1a1a1a',
    },
    h5: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#1a1a1a',
    },
    h6: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1a1a1a',
    },
    body1: {
      fontSize: '16px',
      color: '#1a1a1a',
    },
    body2: {
      fontSize: '14px',
      color: '#666666',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '2px solid #e0e0e0',
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '2px solid #e0e0e0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
