import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { maps } from '@/data/maps';
import { SITE_URL } from '@/lib/constants';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Using Sanborn Maps for Genealogy & Local History Research',
  description:
    'How to use Sanborn Fire Insurance Maps for genealogy, family history, and local history research. Find ancestral homes, trace neighborhood changes, and add physical context to your family story.',
  openGraph: {
    title: 'Using Sanborn Maps for Genealogy & Local History',
    description:
      'Find ancestral homes, trace neighborhood changes, and add physical context to your family story with Sanborn maps.',
    type: 'article',
    url: `${SITE_URL}/guides/sanborn-maps-genealogy-local-history`,
  },
  alternates: {
    canonical: `${SITE_URL}/guides/sanborn-maps-genealogy-local-history`,
  },
};

export default function GenealogyLocalHistoryPage() {
  const exampleMaps = maps
    .filter((m) => m.favorite && ['New York', 'Massachusetts', 'Pennsylvania', 'Ohio', 'Illinois'].includes(m.state))
    .slice(0, 3);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Sanborn Maps for Genealogy', item: `${SITE_URL}/guides/sanborn-maps-genealogy-local-history` },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Using Sanborn Maps for Genealogy & Local History Research',
    description: 'A guide to using Sanborn Fire Insurance Maps for family history and local history research.',
    author: { '@type': 'Person', name: 'Brandon Silverman' },
    publisher: { '@type': 'Organization', name: 'Sanborn Fire Maps Archive' },
    url: `${SITE_URL}/guides/sanborn-maps-genealogy-local-history`,
    mainEntityOfPage: `${SITE_URL}/guides/sanborn-maps-genealogy-local-history`,
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
              <Link href="/guides/sanborn-maps-genealogy-local-history">Guides</Link>
            </div>
            <h1 className="guide-title">Using Sanborn Maps for Genealogy & Local History</h1>
            <p className="guide-subtitle">
              How to use historic fire insurance maps to find ancestral homes, understand old neighborhoods, and bring family stories to life.
            </p>
          </div>

          <div className="guide-body">
            <p className="guide-lede">
              If you&apos;ve ever looked at a family photograph from the early 1900s and wondered what the
              neighborhood around it looked like — what businesses were on the corner, whether the house next
              door was made of wood or brick, how wide the street was — Sanborn maps can answer those questions
              with remarkable precision. These maps are one of the most underused resources in genealogy, offering
              a level of physical detail that census records, city directories, and photographs simply cannot match.
            </p>

            <h2>What Sanborn Maps Reveal for Family Historians</h2>
            <p>
              For genealogists, Sanborn maps provide something uniquely valuable: a ground-level view of the
              physical world your ancestors inhabited. With a street address from a census record or city
              directory, you can locate the exact building on a Sanborn map and learn:
            </p>
            <ul>
              <li>
                <strong>The building itself</strong> — Was it a single-family home or a multi-unit flat? How many
                stories tall? Was it made of wood frame or brick? Did it have a basement?
              </li>
              <li>
                <strong>The neighborhood</strong> — What surrounded your ancestor&apos;s home? Were there factories
                nearby? A church on the corner? A saloon down the block? A school within walking distance?
              </li>
              <li>
                <strong>The workplace</strong> — If your ancestor worked in a factory, mill, or shop, Sanborn maps
                often show the exact building, including details about what was manufactured there and how the
                building was constructed.
              </li>
              <li>
                <strong>Changes over time</strong> — By comparing Sanborn maps from different decades, you can see
                how a neighborhood evolved during the years your family lived there — new construction, demolitions,
                changes in building use, and the arrival of infrastructure like water mains.
              </li>
            </ul>

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

            <h2>A Step-by-Step Research Process</h2>
            <p>
              Here&apos;s how to use Sanborn maps effectively in your genealogy research:
            </p>

            <h3>Step 1: Establish an Address</h3>
            <p>
              Before you can use a Sanborn map, you need a specific street address for your ancestor. Good
              sources for historical addresses include:
            </p>
            <ul>
              <li><strong>U.S. Census records</strong> (1880 and later often include street addresses in urban areas)</li>
              <li><strong>City directories</strong> (annual publications listing residents and businesses by address)</li>
              <li><strong>Vital records</strong> (birth, marriage, and death certificates sometimes include addresses)</li>
              <li><strong>Naturalization records</strong> (often include a home address)</li>
              <li><strong>Draft registration cards</strong> (WWI and WWII cards include home and work addresses)</li>
            </ul>

            <h3>Step 2: Find the Right Sanborn Map</h3>
            <p>
              Once you have an address, look for a Sanborn map of that city from approximately the same time period.
              Remember that Sanborn mapped most cities multiple times, so try to find the edition closest to the
              date you&apos;re researching. Key resources for finding maps include:
            </p>
            <ul>
              <li><strong>Library of Congress</strong> — The largest collection, with many maps digitized and freely accessible online</li>
              <li><strong>ProQuest Digital Sanborn Maps</strong> — Available through many public and university libraries</li>
              <li><strong>State and local libraries</strong> — Many hold Sanborn maps for their region</li>
              <li><strong>FamilySearch</strong> — The LDS Church&apos;s genealogy platform includes some digitized Sanborn maps</li>
            </ul>

            <h3>Step 3: Navigate to Your Address</h3>
            <p>
              Sanborn maps cover cities in sections, with each sheet showing a few blocks. Use the title page&apos;s
              index map to identify which sheet number covers your ancestor&apos;s street. Then find the specific
              address on that sheet. Street numbers are typically printed along building frontages.
            </p>

            <h3>Step 4: Read the Map</h3>
            <p>
              Once you&apos;ve found the building, use the{' '}
              <Link href="/guides/how-to-read-sanborn-maps">color codes, symbols, and abbreviations</Link> to
              learn everything the map reveals about it. Note the construction material, number of stories,
              building use, and any special features.
            </p>

            <h3>Step 5: Expand Your View</h3>
            <p>
              Don&apos;t stop at the building itself. Look at the surrounding blocks. What was the character of the
              neighborhood? Was it primarily residential or mixed-use? Were there industrial facilities nearby?
              What churches, schools, or public buildings were within walking distance?
            </p>

            <h2>Pairing Sanborn Maps with Other Records</h2>
            <p>
              Sanborn maps become even more powerful when combined with other genealogical sources:
            </p>
            <ul>
              <li>
                <strong>Census records + Sanborn maps</strong> — The census tells you who lived at an address;
                the Sanborn map shows you what the building and neighborhood looked like.
              </li>
              <li>
                <strong>City directories + Sanborn maps</strong> — Directories reveal which businesses operated
                at a location; Sanborn maps show the physical building and what surrounded it.
              </li>
              <li>
                <strong>Newspaper archives + Sanborn maps</strong> — If you find a news article about a fire,
                accident, or event at a specific address, the Sanborn map lets you visualize the scene.
              </li>
              <li>
                <strong>Historic photographs + Sanborn maps</strong> — Photos show what buildings looked like
                from the outside; Sanborn maps reveal their construction, layout, and surroundings from above.
              </li>
            </ul>

            <h2>Common Discoveries</h2>
            <p>
              Genealogists using Sanborn maps frequently uncover surprising details about their ancestors&apos; lives:
            </p>
            <ul>
              <li>
                A family listed as living at a &ldquo;dwelling&rdquo; in the census might turn out to have
                lived above a store their family operated
              </li>
              <li>
                An ancestor who worked in a &ldquo;factory&rdquo; might be located in a specific planing mill,
                ironworks, or textile operation
              </li>
              <li>
                A neighborhood described in family lore as &ldquo;nice&rdquo; or &ldquo;rough&rdquo; can be
                verified by the types of buildings and businesses that surrounded the family home
              </li>
              <li>
                Buildings that still stand today can be confirmed on Sanborn maps, connecting present-day
                structures to family history
              </li>
            </ul>

            <h2>The Title Pages as Historical Context</h2>
            <p>
              While the detailed interior sheets are most useful for address-level research, the title pages in
              our archive offer valuable context for genealogists. Each title page typically includes population
              figures, information about the city&apos;s water supply and fire department, and a small overview map
              showing the extent of the surveyed area. These details help paint a picture of the city your
              ancestors knew.
            </p>

            <div className="guide-cta">
              <h3>Find Your Ancestor&apos;s City</h3>
              <p>
                Browse our archive to see if we have title pages from the cities where your ancestors lived.
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
                <li><Link href="/guides/sanborn-maps-environmental-site-assessments">Sanborn Maps for Environmental Site Assessments</Link></li>
              </ul>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
