'use client';

import Image from 'next/image';
import { MapImage } from '@/lib/types';

interface ImageCardProps {
  map: MapImage;
  onClick: () => void;
}

export default function ImageCard({ map, onClick }: ImageCardProps) {
  return (
    <div
      className="relative cursor-pointer transition-transform duration-300 hover:-translate-y-2 group"
      onClick={onClick}
    >
      <div className="bg-white p-2 md:p-3 shadow-[0_2px_4px_rgba(44,36,22,0.04),0_8px_16px_rgba(44,36,22,0.06)] transition-shadow duration-300 group-hover:shadow-[0_4px_8px_rgba(44,36,22,0.06),0_16px_32px_rgba(44,36,22,0.1)]">
        <div className="relative aspect-[5/6] overflow-hidden">
          <Image
            src={map.thumbnail}
            alt={`${map.city}, ${map.state}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-[var(--color-ink)]/85 flex flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="px-4 md:px-5 py-2 md:py-2.5 bg-[var(--color-cream)] text-[var(--color-ink)] font-body text-xs md:text-sm hover:bg-white transition-colors">
              View Details
            </button>
            <button className="px-4 md:px-5 py-2 md:py-2.5 border border-[var(--color-cream)] text-[var(--color-cream)] font-body text-xs md:text-sm hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)] transition-colors">
              Get a Print
            </button>
          </div>
        </div>
        
        <div className="pt-2 md:pt-3 px-1">
          <h3 className="font-display text-sm md:text-base font-medium text-[var(--color-ink)] mb-0.5">
            {map.city}
          </h3>
          <p className="text-xs md:text-sm text-[var(--color-ink-faded)]">
            {map.state} · {map.year}
          </p>
        </div>
      </div>
    </div>
  );
}
