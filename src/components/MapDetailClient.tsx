'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapImage } from '@/lib/types';
import { isPrintEnabled, getPrintSizes, getVariantId, type PrintSizeId } from '@/lib/shopify-products';
import { useCart } from '@/context/CartContext';

interface MapDetailClientProps {
  map: MapImage;
  relatedMaps?: MapImage[];
  stateSlug?: string;
}

export default function MapDetailClient({ map, relatedMaps = [], stateSlug }: MapDetailClientProps) {
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [selectedSize, setSelectedSize] = useState<PrintSizeId>('medium');
  const imageRef = useRef<HTMLDivElement>(null);
  const { addToCart, openCart, isLoading } = useCart();

  const printEnabled = isPrintEnabled(map.id);
  const printSizes = printEnabled ? getPrintSizes(map.aspectRatio) : [];
  const currentSize = printSizes.find((s) => s.id === selectedSize);

  const relatedSection = relatedMaps.length > 0 ? (
    <section className="related-maps">
      <div className="related-maps-header">
        <h2 className="related-maps-title">More Maps from {map.state}</h2>
        {stateSlug && (
          <Link href={`/maps/${stateSlug}`} className="related-maps-view-all">
            View all →
          </Link>
        )}
      </div>
      <div className="related-maps-grid">
        {relatedMaps.map((related) => (
          <Link key={related.id} href={`/map/${related.id}`} className="related-map-card">
            <div className="related-map-image">
              <Image
                src={related.thumbnail}
                alt={`Sanborn Fire Insurance Map: ${related.city}, ${related.state} (${related.year})`}
                width={300}
                height={360}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div className="related-map-info">
              <span className="related-map-city">{related.city}</span>
              <span className="related-map-year">{related.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  ) : null;

  const handleAddToCart = async () => {
    const variantId = getVariantId(map.id, selectedSize);
    if (!variantId) return;
    await addToCart(variantId);
    openCart();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  // Print-enabled maps use the print page layout with download button added
  if (printEnabled && currentSize) {
    return (
      <main className="print-page">
        <nav className="print-page-nav">
          <Link href="/#explore" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Collection
          </Link>
        </nav>

        <div className="print-page-content">
          {/* Left: Framed mockup */}
          <div className="print-page-image">
            <div className="print-mockup">
              <div className="print-mockup-frame">
                <div className="print-mockup-mat">
                  <Image
                    src={map.medium}
                    alt={`Framed print of ${map.city}, ${map.state} (${map.year})`}
                    width={800}
                    height={960}
                    priority
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            </div>
            <p className="print-mockup-note">
              Shown in Gallery Natural frame with single white mat
            </p>
          </div>

          {/* Right: Product details */}
          <div className="print-page-details">
            <header className="print-page-header">
              <h1 className="print-page-title">{map.city}, {map.state}</h1>
              <p className="print-page-year">Sanborn Fire Insurance Map, {map.year}</p>
            </header>

            {/* Download button */}
            <a
              href={map.full}
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn download-btn-secondary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download Free High-Res Image
            </a>
            <p className="download-details">
              {map.width.toLocaleString()} × {map.height.toLocaleString()} pixels · Free for personal use
            </p>

            {/* Print ordering section */}
            <div className="print-page-divider">
              <h2 className="print-page-order-title">Order a Museum-Quality Print</h2>
            </div>

            {/* What's included */}
            <div className="print-page-includes">
              <h2 className="print-page-section-label">What&apos;s included</h2>
              <ul className="print-includes-list">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <strong>Giclée print</strong>
                    <span>100% cotton, acid-free archival paper with fade-resistant inks</span>
                  </div>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <strong>Hardwood frame</strong>
                    <span>Gallery Natural finish, sustainably sourced</span>
                  </div>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <strong>Conservation mat</strong>
                    <span>Acid-free, single white mat</span>
                  </div>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <strong>UV-protective glazing</strong>
                    <span>Crystal-clear acrylic, blocks 99% of UV rays</span>
                  </div>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <strong>Ready to hang</strong>
                    <span>Includes mounting hardware and dust cover</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Size selector */}
            <div className="print-page-sizes">
              <h2 className="print-page-section-label">Select size</h2>
              <div className="print-size-cards">
                {printSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`print-size-card ${selectedSize === size.id ? 'selected' : ''}`}
                  >
                    <span className="print-size-name">{size.name}</span>
                    <span className="print-size-dimensions">{size.description}</span>
                    <span className="print-size-price">${size.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="print-page-cart-btn"
            >
              {isLoading ? 'Adding...' : `Add to Cart · $${currentSize.price}`}
            </button>

            {/* Partner info */}
            <div className="print-page-partner">
              <p>
                Each print is custom framed to order by{' '}
                <a href="https://www.simplyframed.com" target="_blank" rel="noopener noreferrer">
                  Simply Framed
                </a>
                , a premium framing studio trusted by museums and galleries nationwide.
              </p>
              <p className="print-page-shipping">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                Ships in 7–10 business days. Free shipping on orders over $200.
              </p>
            </div>

            {/* FAQ */}
            <div className="print-page-faq">
              <h3 className="print-page-faq-title">Frequently Asked Questions</h3>
              <details className="print-faq-item">
                <summary>What materials are used?</summary>
                <p>Prints are produced using giclée printing on 100% cotton, acid-free archival paper with fade-resistant inks. Frames are sustainably sourced Gallery Natural hardwood with acid-free conservation matting and crystal-clear, UV-protective acrylic glazing.</p>
              </details>
              <details className="print-faq-item">
                <summary>How long does shipping take?</summary>
                <p>Each print is custom framed to order and ships in 7–10 business days. Shipping is free on orders over $200.</p>
              </details>
              <details className="print-faq-item">
                <summary>What sizes are available?</summary>
                <p>Prints are available in three sizes: Small (12&quot; longest edge, $139), Medium (18&quot; longest edge, $299), and Large (24&quot; longest edge, $465). All sizes include the frame, mat, glazing, and mounting hardware.</p>
              </details>
              <details className="print-faq-item">
                <summary>What is your return policy?</summary>
                <p>We accept returns within 30 days of delivery for damaged or defective items. Since each print is custom framed to order, we cannot accept returns for change of mind. Please contact us if your order arrives damaged.</p>
              </details>
              <details className="print-faq-item">
                <summary>Who frames the prints?</summary>
                <p>All prints are custom framed by <a href="https://www.simplyframed.com" target="_blank" rel="noopener noreferrer">Simply Framed</a>, a premium framing studio trusted by museums and galleries nationwide. Each frame is handmade in the USA.</p>
              </details>
            </div>
          </div>
        </div>
        {relatedSection}
      </main>
    );
  }

  // Non-print maps use the original zoom layout
  return (
    <div className="map-detail-page">
      <nav className="map-detail-nav">
        <Link href="/#explore" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Collection
        </Link>
      </nav>

      <main className="map-detail-content">
        <div className="map-detail-image-section">
          <div
            ref={imageRef}
            className={`map-detail-image-frame ${isZooming ? 'zooming' : ''}`}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={map.medium}
              alt={`${map.city}, ${map.state} - ${map.year} Sanborn Map`}
              width={1200}
              height={1440}
              priority
              style={{ width: '100%', height: 'auto', maxHeight: '85vh', objectFit: 'contain' }}
            />
            <div
              className="zoom-lens"
              style={{
                backgroundImage: `url(${map.full})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                left: `${zoomPosition.x}%`,
                top: `${zoomPosition.y}%`,
              }}
            />
            <div className="zoom-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Hover to zoom
            </div>
          </div>
        </div>

        <div className="map-detail-info">
          <header className="map-detail-header">
            <h1 className="map-detail-title">{map.city}</h1>
            <p className="map-detail-meta">{map.state}, {map.year}</p>
          </header>

          <a
            href={map.full}
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download High-Resolution Image
          </a>
          <p className="download-details">
            {map.width.toLocaleString()} × {map.height.toLocaleString()} pixels · Free for personal use
          </p>

          <footer className="map-detail-footer">
            <p>
              Sanborn fire insurance maps (1867–1970) are treasured for their intricate
              covers showcasing American cities at the turn of the century.
            </p>
          </footer>
        </div>
      </main>
      {relatedSection}
    </div>
  );
}
