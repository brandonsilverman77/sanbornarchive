import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { maps } from '@/data/maps';
import { SITE_URL } from '@/lib/constants';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'What Are Sanborn Fire Insurance Maps? — History, Purpose & Significance',
  description:
    'Learn about Sanborn Fire Insurance Maps — detailed urban maps created between 1867 and 1970 that documented every building in over 12,000 American cities. Discover their history, purpose, and why they matter today.',
  openGraph: {
    title: 'What Are Sanborn Fire Insurance Maps?',
    description:
      'Detailed urban maps created between 1867 and 1970 that documented every building in over 12,000 American cities.',
    type: 'article',
    url: `${SITE_URL}/guides/what-are-sanborn-maps`,
  },
  alternates: {
    canonical: `${SITE_URL}/guides/what-are-sanborn-maps`,
  },
};

export default function WhatAreSanbornMapsPage() {
  // Pick a few visually interesting favorites for illustrations
  const exampleMaps = maps
    .filter((m) => m.favorite)
    .slice(0, 3);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'What Are Sanborn Maps?', item: `${SITE_URL}/guides/what-are-sanborn-maps` },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Are Sanborn Fire Insurance Maps?',
    description: 'A comprehensive guide to the history, purpose, and significance of Sanborn Fire Insurance Maps.',
    author: { '@type': 'Person', name: 'Brandon Silverman' },
    publisher: { '@type': 'Organization', name: 'Sanborn Fire Maps Archive' },
    url: `${SITE_URL}/guides/what-are-sanborn-maps`,
    mainEntityOfPage: `${SITE_URL}/guides/what-are-sanborn-maps`,
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      <Navigation />
      <main className="guide-page">
        <article className="guide-content">
          <div className="guide-header">
            <div className="state-breadcrumb">
              <Link href="/">Home</Link>
              <span className="state-breadcrumb-sep">/</span>
              <Link href="/guides/what-are-sanborn-maps">Guides</Link>
            </div>
            <h1 className="guide-title">What Are Sanborn Fire Insurance Maps?</h1>
            <p className="guide-subtitle">
              The most detailed urban maps ever created in America — and a window into the cities of the past.
            </p>
          </div>

          <div className="guide-body">
            <p className="guide-lede">
              Between 1867 and 1970, the Sanborn Map Company produced extraordinarily detailed maps of more than 12,000
              American cities and towns. Originally created for fire insurance underwriters, these maps documented every
              building in a city — its size, shape, construction material, number of stories, and use. Today, they are
              among the most valuable primary sources for understanding the built environment of American cities during
              a transformative century.
            </p>

            <h2>The Sanborn Map Company</h2>
            <p>
              Daniel Alfred Sanborn founded the company in 1867 in New York City. What began as a small operation
              producing maps for insurance companies grew into the largest map-publishing firm in the United States.
              At its peak, Sanborn employed hundreds of surveyors who fanned out across the country, meticulously
              documenting every structure in cities large and small.
            </p>
            <p>
              The company&apos;s maps were used by fire insurance underwriters to assess risk. An underwriter could look
              at a Sanborn map and instantly determine whether a building was made of brick or wood, how close it was
              to neighboring structures, whether it had fire walls, and what was stored inside. This information was
              critical for setting insurance premiums in an era when urban fires could — and regularly did — destroy
              entire city blocks.
            </p>

            <h2>What Makes These Maps Special</h2>
            <p>
              Sanborn maps stand apart from other historical maps for their extraordinary level of detail. Each map
              shows individual buildings drawn to scale, with color coding indicating construction materials: pink
              for brick, yellow for wood frame, blue for stone, and green for iron or steel. Building footprints
              include notations about the number of stories, basement presence, roof type, and specific uses like
              &ldquo;dry goods,&rdquo; &ldquo;saloon,&rdquo; or &ldquo;livery stable.&rdquo;
            </p>
            <p>
              But what draws many people to Sanborn maps today has nothing to do with insurance underwriting. The
              title pages of these maps — especially those produced between 1880 and 1920 — feature stunning examples
              of Victorian-era typography and graphic design. Each cover was hand-lettered with elaborate decorative
              type, ornamental borders, and intricate cartographic details unique to the city it represented.
            </p>

            {exampleMaps.length > 0 && (
              <div className="guide-image-grid">
                {exampleMaps.map((map) => (
                  <Link key={map.id} href={`/map/${map.id}`} className="guide-image-card">
                    <Image
                      src={map.thumbnail}
                      alt={`Sanborn Fire Insurance Map: ${map.city}, ${map.state} (${map.year})`}
                      width={300}
                      height={360}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <span className="guide-image-caption">{map.city}, {map.state} ({map.year})</span>
                  </Link>
                ))}
              </div>
            )}

            <h2>Why Sanborn Maps Matter Today</h2>
            <p>
              Long after their original purpose became obsolete, Sanborn maps have found new life as indispensable
              tools for a wide range of disciplines:
            </p>
            <ul>
              <li>
                <strong>Urban historians</strong> use them to trace how cities grew, changed, and sometimes
                shrank over decades of rapid development.
              </li>
              <li>
                <strong>Environmental professionals</strong> rely on Sanborn maps to identify former industrial
                sites, gas stations, dry cleaners, and other properties that may have contaminated soil or
                groundwater — a process central to{' '}
                <Link href="/guides/sanborn-maps-environmental-site-assessments">environmental site assessments</Link>.
              </li>
              <li>
                <strong>Genealogists and family historians</strong> use these maps to{' '}
                <Link href="/guides/sanborn-maps-genealogy-local-history">locate ancestral homes</Link>, understand
                the neighborhoods their families lived in, and add physical context to family stories.
              </li>
              <li>
                <strong>Architects and preservationists</strong> consult them when restoring historic buildings,
                since the maps often document original building configurations long since altered.
              </li>
              <li>
                <strong>Designers and artists</strong> are drawn to the exquisite hand-lettered typography of
                the title pages, which represent a high point in American graphic design.
              </li>
            </ul>

            <h2>The Collection</h2>
            <p>
              The Library of Congress holds the largest collection of Sanborn maps, with approximately 700,000
              individual map sheets covering cities across all 50 states. Many university libraries and state
              archives also maintain significant collections.
            </p>
            <p>
              This archive focuses specifically on the title pages — the ornate covers that introduced each
              volume. We&apos;ve digitized and preserved over 3,500 of these title pages, making them freely
              available for personal use and offering selected maps as{' '}
              <Link href="/prints">museum-quality framed prints</Link>.
            </p>

            <div className="guide-cta">
              <h3>Explore the Archive</h3>
              <p>
                Browse over 3,500 Sanborn map title pages spanning more than a century of American urban history.
              </p>
              <div className="guide-cta-links">
                <Link href="/maps" className="guide-cta-btn">Browse by State</Link>
                <Link href="/#explore" className="guide-cta-btn guide-cta-btn-secondary">Search the Collection</Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
