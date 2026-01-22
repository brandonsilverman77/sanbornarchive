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
      <body className="antialiased">{children}</body>
    </html>
  );
}
