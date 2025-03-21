import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'REZERO - Revolutionary Electric Scooter',
  description: 'Experience the future of urban mobility with REZERO electric scooters. Combining style, performance, and sustainability.',
  keywords: 'electric scooter, urban mobility, sustainable transport, REZERO',

  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} antialiased bg-[#959595]`}>{children}</body>
    </html>
  );
}