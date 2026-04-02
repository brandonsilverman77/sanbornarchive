import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/lib/constants';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Sanborn Maps for Environmental Site Assessments (Phase I ESA)',
  description:
    'How Sanborn Fire Insurance Maps are used in Phase I Environmental Site Assessments. Learn why environmental consultants rely on these historic maps to identify potential contamination from former land uses.',
  openGraph: {
    title: 'Sanborn Maps for Environmental Site Assessments',
    description:
      'Why environmental consultants rely on Sanborn maps to identify potential contamination from former land uses.',
    type: 'article',
    url: `${SITE_URL}/guides/sanborn-maps-environmental-site-assessments`,
  },
  alternates: {
    canonical: `${SITE_URL}/guides/sanborn-maps-environmental-site-assessments`,
  },
};

export default function EnvironmentalSiteAssessmentsPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Sanborn Maps for ESAs', item: `${SITE_URL}/guides/sanborn-maps-environmental-site-assessments` },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sanborn Maps for Environmental Site Assessments',
    description: 'How historic Sanborn Fire Insurance Maps are used in Phase I Environmental Site Assessments to identify potential contamination.',
    author: { '@type': 'Person', name: 'Brandon Silverman' },
    publisher: { '@type': 'Organization', name: 'Sanborn Fire Maps Archive' },
    url: `${SITE_URL}/guides/sanborn-maps-environmental-site-assessments`,
    mainEntityOfPage: `${SITE_URL}/guides/sanborn-maps-environmental-site-assessments`,
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
              <Link href="/guides/sanborn-maps-environmental-site-assessments">Guides</Link>
            </div>
            <h1 className="guide-title">Sanborn Maps for Environmental Site Assessments</h1>
            <p className="guide-subtitle">
              Why environmental consultants consider Sanborn maps an essential tool for identifying potential contamination.
            </p>
          </div>

          <div className="guide-body">
            <p className="guide-lede">
              When a property changes hands in the United States — especially for commercial or industrial use — a
              Phase I Environmental Site Assessment (ESA) is almost always required. One of the most important steps
              in this process is reviewing historical land use records, and Sanborn Fire Insurance Maps are among the
              most valuable sources available. Their building-by-building detail reveals exactly what activities
              occurred on a site decades before modern environmental regulations existed.
            </p>

            <h2>What Is a Phase I Environmental Site Assessment?</h2>
            <p>
              A Phase I ESA is a standardized investigation conducted according to ASTM Standard E1527 to evaluate
              the environmental condition of a property, typically before a real estate transaction. The goal is to
              identify &ldquo;recognized environmental conditions&rdquo; (RECs) — evidence or likelihood of
              contamination from hazardous substances or petroleum products.
            </p>
            <p>
              Phase I assessments do not involve physical testing of soil or groundwater. Instead, they rely on
              records review, site inspection, interviews, and historical research. It is in this historical
              research component that Sanborn maps play their most critical role.
            </p>

            <h2>Why Sanborn Maps Are Essential for ESAs</h2>
            <p>
              Sanborn maps are uniquely suited to environmental investigation because they document exactly the
              kind of information environmental consultants need:
            </p>
            <ul>
              <li>
                <strong>Building use and occupancy</strong> — Sanborn maps label every building with its specific
                use. A notation like &ldquo;Gas Wks.&rdquo; (gas works), &ldquo;Dye Wks.&rdquo; (dye works),
                or &ldquo;Chem. Lab.&rdquo; (chemical laboratory) immediately flags potential contamination sources
                that may have left behind hazardous materials in the soil.
              </li>
              <li>
                <strong>Underground storage tanks</strong> — Maps from the early 20th century sometimes indicate
                the presence and location of underground storage tanks (USTs), which are a leading source of soil
                and groundwater contamination from petroleum products.
              </li>
              <li>
                <strong>Industrial processes</strong> — Detailed notations reveal manufacturing activities like
                plating, tanning, printing, and chemical production — each associated with specific contaminants
                that may persist in soil long after the operations ceased.
              </li>
              <li>
                <strong>Multi-year coverage</strong> — Because Sanborn mapped cities repeatedly over decades,
                consultants can trace the complete history of land use at a specific address, revealing industrial
                uses that may have been followed by seemingly innocuous commercial or residential development.
              </li>
            </ul>

            <h2>Common Red Flags on Sanborn Maps</h2>
            <p>
              Environmental consultants are trained to look for specific land uses that indicate potential
              contamination. On Sanborn maps, these often appear as:
            </p>
            <ul>
              <li><strong>Dry cleaners</strong> — Often used perchloroethylene (PCE), a persistent groundwater contaminant</li>
              <li><strong>Gas stations and auto repair shops</strong> — Underground fuel storage tanks and waste oil disposal</li>
              <li><strong>Printing operations</strong> — Inks, solvents, and heavy metals</li>
              <li><strong>Manufactured gas plants</strong> — Coal tar and associated compounds</li>
              <li><strong>Metal plating and finishing</strong> — Heavy metals including chromium, cadmium, and nickel</li>
              <li><strong>Lumber yards and wood treatment facilities</strong> — Creosote, pentachlorophenol, arsenic</li>
              <li><strong>Tanneries</strong> — Chromium and other heavy metals</li>
              <li><strong>Photo processing labs</strong> — Silver and chemical solutions</li>
              <li><strong>Paint and varnish manufacturers</strong> — Solvents and heavy metals</li>
            </ul>

            <h2>How Consultants Use Sanborn Maps</h2>
            <p>
              A typical Phase I ESA involves reviewing Sanborn maps for the subject property and its
              surrounding area (usually within a defined radius) across all available years. The consultant
              looks for:
            </p>
            <ol>
              <li>
                <strong>Current property history</strong> — What has been on the subject site over time?
                Was it ever used for industrial or commercial purposes that might have left behind contamination?
              </li>
              <li>
                <strong>Adjacent property history</strong> — Were neighboring sites used for activities that
                could have caused contamination to migrate onto the subject property through soil or groundwater?
              </li>
              <li>
                <strong>Changes over time</strong> — Comparing maps from different years reveals when buildings
                were constructed, demolished, or changed in use — creating a timeline of potential environmental exposure.
              </li>
            </ol>

            <h2>Accessing Sanborn Maps for ESA Work</h2>
            <p>
              Environmental consultants typically access Sanborn maps through several sources:
            </p>
            <ul>
              <li>
                <strong>Environmental Data Resources (EDR)</strong> — A commercial provider that supplies
                historical Sanborn map reports as part of their ESA research packages
              </li>
              <li>
                <strong>Library of Congress</strong> — Holds the most complete collection of Sanborn maps,
                with many available through their digital collections
              </li>
              <li>
                <strong>State and university libraries</strong> — Many maintain collections of Sanborn maps
                for their state, sometimes with digital access
              </li>
              <li>
                <strong>ProQuest Digital Sanborn Maps</strong> — A subscription database offering digitized
                Sanborn maps, commonly available through academic libraries
              </li>
            </ul>
            <p>
              This archive focuses on the ornate title pages rather than the interior map sheets used in ESA work.
              However, the title pages provide valuable context — including city-wide overview maps, population data,
              and information about fire protection infrastructure — that can complement an environmental investigation.
            </p>

            <h2>Limitations to Keep in Mind</h2>
            <p>
              While Sanborn maps are invaluable, environmental professionals should be aware of their limitations:
            </p>
            <ul>
              <li>
                <strong>Not all areas were mapped</strong> — Sanborn focused on developed urban areas. Rural
                properties and areas outside city centers may not have been surveyed.
              </li>
              <li>
                <strong>Coverage gaps</strong> — Not every city was mapped in every decade. There may be
                significant gaps between survey dates for smaller cities.
              </li>
              <li>
                <strong>Post-1970 activity</strong> — Sanborn stopped producing maps around 1970. For
                environmental history after that date, consultants must rely on aerial photographs, city
                directories, and other sources.
              </li>
              <li>
                <strong>Map revisions</strong> — Some maps were updated by pasting corrections over original
                data, which means the original information may be hidden beneath later additions.
              </li>
            </ul>

            <div className="guide-cta">
              <h3>Explore the Archive</h3>
              <p>
                Browse over 3,500 Sanborn map title pages and discover the cities documented in this remarkable collection.
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
                <li><Link href="/guides/how-to-read-sanborn-maps">How to Read a Sanborn Fire Insurance Map</Link></li>
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
