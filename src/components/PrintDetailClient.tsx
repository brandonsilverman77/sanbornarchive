'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapImage } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import {
  getPrintSizes,
  getVariantId,
  type PrintSizeId,
} from '@/lib/shopify-products';

interface PrintDetailClientProps {
  map: MapImage;
}

export default function PrintDetailClient({ map }: PrintDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<PrintSizeId>('medium');
  const { addToCart, openCart, isLoading } = useCart();

  const printSizes = getPrintSizes(map.aspectRatio);
  const currentSize = printSizes.find((s) => s.id === selectedSize)!;

  const handleAddToCart = async () => {
    const variantId = getVariantId(map.id, selectedSize);
    if (!variantId) return;
    await addToCart(variantId);
    openCart();
  };

  return (
    <main className="print-page">
      <nav className="print-page-nav">
        <Link href={`/map/${map.id}`} className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Map
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
            <p className="print-page-label">Framed Archival Print</p>
            <h1 className="print-page-title">{map.city}, {map.state}</h1>
            <p className="print-page-year">Sanborn Fire Insurance Map, {map.year}</p>
          </header>

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
        </div>
      </div>
    </main>
  );
}
