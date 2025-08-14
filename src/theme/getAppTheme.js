// src/theme/getAppTheme.ts
import { createTheme } from '@mui/material/styles';

export Mode = 'light' | 'dark';

export const getAppTheme = (mode: Mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: {
              default: '#0d0c1d',
              paper: '#050519',
            },
          }
        : {
            background: {
              default: '#f0f2f5',
              paper: '#ffffff',
            },
          }),
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
  });
