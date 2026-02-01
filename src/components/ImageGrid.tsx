'use client';

import { useState, useMemo } from 'react';
import ImageCard from './ImageCard';
import { maps } from '@/data/maps';

type SortOption = 'a-z' | 'z-a' | 'oldest';

export default function ImageGrid() {
  const [stateFilter, setStateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('a-z');

  const states = [...new Set(maps.map(m => m.state))].sort();

  const filteredAndSortedMaps = useMemo(() => {
    const filtered = maps.filter(map => {
      const matchesState = stateFilter === 'all' || map.state === stateFilter;
      const query = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' ||
        map.city.toLowerCase().includes(query) ||
        map.state.toLowerCase().includes(query);
      const matchesFavorites = !showFavoritesOnly || map.favorite === true;
      return matchesState && matchesSearch && matchesFavorites;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'a-z') {
        return a.city.localeCompare(b.city);
      } else if (sortBy === 'z-a') {
        return b.city.localeCompare(a.city);
      } else {
        return a.year - b.year;
      }
    });
  }, [stateFilter, searchQuery, showFavoritesOnly, sortBy]);

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

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
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
            <option value="a-z">A → Z</option>
            <option value="z-a">Z → A</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <p style={{ color: '#6b5d4a', fontSize: '0.875rem', marginTop: '1rem', textAlign: 'center' }}>
          Showing {filteredAndSortedMaps.length} of {maps.length} maps
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {filteredAndSortedMaps.map((map, index) => (
          <ImageCard key={`${map.id}-${index}`} map={map} />
        ))}
      </div>
    </section>
  );
}
