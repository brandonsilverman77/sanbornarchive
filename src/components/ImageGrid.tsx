'use client';

import { useState } from 'react';
import ImageCard from './ImageCard';
import { maps } from '@/data/maps';

export default function ImageGrid() {
  const [filter, setFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const states = [...new Set(maps.map(m => m.state))].sort();

  const filteredMaps = maps.filter(map => {
    const matchesType = filter === 'all' || map.type === filter;
    const matchesState = stateFilter === 'all' || map.state === stateFilter;
    const matchesSearch = searchQuery === '' ||
      map.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      map.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesState && matchesSearch;
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
          {['all', 'cover', 'title'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                padding: '0.5rem 1rem',
                background: filter === type ? '#2c2416' : 'transparent',
                border: '1px solid #d4cbb8',
                borderColor: filter === type ? '#2c2416' : '#d4cbb8',
                fontFamily: 'Source Serif 4, Georgia, serif',
                fontSize: '0.875rem',
                color: filter === type ? '#f5f1e8' : '#4a3f2f',
                cursor: 'pointer'
              }}
            >
              {type === 'all' ? 'All' : type === 'cover' ? 'Cover Pages' : 'Title Pages'}
            </button>
          ))}

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
            placeholder="Search cities..."
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
        {filteredMaps.map((map) => (
          <ImageCard key={map.id} map={map} />
        ))}
      </div>
    </section>
  );
}
