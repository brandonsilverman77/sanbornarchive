'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { maps } from '@/data/maps';

type Classification = 'cover' | 'title' | null;

// Shuffle array with a seed for consistency
function shuffleArray<T>(array: T[], seed: number = 42): T[] {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  let randomValue = seed;

  while (currentIndex !== 0) {
    // Simple seeded random
    randomValue = (randomValue * 9301 + 49297) % 233280;
    const randomIndex = Math.floor((randomValue / 233280) * currentIndex);
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
  }

  return shuffled;
}

export default function ClassifyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [classifications, setClassifications] = useState<Record<string, Classification>>({});
  const [filter, setFilter] = useState<'all' | 'unclassified' | 'cover' | 'title'>('all');
  const [isShuffled, setIsShuffled] = useState(true);

  // Shuffled maps for random sampling
  const shuffledMaps = useMemo(() => shuffleArray(maps), []);

  // Load saved classifications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mapClassifications');
    if (saved) {
      setClassifications(JSON.parse(saved));
    }
  }, []);

  // Save classifications to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(classifications).length > 0) {
      localStorage.setItem('mapClassifications', JSON.stringify(classifications));
    }
  }, [classifications]);

  // Filter maps based on current filter
  const filteredMaps = maps.filter(map => {
    if (filter === 'all') return true;
    if (filter === 'unclassified') return !classifications[map.id];
    return classifications[map.id] === filter;
  });

  const currentMap = filteredMaps[currentIndex];

  const classify = useCallback((type: Classification) => {
    if (!currentMap) return;
    setClassifications(prev => ({
      ...prev,
      [currentMap.id]: type
    }));
    // Auto-advance to next
    if (currentIndex < filteredMaps.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentMap, currentIndex, filteredMaps.length]);

  const goToNext = useCallback(() => {
    if (currentIndex < filteredMaps.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, filteredMaps.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'c' || e.key === 'C' || e.key === '1') {
        classify('cover');
      } else if (e.key === 't' || e.key === 'T' || e.key === '2') {
        classify('title');
      } else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') {
        goToPrev();
      } else if (e.key === 's' || e.key === 'S') {
        // Skip - mark as null and move on
        if (currentMap) {
          setClassifications(prev => {
            const newClassifications = { ...prev };
            delete newClassifications[currentMap.id];
            return newClassifications;
          });
          goToNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [classify, goToNext, goToPrev, currentMap]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const exportClassifications = () => {
    const dataStr = JSON.stringify(classifications, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'map-classifications.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: maps.length,
    classified: Object.keys(classifications).length,
    cover: Object.values(classifications).filter(c => c === 'cover').length,
    title: Object.values(classifications).filter(c => c === 'title').length,
  };

  if (!currentMap) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui' }}>
        <h1>All done with this filter!</h1>
        <p>Classified: {stats.classified} / {stats.total}</p>
        <p>Cover pages: {stats.cover} | Title pages: {stats.title}</p>
        <button onClick={() => setFilter('all')} style={{ padding: '1rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
          View All
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a1a',
      color: '#fff',
      fontFamily: 'system-ui'
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem 2rem',
        background: '#2a2a2a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Map Classifier</h1>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#aaa' }}>
            {stats.classified} / {stats.total} classified ({stats.cover} cover, {stats.title} title)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }}
          >
            <option value="unclassified">Unclassified ({stats.total - stats.classified})</option>
            <option value="all">All ({stats.total})</option>
            <option value="cover">Cover Pages ({stats.cover})</option>
            <option value="title">Title Pages ({stats.title})</option>
          </select>

          <button
            onClick={exportClassifications}
            style={{ padding: '0.5rem 1rem', background: '#4a9eff', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            Export JSON
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        {/* Image panel */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <img
            src={currentMap.medium}
            alt={`${currentMap.city}, ${currentMap.state} ${currentMap.year}`}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Side panel */}
        <div style={{
          width: '300px',
          background: '#2a2a2a',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {/* Map info */}
          <div>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem' }}>{currentMap.city}</h2>
            <p style={{ margin: 0, color: '#aaa' }}>{currentMap.state} &middot; {currentMap.year}</p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: '#666' }}>{currentMap.id}</p>
          </div>

          {/* Current classification */}
          {classifications[currentMap.id] && (
            <div style={{
              padding: '0.5rem',
              background: classifications[currentMap.id] === 'cover' ? '#2d5a2d' : '#5a5a2d',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              Currently: <strong>{classifications[currentMap.id]?.toUpperCase()}</strong>
            </div>
          )}

          {/* Progress */}
          <div style={{ fontSize: '0.875rem', color: '#aaa' }}>
            {currentIndex + 1} of {filteredMaps.length} in current view
          </div>

          {/* Classification buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => classify('cover')}
              style={{
                padding: '1rem',
                fontSize: '1rem',
                background: '#3d7a3d',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Cover Page (C or 1)
            </button>
            <button
              onClick={() => classify('title')}
              style={{
                padding: '1rem',
                fontSize: '1rem',
                background: '#7a7a3d',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Title Page (T or 2)
            </button>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: '#444',
                color: '#fff',
                border: 'none',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: currentIndex === 0 ? 0.5 : 1
              }}
            >
              ← Prev (P)
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex >= filteredMaps.length - 1}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: '#444',
                color: '#fff',
                border: 'none',
                cursor: currentIndex >= filteredMaps.length - 1 ? 'not-allowed' : 'pointer',
                opacity: currentIndex >= filteredMaps.length - 1 ? 0.5 : 1
              }}
            >
              Next (N) →
            </button>
          </div>

          {/* Keyboard shortcuts help */}
          <div style={{
            marginTop: 'auto',
            fontSize: '0.75rem',
            color: '#666',
            borderTop: '1px solid #444',
            paddingTop: '1rem'
          }}>
            <p style={{ margin: '0 0 0.5rem', fontWeight: 'bold' }}>Keyboard Shortcuts:</p>
            <p style={{ margin: '0.25rem 0' }}>C or 1 = Cover Page</p>
            <p style={{ margin: '0.25rem 0' }}>T or 2 = Title Page</p>
            <p style={{ margin: '0.25rem 0' }}>← / P = Previous</p>
            <p style={{ margin: '0.25rem 0' }}>→ / N = Next</p>
            <p style={{ margin: '0.25rem 0' }}>S = Skip</p>
          </div>
        </div>
      </div>
    </div>
  );
}
