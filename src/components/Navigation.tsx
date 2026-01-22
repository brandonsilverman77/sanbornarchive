'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex justify-between items-center transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-cream)]/95 backdrop-blur-sm shadow-sm'
          : 'bg-gradient-to-b from-[var(--color-cream)] via-[var(--color-cream)]/80 to-transparent'
      }`}
    >
      <Link
        href="/"
        className="font-display text-xl md:text-[1.35rem] font-medium tracking-wide text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
      >
        Sanborn Fire Maps{' '}
        <span className="text-[var(--color-ink-faded)] font-normal">Archive</span>
      </Link>

      <ul className="flex gap-6 md:gap-10 list-none">
        <li>
          <Link
            href="#explore"
            className="font-body text-sm md:text-[0.95rem] text-[var(--color-ink-light)] tracking-wide hover:text-[var(--color-accent)] transition-colors"
          >
            Explore
          </Link>
        </li>
        <li>
          <Link
            href="#about"
            className="font-body text-sm md:text-[0.95rem] text-[var(--color-ink-light)] tracking-wide hover:text-[var(--color-accent)] transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/prints"
            className="font-body text-sm md:text-[0.95rem] text-[var(--color-ink-light)] tracking-wide hover:text-[var(--color-accent)] transition-colors"
          >
            Prints
          </Link>
        </li>
      </ul>
    </nav>
  );
}
