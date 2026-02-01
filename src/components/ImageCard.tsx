'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapImage } from '@/lib/types';

interface ImageCardProps {
  map: MapImage;
}

export default function ImageCard({ map }: ImageCardProps) {
  const [copied, setCopied] = useState(false);

  const copyId = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(map.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Link
      href={`/map/${map.id}`}
      style={{
        display: 'block',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{
        background: 'white',
        padding: '0.75rem',
        boxShadow: '0 2px 4px rgba(44,36,22,0.04), 0 8px 16px rgba(44,36,22,0.06)',
      }}>
        <div style={{
          position: 'relative',
          aspectRatio: '5/6',
          overflow: 'hidden',
        }}>
          <Image
            src={map.thumbnail}
            alt={`${map.city}, ${map.state}`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {map.favorite && (
            <div style={{
              position: 'absolute',
              top: '0.5rem',
              left: '0.5rem',
              background: '#8b4513',
              color: 'white',
              width: '1.5rem',
              height: '1.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
            }}>
              ★
            </div>
          )}
          <button
            onClick={copyId}
            style={{
              position: 'absolute',
              bottom: '0.5rem',
              right: '0.5rem',
              background: copied ? '#4a7c59' : 'rgba(44,36,22,0.8)',
              color: 'white',
              border: 'none',
              padding: '0.25rem 0.5rem',
              fontSize: '0.625rem',
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            {copied ? 'Copied!' : 'Copy ID'}
          </button>
        </div>

        <div style={{
          paddingTop: '0.75rem',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
          paddingBottom: '0.25rem',
        }}>
          <h3 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: '1rem',
            fontWeight: 500,
            color: '#2c2416',
            marginBottom: '0.25rem',
          }}>
            {map.city}
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b5d4a',
          }}>
            {map.state} · {map.year}
          </p>
        </div>
      </div>
    </Link>
  );
}
