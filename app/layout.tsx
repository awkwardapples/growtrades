import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GrowTrades — Growth Systems for UK Trades Businesses',
  description:
    'GrowTrades transforms local trades businesses into scalable modern operations. Lead generation websites, instant quote systems, local SEO, and AI-powered growth automation.',
  keywords: [
    'trades marketing UK',
    'plumber website',
    'electrician leads',
    'trades growth agency',
    'local SEO trades',
    'quote automation',
    'trades business growth',
  ],
  openGraph: {
    title: 'GrowTrades — Growth Systems for UK Trades Businesses',
    description:
      'From manual quoting to automated growth. GrowTrades transforms local trades businesses into modern, scalable operations.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#F7F6F4] text-[#111111] min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
