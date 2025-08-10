"use client";
import React, { ReactNode } from 'react';
import { ThemeProvider, createTheme, CssBaseline, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#ea580c' },
    secondary: { main: '#f59e0b' },
    warning: { main: '#ea580c' },
    background: { default: '#fffaf3', paper: '#ffffff' }
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    button: { fontWeight: 700, textTransform: 'none' }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999 },
        containedWarning: { boxShadow: '0 6px 18px -4px rgba(234,88,12,0.4)' }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 28, position: 'relative', overflow: 'hidden' }
      }
    }
  }
});

theme = responsiveFontSizes(theme);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
