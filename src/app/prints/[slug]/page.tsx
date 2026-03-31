import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { maps } from '@/data/maps';
import { SITE_URL } from '@/lib/constants';
import { isPrintEnabled } from '@/lib/shopify-products';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PrintDetailClient from '@/components/PrintDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const map = maps.find((m) => m.id === slug);

  if (!map || !isPrintEnabled(map.id)) {
    return { title: 'Print Not Found' };
  }

  const title = `${map.city}, ${map.state} (${map.year}) — Framed Print`;
  const description = `Museum-quality framed print of the ${map.year} Sanborn Fire Insurance Map for ${map.city}, ${map.state}. Giclée on archival paper, custom framed by Simply Framed.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/prints/${map.id}`,
      images: [
        {
          url: map.medium,
          width: 1200,
          height: Math.round(1200 / map.aspectRatio),
          alt: `Framed print: ${map.city}, ${map.state} - ${map.year} Sanborn Map`,
        },
      ],
    },
  };
}

export default async function PrintPage({ params }: PageProps) {
  const { slug } = await params;
  const map = maps.find((m) => m.id === slug);

  if (!map || !isPrintEnabled(map.id)) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <PrintDetailClient map={map} />
      <Footer />
    </>
  );
}
