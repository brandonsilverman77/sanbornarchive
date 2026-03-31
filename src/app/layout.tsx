import type { Metadata } from 'next';
import './globals.css';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { getOrganizationJsonLd } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sanborn Fire Maps — A Digital Archive',
    template: `%s | ${SITE_NAME}`,
  },
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
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanborn Fire Maps — A Digital Archive',
    description:
      'Explore over 3,500 meticulously preserved title pages from the Sanborn Fire Insurance Maps.',
  },
  alternates: {
    canonical: SITE_URL,
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
      <body style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
        <GoogleAnalytics />
        <JsonLd data={getOrganizationJsonLd()} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
