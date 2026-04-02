import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { maps } from '@/data/maps';
import { SITE_URL } from '@/lib/constants';
import { isPrintEnabled } from '@/lib/shopify-products';
import JsonLd from '@/components/JsonLd';

interface PageProps {
  params: Promise<{ state: string }>;
}

function slugToState(slug: string): string | null {
  const stateSet = new Set(maps.map((m) => m.state));
  for (const state of stateSet) {
    if (state.toLowerCase().replace(/ /g, '-') === slug) {
      return state;
    }
  }
  return null;
}

function stateToSlug(state: string): string {
  return state.toLowerCase().replace(/ /g, '-');
}

function getStateMaps(state: string) {
  const seen = new Set<string>();
  return maps
    .filter((m) => {
      if (m.state !== state || seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    })
    .sort((a, b) => a.city.localeCompare(b.city) || a.year - b.year);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = slugToState(stateSlug);

  if (!state) {
    return { title: 'State Not Found' };
  }

  const stateMaps = getStateMaps(state);
  const cities = new Set(stateMaps.map((m) => m.city));
  const cityList = Array.from(cities).slice(0, 5).join(', ');

  const title = `${state} — Sanborn Fire Insurance Maps`;
  const description = `Browse ${stateMaps.length} Sanborn Fire Insurance Maps from ${state}, including ${cityList}, and more. High-resolution scans free for personal use.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/maps/${stateSlug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/maps/${stateSlug}`,
    },
  };
}

export default async function StatePage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const state = slugToState(stateSlug);

  if (!state) {
    notFound();
  }

  const stateMaps = getStateMaps(state);
  const cities = new Set(stateMaps.map((m) => m.city));
  const printCount = stateMaps.filter((m) => isPrintEnabled(m.id)).length;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: state,
        item: `${SITE_URL}/maps/${stateSlug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Navigation />
      <main className="state-page">
        <div className="state-header">
          <div className="state-breadcrumb">
            <Link href="/">Home</Link>
            <span className="state-breadcrumb-sep">/</span>
            <span>{state}</span>
          </div>
          <h1 className="state-title">{state}</h1>
          <p className="state-subtitle">
            {stateMaps.length} Sanborn {stateMaps.length === 1 ? 'map' : 'maps'} from {cities.size} {cities.size === 1 ? 'city' : 'cities'}
            {printCount > 0 && (
              <> · <Link href="/prints" className="state-prints-link">{printCount} available as prints</Link></>
            )}
          </p>
        </div>

        <div className="state-grid">
          {stateMaps.map((map) => (
            <Link key={map.id} href={`/map/${map.id}`} className="state-card">
              <div className="state-card-image">
                <Image
                  src={map.thumbnail}
                  alt={`Sanborn Fire Insurance Map: ${map.city}, ${state} (${map.year})`}
                  width={300}
                  height={360}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                {isPrintEnabled(map.id) && (
                  <span className="state-card-print-badge">Print available</span>
                )}
              </div>
              <div className="state-card-info">
                <span className="state-card-city">{map.city}</span>
                <span className="state-card-year">{map.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
