// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Kumbh_Sans } from 'next/font/google';
import MainLayout from '@/components/layout/MainLayout';

const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-kumbh-sans',
});

export const metadata: Metadata = {
  title: 'E-commerce Product Page',
  description: 'A product page for an e-commerce built with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${kumbhSans.variable}`}>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}