"use client";
import React, { ReactNode, useState, useEffect, useMemo, createContext, useCallback } from 'react';
import { ThemeProvider, createTheme, CssBaseline, responsiveFontSizes } from '@mui/material';

export const ColorModeContext = createContext<{ mode: 'light' | 'dark'; toggle: () => void }>({ mode: 'light', toggle: () => {} });

function buildTheme(mode: 'light' | 'dark') {
  return responsiveFontSizes(createTheme({
    palette: {
      mode,
      primary: { main: '#ea580c' },
      secondary: { main: '#f59e0b' },
      warning: { main: '#ea580c' },
      background: mode === 'light'
        ? { default: '#fffaf3', paper: '#ffffff' }
        : { default: '#0f1113', paper: '#181b1e' },
      ...(mode === 'dark' ? { text: { primary: '#f5f5f5', secondary: '#c8c8c8' } } : {})
    },
    shape: { borderRadius: 4 },
    typography: {
      fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
      h3: { fontWeight: 800 },
      h4: { fontWeight: 800 },
      button: { fontWeight: 700, textTransform: 'none' }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 24, transition: '0.25s' },
          containedWarning: { boxShadow: '0 4px 12px -2px rgba(234,88,12,0.35)' }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 8, backgroundImage: 'none' }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          colorDefault: { backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(24,27,30,0.85)', backdropFilter: 'blur(14px)' }
        }
      }
    }
  }));
}

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('isc-mode');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const toggle = useCallback(() => {
    setMode(m => {
      const next = m === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('isc-mode', next);
        document.documentElement.dataset.theme = next;
      }
      return next;
    });
  }, []);


  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
