'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { maps } from '@/data/maps';
import { use } from 'react';

const printSizes = [
  { id: 'small', label: 'Small', description: '11×14"', price: 89 },
  { id: 'medium', label: 'Medium', description: '18×24"', price: 149 },
  { id: 'large', label: 'Large', description: '24×36"', price: 199 },
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
              Hover to zoom
            </div>
          </div>
        </div>

        <div className="map-detail-info">
          <div className="map-detail-header">
            <h1 className="map-detail-title">{map.city}</h1>
            <p className="map-detail-meta">
              {map.state} · {map.year} · {map.type === 'cover' ? 'Cover Page' : 'Title Page'}
            </p>
          </div>

          <a
            href={map.full}
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn-primary"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            <span>
              <strong>Download Free</strong>
              <small>{map.width} × {map.height} px</small>
            </span>
          </a>

          <div className="print-section">
            <p className="print-section-label">Want a print?</p>
            <div className="print-options-row">
              {printSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`print-size-chip ${selectedSize === size.id ? 'selected' : ''}`}
                >
                  {size.description} · ${size.price}
                </button>
              ))}
            </div>
            <button className="order-print-btn-subtle">
              Order Print — ${currentSize.price}
            </button>
          </div>

          <div className="map-detail-about">
            <h3>About Sanborn Maps</h3>
            <p>
              Sanborn fire insurance maps were created between 1867 and 1970 to assess fire insurance
              liability in urbanized areas of the United States. These beautifully designed covers
              represent some of the finest examples of American commercial cartography.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
