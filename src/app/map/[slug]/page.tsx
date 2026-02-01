'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { maps } from '@/data/maps';
import { use } from 'react';

const printSizes = [
  { id: 'small', description: '10⅛ × 12"', price: 139 },
  { id: 'medium', description: '15³⁄₁₆ × 18"', price: 299 },
  { id: 'large', description: '20⅜ × 24"', price: 465 },
];

const SHOPIFY_STORE_URL = 'https://sanborn-fire-maps.myshopify.com/products';

// Maps that have Shopify products set up
const PRINT_ENABLED_MAPS = [
  'san-francisco-california-1886',
  'atlanta-georgia-1886',
  'seattle-washington-1893',
  'new-orleans-louisiana-1885',
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function MapPage({ params }: PageProps) {
  const { slug } = use(params);
  const map = maps.find((m) => m.id === slug);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  if (!map) {
    notFound();
  }

  const isPrintEnabled = PRINT_ENABLED_MAPS.includes(map.id);
  const currentSize = printSizes.find((s) => s.id === selectedSize)!;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

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

          {isPrintEnabled && (
            <div className="print-section">
              <p className="print-label">Archival prints from ${printSizes[0].price}</p>
              <div className="print-sizes">
                {printSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`print-size ${selectedSize === size.id ? 'selected' : ''}`}
                  >
                    {size.description}
                  </button>
                ))}
              </div>
              <a
                href={`${SHOPIFY_STORE_URL}/${map.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="order-btn"
              >
                Order {currentSize.description} Print · ${currentSize.price}
              </a>
            </div>
          )}

          <footer className="map-detail-footer">
            <p>
              Sanborn fire insurance maps (1867–1970) are treasured for their intricate
              covers showcasing American cities at the turn of the century.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
