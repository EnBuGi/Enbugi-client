import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import 'github-markdown-css/github-markdown-dark.css';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'En#',
  description: 'En# Online Judge',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          'min-h-screen bg-background text-main antialiased',
          'selection:bg-primary selection:text-white',
        ].join(' ')}
      >
        {children}
      </body>
    </html>
  );
}
