import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { AppThemeProvider } from "./theme/AppThemeProvider";

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
    <html lang="en" data-theme="light">
      <body className="antialiased">
        <AppThemeProvider>
          {children}
        </AppThemeProvider>
      </body>
    </html>
  );
}
