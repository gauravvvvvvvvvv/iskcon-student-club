import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider, createTheme, CssBaseline, responsiveFontSizes } from "@mui/material";

let baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#ea580c' },
    secondary: { main: '#f59e0b' },
    warning: { main: '#ea580c' },
    background: {
      default: '#fffaf3',
      paper: '#ffffff'
    }
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    button: { fontWeight: 700, textTransform: 'none' }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
        containedWarning: {
          boxShadow: '0 6px 18px -4px rgba(234,88,12,0.4)'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          position: 'relative',
          overflow: 'hidden'
        }
      }
    }
  }
});
baseTheme = responsiveFontSizes(baseTheme);

export const metadata: Metadata = {
  title: "ISKCON Student Center",
  description: "A platform for students to connect and share their experiences",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider theme={baseTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
