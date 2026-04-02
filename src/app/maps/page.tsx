import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { maps } from '@/data/maps';
import { isPrintEnabled } from '@/lib/shopify-products';
import { SITE_URL } from '@/lib/constants';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Browse Maps by State — Sanborn Fire Insurance Maps',
  description:
    'Browse over 3,500 Sanborn Fire Insurance Maps organized by state. Explore historic maps from across the United States, dating from 1867 to 1923.',
  openGraph: {
    title: 'Browse Maps by State — Sanborn Fire Insurance Maps',
    description:
      'Browse over 3,500 Sanborn Fire Insurance Maps organized by state. Explore historic maps from across the United States, dating from 1867 to 1923.',
    type: 'website',
    url: `${SITE_URL}/maps`,
  },
  alternates: {
    canonical: `${SITE_URL}/maps`,
  },
};

function stateToSlug(state: string): string {
  return state.toLowerCase().replace(/ /g, '-');
}

interface StateInfo {
  name: string;
  slug: string;
  mapCount: number;
  cityCount: number;
  printCount: number;
  previewMaps: { thumbnail: string; city: string; year: number }[];
}

function getStateData(): StateInfo[] {
  const stateMap = new Map<string, { cities: Set<string>; maps: typeof maps; printCount: number }>();

  // Deduplicate by ID
  const seen = new Set<string>();
  for (const map of maps) {
    if (seen.has(map.id)) continue;
    seen.add(map.id);

    if (!stateMap.has(map.state)) {
      stateMap.set(map.state, { cities: new Set(), maps: [], printCount: 0 });
    }
    const entry = stateMap.get(map.state)!;
    entry.cities.add(map.city);
    entry.maps.push(map);
    if (isPrintEnabled(map.id)) entry.printCount++;
  }

  return Array.from(stateMap.entries())
    .map(([name, data]) => ({
      name,
      slug: stateToSlug(name),
      mapCount: data.maps.length,
      cityCount: data.cities.size,
      printCount: data.printCount,
      previewMaps: data.maps
        .filter((m) => m.favorite)
        .slice(0, 4)
        .concat(data.maps.filter((m) => !m.favorite))
        .slice(0, 4)
        .map((m) => ({ thumbnail: m.thumbnail, city: m.city, year: m.year })),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function MapsIndexPage() {
  const stateData = getStateData();
  const totalMaps = stateData.reduce((sum, s) => sum + s.mapCount, 0);

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
        name: 'Maps by State',
        item: `${SITE_URL}/maps`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Navigation />
      <main className="maps-index-page">
        <div className="maps-index-header">
          <div className="state-breadcrumb">
            <Link href="/">Home</Link>
            <span className="state-breadcrumb-sep">/</span>
            <span>Maps by State</span>
          </div>
          <h1 className="maps-index-title">Browse by State</h1>
          <p className="maps-index-subtitle">
            {totalMaps.toLocaleString()} Sanborn Fire Insurance Maps from {stateData.length} states
          </p>
        </div>

        <div className="maps-index-grid">
          {stateData.map((state) => (
            <Link key={state.slug} href={`/maps/${state.slug}`} className="maps-index-card">
              <div className="maps-index-card-previews">
                {state.previewMaps.map((preview, i) => (
                  <div key={i} className="maps-index-card-thumb">
                    <Image
                      src={preview.thumbnail}
                      alt={`Sanborn Fire Insurance Map: ${preview.city} (${preview.year})`}
                      width={150}
                      height={180}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
              <div className="maps-index-card-info">
                <h2 className="maps-index-card-state">{state.name}</h2>
                <p className="maps-index-card-meta">
                  {state.mapCount} {state.mapCount === 1 ? 'map' : 'maps'} · {state.cityCount} {state.cityCount === 1 ? 'city' : 'cities'}
                </p>
                {state.printCount > 0 && (
                  <p className="maps-index-card-prints">
                    {state.printCount} available as prints
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
