import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sanborn Fire Maps — A Digital Archive',
  description:
    'Explore over 3,500 meticulously preserved title pages from the Sanborn Fire Insurance Maps — a stunning collection of Victorian-era typography and design, drawn between 1867 and 1923.',
  keywords: [
    'Sanborn maps',
    'fire insurance maps',
    'Victorian typography',
    'American cartography',
    'historical maps',
    'antique maps',
    'map collection',
  ],
  authors: [{ name: 'Brandon Silverman' }],
  openGraph: {
    title: 'Sanborn Fire Maps — A Digital Archive',
    description:
      'Explore over 3,500 meticulously preserved title pages from the Sanborn Fire Insurance Maps.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanborn Fire Maps — A Digital Archive',
    description:
      'Explore over 3,500 meticulously preserved title pages from the Sanborn Fire Insurance Maps.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>{children}</body>
    </html>
  );
}
