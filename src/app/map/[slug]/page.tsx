import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { maps } from '@/data/maps';
import { SITE_URL } from '@/lib/constants';
import { getMapJsonLd, getProductJsonLd, getFaqJsonLd } from '@/lib/jsonld';
import { isPrintEnabled } from '@/lib/shopify-products';
import JsonLd from '@/components/JsonLd';
import MapDetailClient from '@/components/MapDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const map = maps.find((m) => m.id === slug);

  if (!map) {
    return { title: 'Map Not Found' };
  }

  const title = `${map.city}, ${map.state} (${map.year}) — Sanborn Fire Insurance Map`;
  const description = `View the ${map.year} Sanborn Fire Insurance Map title page for ${map.city}, ${map.state}. High-resolution scan from the Sanborn Map Company archives, free for personal use.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/map/${map.id}`,
      images: [
        {
          url: map.medium,
          width: 1200,
          height: Math.round(1200 / map.aspectRatio),
          alt: `${map.city}, ${map.state} - ${map.year} Sanborn Map`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [map.medium],
    },
    alternates: {
      canonical: `${SITE_URL}/map/${map.id}`,
    },
  };
}

export default async function MapPage({ params }: PageProps) {
  const { slug } = await params;
  const map = maps.find((m) => m.id === slug);

  if (!map) {
    notFound();
  }

  const productJsonLd = getProductJsonLd(map);
  const printEnabled = isPrintEnabled(map.id);

  return (
    <>
      <JsonLd data={getMapJsonLd(map)} />
      {productJsonLd && <JsonLd data={productJsonLd} />}
      {printEnabled && <JsonLd data={getFaqJsonLd()} />}
      <MapDetailClient map={map} />
    </>
  );
}
