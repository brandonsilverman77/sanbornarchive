import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story behind the Sanborn Fire Maps Archive — a digital collection of over 3,500 Victorian-era fire insurance map title pages.',
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="about-page">
        <div className="about-header">
          <h1 className="about-title">About This Archive</h1>
        </div>

        <div className="about-content">
          <p>
            This project began over a decade ago when I stumbled upon a{' '}
            <a
              href="https://www.loc.gov/collections/sanborn-maps/"
              target="_blank"
              rel="noopener noreferrer"
            >
              small collection
            </a>{' '}
            of incredible typography from the Sanborn Fire Insurance Maps.
            I had never seen anything like them, and I became obsessed. I even used them as inspiration for my{' '}
            <a
              href="https://www.youtube.com/watch?v=jzxpFSbhTIY"
              target="_blank"
              rel="noopener noreferrer"
            >
              wedding invitations
            </a>.
          </p>

          <h2>The Sanborn Map Company</h2>

          <p>
            The Sanborn Map Company created detailed maps of over 12,000 American
            towns and cities between 1867 and 1970. Originally used by fire
            insurance companies to assess risk, these maps documented building
            materials, property boundaries, and street layouts with extraordinary
            precision. Today, they serve as an invaluable record of American urban
            history.
          </p>

          <p>
            But it&apos;s the title pages that stopped me in my tracks. Each one
            is a hand-lettered work of art — bold Victorian typography, ornate
            borders, and decorative flourishes that reflected the character of the
            city they represented. No two are alike. They were never meant to be
            art, but that&apos;s exactly what they are.
          </p>

          <h2>Building the Archive</h2>

          <p>
            This archive contains over 3,500 meticulously preserved title pages,
            spanning from 1867 to 1923. Every image has been sourced from the
            Library of Congress&apos;s digitized collection, carefully processed,
            and made freely available for personal use.
          </p>

          <p>
            The goal is simple: to make sure these extraordinary pieces of American
            design history don&apos;t stay buried in library archives. They deserve
            to be seen, shared, and appreciated.
          </p>

          <h2>Framed Prints</h2>

          <p>
            If you&apos;d like to hang one of these maps on your wall, we offer{' '}
            <Link href="/prints">museum-quality framed prints</Link> through our
            partnership with{' '}
            <a
              href="https://www.simplyframed.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Simply Framed
            </a>
            . Each print is produced on archival-quality cotton paper with
            fade-resistant inks, custom framed with sustainably sourced hardwood,
            acid-free matting, and UV-protective glazing. They&apos;re handmade in
            the USA and shipped ready to hang.
          </p>

          <div className="about-cta">
            <a
              href="https://kottke.org/24/12/the-arresting-typography-of-the-sanborn-fire-insurance-maps"
              target="_blank"
              rel="noopener noreferrer"
              className="about-story-link"
            >
              Read the full story on Kottke.org →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
