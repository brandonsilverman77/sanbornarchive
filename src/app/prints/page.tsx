import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { maps } from '@/data/maps';
import { isPrintEnabled, PRINT_SIZE_TIERS } from '@/lib/shopify-products';
import PrintsGallery from '@/components/PrintsGallery';

export const metadata: Metadata = {
  title: 'Archival Prints',
  description:
    'Museum-quality framed prints of historic Sanborn Fire Insurance Maps. Custom framed with archival materials by SimplyFramed.',
};

export default function PrintsPage() {
  const printableMaps = maps
    .filter((m) => isPrintEnabled(m.id))
    .sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city) || a.year - b.year);

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

        <PrintsGallery maps={printableMaps} startingPrice={startingPrice} />
      </main>
      <Footer />
    </>
  );
}
