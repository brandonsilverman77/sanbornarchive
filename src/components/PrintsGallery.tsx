'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapImage } from '@/lib/types';

interface PrintsGalleryProps {
  maps: MapImage[];
  startingPrice: number;
}

export default function PrintsGallery({ maps, startingPrice }: PrintsGalleryProps) {
  const [selectedState, setSelectedState] = useState<string>('all');

  const states = useMemo(() => {
    const stateSet = new Set(maps.map((m) => m.state));
    return Array.from(stateSet).sort();
  }, [maps]);

  const filteredMaps = useMemo(() => {
    if (selectedState === 'all') return maps;
    return maps.filter((m) => m.state === selectedState);
  }, [maps, selectedState]);

  return (
    <>
      <div className="prints-filters">
        <div className="prints-filter-row">
          <label className="prints-filter-label" htmlFor="state-filter">
            Filter by state
          </label>
          <select
            id="state-filter"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="prints-filter-select"
          >
            <option value="all">All States ({maps.length})</option>
            {states.map((state) => {
              const count = maps.filter((m) => m.state === state).length;
              return (
                <option key={state} value={state}>
                  {state} ({count})
                </option>
              );
            })}
          </select>
        </div>
        <p className="prints-filter-count">
          {filteredMaps.length} {filteredMaps.length === 1 ? 'print' : 'prints'} available
        </p>
      </div>

      <div className="prints-grid">
        {filteredMaps.map((map) => (
          <Link
            key={map.id}
            href={`/map/${map.id}`}
            className="prints-card"
          >
            <div className="prints-card-image">
              <Image
                src={map.medium}
                alt={`Sanborn Fire Insurance Map: ${map.city}, ${map.state} (${map.year})`}
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
    </>
  );
}
