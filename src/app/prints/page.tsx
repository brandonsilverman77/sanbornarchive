import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { maps } from '@/data/maps';
import { isPrintEnabled, PRINT_SIZE_TIERS } from '@/lib/shopify-products';

export const metadata: Metadata = {
  title: 'Archival Prints',
  description:
    'Museum-quality framed prints of historic Sanborn Fire Insurance Maps. Custom framed with archival materials by SimplyFramed.',
};

export default function PrintsPage() {
  const printableMaps = maps.filter((m) => isPrintEnabled(m.id));

  const startingPrice = PRINT_SIZE_TIERS[0].price;

  return (
    <>
      <Navigation />
      <main className="prints-page">
        <div className="prints-header">
          <p className="prints-label">Museum-Quality Reproductions</p>
          <h1 className="prints-title">Archival Prints</h1>
          <p className="prints-description">
            Each print is produced on archival-quality paper and custom framed
            with real wood moldings, acid-free matting, and UV-protective acrylic.
            Handmade in the USA by SimplyFramed.
          </p>
        </div>

        <div className="prints-grid">
          {printableMaps.map((map) => (
            <Link
              key={map.id}
              href={`/prints/${map.id}`}
              className="prints-card"
            >
              <div className="prints-card-image">
                <Image
                  src={map.medium}
                  alt={`${map.city}, ${map.state} - ${map.year} Sanborn Map`}
                  width={600}
                  height={720}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className="prints-card-info">
                <h2>{map.city}, {map.state}</h2>
                <p className="prints-card-year">{map.year}</p>
                <p className="prints-card-price">From ${startingPrice}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
