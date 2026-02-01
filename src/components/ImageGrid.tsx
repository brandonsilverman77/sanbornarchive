'use client';

import { useState } from 'react';
import ImageCard from './ImageCard';
import { maps } from '@/data/maps';

export default function ImageGrid() {
  const [stateFilter, setStateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const states = [...new Set(maps.map(m => m.state))].sort();

  const filteredMaps = maps.filter(map => {
    const matchesState = stateFilter === 'all' || map.state === stateFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      map.city.toLowerCase().includes(query) ||
      map.state.toLowerCase().includes(query);
    const matchesFavorites = !showFavoritesOnly || map.favorite === true;
    return matchesState && matchesSearch && matchesFavorites;
  });

  return (
    <section
      id="explore"
      style={{
        padding: '3rem 4rem',
        background: '#e8e2d5'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto 3rem' }}>
        <h2 style={{
          fontFamily: 'Playfair Display, Georgia, serif',
          fontSize: '2.5rem',
          fontWeight: 400,
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Explore the Collection
        </h2>
        <p style={{ color: '#4a3f2f', marginBottom: '1.5rem', textAlign: 'center' }}>
          Browse by city, state, or year. Every image is freely available for personal use.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            style={{
              padding: '0.5rem 1rem',
              background: showFavoritesOnly ? '#8b4513' : 'transparent',
              border: '1px solid #d4cbb8',
              borderColor: showFavoritesOnly ? '#8b4513' : '#d4cbb8',
              fontFamily: 'Source Serif 4, Georgia, serif',
              fontSize: '0.875rem',
              color: showFavoritesOnly ? '#f5f1e8' : '#4a3f2f',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <span style={{ fontSize: '1rem' }}>★</span> Favorites
          </button>

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: '1px solid #d4cbb8',
              fontFamily: 'Source Serif 4, Georgia, serif',
              fontSize: '0.875rem',
              color: '#4a3f2f',
              minWidth: '120px'
            }}
          >
            <option value="all">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search cities or states..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: '1px solid #d4cbb8',
              fontFamily: 'Source Serif 4, Georgia, serif',
              fontSize: '0.875rem',
              color: '#4a3f2f',
              minWidth: '200px'
            }}
          />
        </div>

        <p style={{ color: '#6b5d4a', fontSize: '0.875rem', marginTop: '1rem', textAlign: 'center' }}>
          Showing {filteredMaps.length} of {maps.length} maps
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {filteredMaps.map((map, index) => (
          <ImageCard key={`${map.id}-${index}`} map={map} />
        ))}
      </div>
    </section>
  );
}
