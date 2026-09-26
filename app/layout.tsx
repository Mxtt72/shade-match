import './globals.css';
import type { Metadata } from 'next';
import ShadeMatchApp from '@/components/shade-match-app';

export const metadata: Metadata = {
  title: 'Lune Shade',
  description: 'Luxury beauty shade matching app for color extraction and product discovery.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
