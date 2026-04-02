import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/lib/constants';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'How to Read a Sanborn Fire Insurance Map — Symbols, Colors & Key',
  description:
    'Learn how to read and interpret Sanborn Fire Insurance Maps. Understand the color codes, symbols, abbreviations, and conventions used in these detailed urban maps from 1867–1970.',
  openGraph: {
    title: 'How to Read a Sanborn Fire Insurance Map',
    description:
      'Understand the color codes, symbols, abbreviations, and conventions used in Sanborn Fire Insurance Maps.',
    type: 'article',
    url: `${SITE_URL}/guides/how-to-read-sanborn-maps`,
  },
  alternates: {
    canonical: `${SITE_URL}/guides/how-to-read-sanborn-maps`,
  },
};

export default function HowToReadSanbornMapsPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'How to Read Sanborn Maps', item: `${SITE_URL}/guides/how-to-read-sanborn-maps` },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Read a Sanborn Fire Insurance Map',
    description: 'A practical guide to interpreting the symbols, colors, and abbreviations used in Sanborn maps.',
    author: { '@type': 'Person', name: 'Brandon Silverman' },
    publisher: { '@type': 'Organization', name: 'Sanborn Fire Maps Archive' },
    url: `${SITE_URL}/guides/how-to-read-sanborn-maps`,
    mainEntityOfPage: `${SITE_URL}/guides/how-to-read-sanborn-maps`,
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
              <Link href="/guides/how-to-read-sanborn-maps">Guides</Link>
            </div>
            <h1 className="guide-title">How to Read a Sanborn Fire Insurance Map</h1>
            <p className="guide-subtitle">
              A practical guide to understanding the symbols, colors, and abbreviations used in Sanborn maps.
            </p>
          </div>

          <div className="guide-body">
            <p className="guide-lede">
              Sanborn maps pack an enormous amount of information into every sheet. Once you understand the
              system of colors, symbols, and abbreviations, you can read these maps like a book — learning
              not just where buildings stood, but what they were made of, how they were used, and how
              vulnerable they were to fire.
            </p>

            <h2>Color Coding: Construction Materials</h2>
            <p>
              The most immediately recognizable feature of Sanborn maps is their color coding system. Each
              color represents a different building material:
            </p>
            <div className="guide-color-key">
              <div className="guide-color-item">
                <span className="guide-color-swatch" style={{ background: '#e8a0a0' }}></span>
                <div>
                  <strong>Pink / Red</strong>
                  <span>Brick construction</span>
                </div>
              </div>
              <div className="guide-color-item">
                <span className="guide-color-swatch" style={{ background: '#f0d080' }}></span>
                <div>
                  <strong>Yellow</strong>
                  <span>Wood frame construction</span>
                </div>
              </div>
              <div className="guide-color-item">
                <span className="guide-color-swatch" style={{ background: '#a0b8d8' }}></span>
                <div>
                  <strong>Blue</strong>
                  <span>Stone construction</span>
                </div>
              </div>
              <div className="guide-color-item">
                <span className="guide-color-swatch" style={{ background: '#90c890' }}></span>
                <div>
                  <strong>Green</strong>
                  <span>Iron or steel frame construction</span>
                </div>
              </div>
              <div className="guide-color-item">
                <span className="guide-color-swatch" style={{ background: '#c8a888' }}></span>
                <div>
                  <strong>Brown / Olive</strong>
                  <span>Adobe construction</span>
                </div>
              </div>
            </div>
            <p>
              Understanding these colors was critical for insurance underwriters. A row of yellow (wood frame)
              buildings crowded together represented a much higher fire risk than spaced-out pink (brick)
              structures with fire walls between them.
            </p>

            <h2>Building Information</h2>
            <p>
              Within each building footprint, Sanborn maps include remarkably specific notations:
            </p>
            <ul>
              <li>
                <strong>Number of stories</strong> — Indicated by a numeral inside the building outline
                (e.g., &ldquo;2&rdquo; for a two-story building)
              </li>
              <li>
                <strong>Basement</strong> — Marked with a &ldquo;B&rdquo; or &ldquo;Bsm't&rdquo; if the
                building had a basement level
              </li>
              <li>
                <strong>Building use</strong> — Written inside the footprint: &ldquo;D.&rdquo; (dwelling),
                &ldquo;S.&rdquo; (store), &ldquo;Off.&rdquo; (office), or specific uses like
                &ldquo;Planing Mill,&rdquo; &ldquo;Livery,&rdquo; or &ldquo;Opera House&rdquo;
              </li>
              <li>
                <strong>Addresses</strong> — Street numbers are typically shown along the building frontage
              </li>
              <li>
                <strong>Fire walls</strong> — Heavy dark lines between buildings indicate fire-resistant
                party walls
              </li>
              <li>
                <strong>Window and door openings</strong> — Small marks along walls indicate window placements,
                important for assessing fire exposure from neighboring buildings
              </li>
            </ul>

            <h2>Common Abbreviations</h2>
            <p>
              Sanborn maps use a consistent set of abbreviations to convey information efficiently:
            </p>
            <div className="guide-abbrev-table">
              <div className="guide-abbrev-row guide-abbrev-header">
                <span>Abbreviation</span>
                <span>Meaning</span>
              </div>
              <div className="guide-abbrev-row"><span>D.</span><span>Dwelling</span></div>
              <div className="guide-abbrev-row"><span>S.</span><span>Store</span></div>
              <div className="guide-abbrev-row"><span>Off.</span><span>Office</span></div>
              <div className="guide-abbrev-row"><span>F.</span><span>Flat (apartment)</span></div>
              <div className="guide-abbrev-row"><span>Ho.</span><span>Hotel</span></div>
              <div className="guide-abbrev-row"><span>Sal.</span><span>Saloon</span></div>
              <div className="guide-abbrev-row"><span>W.Ho.</span><span>Warehouse</span></div>
              <div className="guide-abbrev-row"><span>Fdy.</span><span>Foundry</span></div>
              <div className="guide-abbrev-row"><span>Mch. Shp.</span><span>Machine Shop</span></div>
              <div className="guide-abbrev-row"><span>P.O.</span><span>Post Office</span></div>
              <div className="guide-abbrev-row"><span>Bk.</span><span>Bank</span></div>
              <div className="guide-abbrev-row"><span>Chh.</span><span>Church</span></div>
              <div className="guide-abbrev-row"><span>Sch.</span><span>School</span></div>
              <div className="guide-abbrev-row"><span>Iron Cl&apos;d</span><span>Iron Clad (wood frame with metal sheathing)</span></div>
              <div className="guide-abbrev-row"><span>Comp. Rf.</span><span>Composition Roof</span></div>
              <div className="guide-abbrev-row"><span>Shgl. Rf.</span><span>Shingle Roof</span></div>
              <div className="guide-abbrev-row"><span>Tin Rf.</span><span>Tin Roof</span></div>
              <div className="guide-abbrev-row"><span>Vac.</span><span>Vacant</span></div>
              <div className="guide-abbrev-row"><span>Auto. Gar.</span><span>Automobile Garage</span></div>
            </div>

            <h2>Street and Infrastructure Details</h2>
            <p>
              Beyond buildings, Sanborn maps document the urban infrastructure in detail:
            </p>
            <ul>
              <li>
                <strong>Street widths</strong> — The width of each street is noted in feet, helping
                assess whether fire equipment could navigate the area
              </li>
              <li>
                <strong>Water mains</strong> — The location and diameter of water mains are shown,
                indicating available water pressure for firefighting
              </li>
              <li>
                <strong>Fire hydrants</strong> — Marked with circles or specific symbols along streets
              </li>
              <li>
                <strong>Railroad tracks</strong> — Rail lines and spurs are carefully mapped, along
                with associated facilities
              </li>
              <li>
                <strong>Lot lines</strong> — Property boundaries are indicated with dashed lines
              </li>
            </ul>

            <h2>The Title Pages</h2>
            <p>
              While the interior sheets contain the detailed maps themselves, the title pages serve as
              the cover and index for each volume. These pages typically include:
            </p>
            <ul>
              <li>The city name in elaborate hand-lettered typography</li>
              <li>The county and state</li>
              <li>The date of the survey</li>
              <li>A small overview map showing how the detailed sheets fit together</li>
              <li>Population figures</li>
              <li>Information about the city&apos;s fire department, water supply, and other fire protection measures</li>
            </ul>
            <p>
              It is these title pages — with their extraordinary Victorian-era typography and design —
              that form the core of <Link href="/#explore">our digital archive</Link>. Each one is a
              unique work of graphic design that captures a city&apos;s identity at a specific moment in time.
            </p>

            <h2>Tips for Researchers</h2>
            <p>
              If you&apos;re using Sanborn maps for research, keep these practical tips in mind:
            </p>
            <ul>
              <li>
                <strong>Check the date carefully.</strong> Maps were revised and updated over time.
                Pasted-on corrections may cover original information, and different sheets in the
                same volume may represent different survey dates.
              </li>
              <li>
                <strong>Compare across years.</strong> Sanborn mapped most cities multiple times.
                Comparing editions reveals how neighborhoods changed — buildings demolished, new
                construction, shifts in use from residential to commercial.
              </li>
              <li>
                <strong>Look at the key.</strong> While the color system remained largely consistent,
                Sanborn occasionally modified conventions. The legend on each volume clarifies the
                specific symbols used.
              </li>
              <li>
                <strong>Consider what&apos;s not shown.</strong> Sanborn maps focused on fire risk.
                They generally omit parks, vacant land, and areas outside the developed core of a city.
              </li>
            </ul>

            <div className="guide-cta">
              <h3>Explore the Archive</h3>
              <p>
                See these maps for yourself. Browse over 3,500 Sanborn map title pages from across the United States.
              </p>
              <div className="guide-cta-links">
                <Link href="/maps" className="guide-cta-btn">Browse by State</Link>
                <Link href="/#explore" className="guide-cta-btn guide-cta-btn-secondary">Search the Collection</Link>
              </div>
            </div>

            <div className="guide-related">
              <h3>Related Guides</h3>
              <ul>
                <li><Link href="/guides/what-are-sanborn-maps">What Are Sanborn Fire Insurance Maps?</Link></li>
                <li><Link href="/guides/sanborn-maps-environmental-site-assessments">Sanborn Maps for Environmental Site Assessments</Link></li>
                <li><Link href="/guides/sanborn-maps-genealogy-local-history">Using Sanborn Maps for Genealogy & Local History</Link></li>
              </ul>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
