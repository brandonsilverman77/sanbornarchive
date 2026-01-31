'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { maps } from '@/data/maps';
import { use } from 'react';

const printSizes = [
  { id: 'small', label: 'Small Print', description: '11×14"', price: 89 },
  { id: 'medium', label: 'Medium Print', description: '18×24"', price: 149 },
  { id: 'large', label: 'Large Print', description: '24×36"', price: 199 },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function MapPage({ params }: PageProps) {
  const { slug } = use(params);
  const map = maps.find((m) => m.id === slug);
  const [selectedSize, setSelectedSize] = useState('medium');

  if (!map) {
    notFound();
  }

  const currentSize = printSizes.find((s) => s.id === selectedSize)!;

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
          <div className="map-detail-image-frame">
            <Image
              src={map.medium}
              alt={`${map.city}, ${map.state} - ${map.year} Sanborn Map`}
              width={800}
              height={960}
              priority
              style={{ width: '100%', height: 'auto', maxHeight: '80vh', objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className="map-detail-info">
          <div className="map-detail-header">
            <h1 className="map-detail-title">{map.city}</h1>
            <p className="map-detail-meta">
              {map.state} · {map.year} · {map.type === 'cover' ? 'Cover Page' : 'Title Page'}
            </p>
          </div>

          <div className="map-detail-section">
            <h2 className="map-detail-section-title">Order a Museum-Quality Print</h2>
            <p className="map-detail-section-desc">
              Archival giclée prints on premium matte paper, shipped in protective packaging.
            </p>

            <div className="print-size-options">
              {printSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`print-size-option ${selectedSize === size.id ? 'selected' : ''}`}
                >
                  <div className="print-size-info">
                    <span className="print-size-label">{size.label}</span>
                    <span className="print-size-dimensions">{size.description}</span>
                  </div>
                  <span className="print-size-price">${size.price}</span>
                </button>
              ))}
            </div>

            <button className="order-print-btn">
              Order Print — ${currentSize.price}
            </button>
          </div>

          <div className="map-detail-divider" />

          <div className="map-detail-section">
            <h2 className="map-detail-section-title">Free High-Resolution Download</h2>
            <p className="map-detail-section-desc">
              Download the full-resolution image ({map.width} × {map.height} pixels) for personal use, research, or creative projects.
            </p>
            <a
              href={map.full}
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download High-Res Image
            </a>
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
