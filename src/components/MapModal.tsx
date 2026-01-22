'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapImage } from '@/lib/types';
import { printOptions, frameOptions } from '@/data/maps';

interface MapModalProps {
  map: MapImage;
  onClose: () => void;
}

export default function MapModal({ map, onClose }: MapModalProps) {
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedFrame, setSelectedFrame] = useState('none');

  // Calculate price
  const sizeOption = printOptions.find((o) => o.id === selectedSize)!;
  const frameOption = frameOptions.find((o) => o.id === selectedFrame)!;
  const totalPrice = sizeOption.basePrice + frameOption.priceModifier;

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-[var(--color-ink)]/90 flex justify-center items-center z-[1000] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-[var(--color-cream)] flex items-center justify-center text-xl md:text-2xl text-[var(--color-ink)] hover:bg-white transition-colors"
        aria-label="Close modal"
      >
        ×
      </button>

      {/* Modal content */}
      <div className="bg-[var(--color-cream)] max-w-[1000px] w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2">
        {/* Image */}
        <div className="bg-white p-6 md:p-8 flex items-center justify-center">
          <Image
            src={map.medium}
            alt={`${map.city}, ${map.state}`}
            width={500}
            height={600}
            className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain"
          />
        </div>

        {/* Details & Print Options */}
        <div className="p-6 md:p-10 flex flex-col">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-[var(--color-ink)] mb-1">
            {map.city}
          </h2>
          <p className="text-[var(--color-ink-faded)] mb-6 pb-6 border-b border-[var(--color-parchment)]">
            {map.state} · {map.year} · {map.type === 'cover' ? 'Cover Page' : 'Title Page'}
          </p>

          {/* Size Options */}
          <h3 className="font-display text-xs md:text-sm font-semibold text-[var(--color-ink-faded)] uppercase tracking-widest mb-3 md:mb-4">
            Get a Print
          </h3>
          <div className="flex flex-col gap-2 mb-6">
            {printOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedSize(option.id)}
                className={`flex justify-between items-center p-3 md:p-4 border transition-all duration-200 ${
                  selectedSize === option.id
                    ? 'bg-[var(--color-ink)] text-[var(--color-cream)] border-[var(--color-ink)]'
                    : 'bg-white border-[var(--color-parchment)] hover:border-[var(--color-ink)]'
                }`}
              >
                <span className="font-medium text-sm md:text-base">
                  {option.label} — {option.description}
                </span>
                <span className={`text-sm md:text-base ${selectedSize === option.id ? 'opacity-80' : 'text-[var(--color-ink-faded)]'}`}>
                  ${option.basePrice}
                </span>
              </button>
            ))}
          </div>

          {/* Frame Options */}
          <h3 className="font-display text-xs md:text-sm font-semibold text-[var(--color-ink-faded)] uppercase tracking-widest mb-3 md:mb-4">
            Frame
          </h3>
          <div className="flex gap-2 md:gap-3 mb-8">
            {frameOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedFrame(option.id)}
                className={`flex-1 p-2 md:p-3 border text-center transition-all duration-200 ${
                  selectedFrame === option.id
                    ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-cream)]'
                    : 'border-[var(--color-parchment)] hover:border-[var(--color-ink)]'
                }`}
              >
                <div
                  className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 border border-current"
                  style={{
                    backgroundColor: option.id === 'none' ? 'transparent' : option.color,
                  }}
                />
                <span className="text-xs md:text-sm">{option.label}</span>
                {option.priceModifier > 0 && (
                  <span className={`block text-xs ${selectedFrame === option.id ? 'opacity-70' : 'text-[var(--color-ink-faded)]'}`}>
                    +${option.priceModifier}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Add to Cart */}
          <button className="mt-auto py-4 md:py-5 bg-[var(--color-accent)] text-white font-body text-base md:text-lg hover:bg-[var(--color-accent-light)] transition-colors">
            Add to Cart — ${totalPrice}
          </button>

          {/* Free Download */}
          <p className="text-center mt-4 md:mt-6 text-xs md:text-sm text-[var(--color-ink-faded)]">
            Or{' '}
            <a
              href={map.full}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-ink-light)] underline hover:text-[var(--color-accent)]"
            >
              download for free
            </a>{' '}
            for personal use
          </p>
        </div>
      </div>
    </div>
  );
}
