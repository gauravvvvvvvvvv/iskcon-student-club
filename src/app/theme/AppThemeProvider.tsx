"use client";
import React, { ReactNode, useState, useMemo, createContext, useCallback, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, responsiveFontSizes } from '@mui/material';

export const ColorModeContext = createContext<{ mode: 'light' | 'dark'; toggle: () => void }>({
  mode: 'light',
  toggle: () => { }
});

// New Modern Theme with Indigo/Purple palette
function buildTheme(mode: 'light' | 'dark') {
  return responsiveFontSizes(createTheme({
    palette: {
      mode,
      primary: {
        main: '#6366f1', // Indigo
        light: '#818cf8',
        dark: '#4f46e5',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#a855f7', // Purple
        light: '#c084fc',
        dark: '#9333ea',
        contrastText: '#ffffff',
      },
      background: mode === 'light'
        ? { default: '#f9fafb', paper: '#ffffff' }
        : { default: '#0f172a', paper: '#1e293b' },
      text: mode === 'light'
        ? { primary: '#111827', secondary: '#6b7280' }
        : { primary: '#f9fafb', secondary: '#9ca3af' },
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: "'Inter', system-ui, sans-serif",
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 100,
            padding: '10px 24px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            backgroundImage: 'none',
          },
        },
      },
    },
  }));
}

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('isc-mode');
    if (stored === 'light' || stored === 'dark') {
      setMode(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = useCallback(() => {
    setMode(m => {
      const next = m === 'light' ? 'dark' : 'light';
      localStorage.setItem('isc-mode', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  }, []);

  const theme = useMemo(() => buildTheme(mode), [mode]);

  if (!mounted) {
    return (
      <ThemeProvider theme={buildTheme('light')}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }

  return (
    <ColorModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
