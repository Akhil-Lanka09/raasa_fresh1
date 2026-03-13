// src/app/layout.tsx
import type { Metadata } from 'next';
import '@/styles/globals.css';
import Providers from '@/components/Providers';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatingCartBadge from '@/components/FloatingCartBadge';

export const metadata: Metadata = {
  title: { default: 'Raasa Harvest', template: '%s | Raasa Harvest' },
  description: 'Farm-fresh rice, fruit boxes and vegetables delivered to your doorstep across Hyderabad.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <Nav />
          {children}
          <FloatingCartBadge />
        </Providers>
      </body>
    </html>
  );
}
