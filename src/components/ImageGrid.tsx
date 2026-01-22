'use client';

import { useState, useMemo } from 'react';
import ImageCard from './ImageCard';
import MapModal from './MapModal';
import { MapImage } from '@/lib/types';
import { maps, states } from '@/data/maps';

type FilterType = 'all' | 'cover' | 'title';

export default function ImageGrid() {
  const [selectedMap, setSelectedMap] = useState<MapImage | null>(null);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterState, setFilterState] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredMaps = useMemo(() => {
    return maps.filter((map) => {
      // Type filter
      if (filterType !== 'all' && map.type !== filterType) return false;
      
      // State filter
      if (filterState && map.state !== filterState) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          map.city.toLowerCase().includes(query) ||
          map.state.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  }, [filterType, filterState, searchQuery]);

  const visibleMaps = filteredMaps.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMaps.length;

  return (
    <section id="explore" className="px-6 md:px-16 py-16 md:py-24 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-medium mb-3 md:mb-4 text-[var(--color-ink)]">
          Explore the Collection
        </h2>
        <p className="text-base md:text-lg text-[var(--color-ink-faded)] max-w-[500px] mx-auto">
          Browse by city, state, or year. Every image is freely available for personal use.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 md:px-6 py-2 md:py-2.5 font-body text-xs md:text-sm border transition-all duration-200 ${
            filterType === 'all'
              ? 'bg-[var(--color-ink)] text-[var(--color-cream)] border-[var(--color-ink)]'
              : 'bg-transparent text-[var(--color-ink-light)] border-[var(--color-parchment)] hover:border-[var(--color-ink)]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterType('cover')}
          className={`px-4 md:px-6 py-2 md:py-2.5 font-body text-xs md:text-sm border transition-all duration-200 ${
            filterType === 'cover'
              ? 'bg-[var(--color-ink)] text-[var(--color-cream)] border-[var(--color-ink)]'
              : 'bg-transparent text-[var(--color-ink-light)] border-[var(--color-parchment)] hover:border-[var(--color-ink)]'
          }`}
        >
          Cover Pages
        </button>
        <button
          onClick={() => setFilterType('title')}
          className={`px-4 md:px-6 py-2 md:py-2.5 font-body text-xs md:text-sm border transition-all duration-200 ${
            filterType === 'title'
              ? 'bg-[var(--color-ink)] text-[var(--color-cream)] border-[var(--color-ink)]'
              : 'bg-transparent text-[var(--color-ink-light)] border-[var(--color-parchment)] hover:border-[var(--color-ink)]'
          }`}
        >
          Title Pages
        </button>
        
        <select
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
          className="px-4 md:px-6 py-2 md:py-2.5 font-body text-xs md:text-sm border border-[var(--color-parchment)] bg-white text-[var(--color-ink-light)] appearance-none cursor-pointer hover:border-[var(--color-ink)] transition-colors pr-10 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b5d4a%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_0.75rem_center]"
        >
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search cities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 md:px-6 py-2 md:py-2.5 font-body text-xs md:text-sm border border-[var(--color-parchment)] bg-white text-[var(--color-ink)] w-48 md:w-64 focus:outline-none focus:border-[var(--color-ink-light)] transition-colors placeholder:text-[var(--color-ink-faded)]"
        />
      </div>

      {/* Results count */}
      <p className="text-center text-sm text-[var(--color-ink-faded)] mb-8">
        Showing {visibleMaps.length} of {filteredMaps.length} maps
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {visibleMaps.map((map) => (
          <ImageCard
            key={map.id}
            map={map}
            onClick={() => setSelectedMap(map)}
          />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-12 md:mt-16">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="px-8 md:px-12 py-3 md:py-4 bg-transparent border border-[var(--color-ink)] font-body text-sm md:text-base text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-all duration-300"
          >
            Load More Maps
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedMap && (
        <MapModal
          map={selectedMap}
          onClose={() => setSelectedMap(null)}
        />
      )}
    </section>
  );
}
