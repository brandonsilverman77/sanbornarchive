'use client';

import { useState } from 'react';
import ImageCard from './ImageCard';
import MapModal from './MapModal';
import { MapData } from '@/lib/types';
import { sampleMaps } from '@/data/maps';

export default function ImageGrid() {
  const [selectedMap, setSelectedMap] = useState<MapData | null>(null);
  const [filter, setFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const states = [...new Set(sampleMaps.map(m => m.state))].sort();

  const filteredMaps = sampleMaps.filter(map => {
    const matchesType = filter === 'all' || map.type === filter;
    const matchesState = stateFilter === 'all' || map.state === stateFilter;
    const matchesSearch = searchQuery === '' || 
      map.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      map.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesState && matchesSearch;
  });

  return (
    <section id="explore" className="grid-section">
      <div className="grid-header">
        <h2>Explore the Collection</h2>
        <p style={{ color: 'var(--color-ink-light)', marginBottom: '1.5rem' }}>
          Browse by city, state, or year. Every image is freely available for personal use.
        </p>
        
        <div className="grid-filters">
          {['all', 'cover', 'title'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`grid-filter ${filter === type ? 'active' : ''}`}
            >
              {type === 'all' ? 'All' : type === 'cover' ? 'Cover Pages' : 'Title Pages'}
            </button>
          ))}
          
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="grid-filter"
            style={{ minWidth: '120px' }}
          >
            <option value="all">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          
          <input
            type="text"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="grid-filter"
            style={{ minWidth: '200px' }}
          />
        </div>
        
        <p style={{ color: 'var(--color-ink-faded)', fontSize: '0.875rem', marginTop: '1rem' }}>
          Showing {filteredMaps.length} of {sampleMaps.length} maps
        </p>
      </div>

      <div className="image-grid">
        {filteredMaps.map((map) => (
          <ImageCard
            key={map.id}
            map={map}
            onClick={() => setSelectedMap(map)}
          />
        ))}
      </div>

      {selectedMap && (
        <MapModal
          map={selectedMap}
          onClose={() => setSelectedMap(null)}
        />
      )}
    </section>
  );
}
