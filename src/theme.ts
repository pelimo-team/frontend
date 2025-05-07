import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#945436',
      light: '#d4b7a3',
      dark: '#9f6549',
    },
    secondary: {
      main: '#905708',
    },
    background: {
      default: '#fff',
      paper: '#f5ebe0',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
      color: '#945436',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#945436',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'none',
          padding: '10px 20px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-15px)',
          },
        },
      },
    },
  },
});

export default theme; 