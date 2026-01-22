import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-6 md:px-16 pt-28 md:pt-32 pb-16 max-w-[1400px] mx-auto items-center">
      {/* Content */}
      <div className="lg:pr-8 text-center lg:text-left">
        <p className="font-body text-xs md:text-sm tracking-[0.15em] uppercase text-[var(--color-ink-faded)] mb-4 md:mb-6">
          A Free Digital Archive
        </p>
        
        <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-tight mb-4 md:mb-6 text-[var(--color-ink)]">
          The Lost Art of
          <br />
          <em className="text-[var(--color-accent)]">American Cartography</em>
        </h1>
        
        <p className="text-base md:text-lg text-[var(--color-ink-light)] mb-8 md:mb-10 max-w-[480px] mx-auto lg:mx-0 leading-relaxed">
          Explore over 3,500 meticulously preserved title pages from the Sanborn Fire Insurance Maps — 
          a stunning collection of Victorian-era typography and design, drawn between 1867 and 1923.
        </p>

        {/* Stats */}
        <div className="flex gap-8 md:gap-12 mb-8 md:mb-10 pt-6 border-t border-[var(--color-parchment)] justify-center lg:justify-start">
          <div className="text-left">
            <div className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-ink)] leading-none">
              3,500+
            </div>
            <div className="text-xs md:text-sm text-[var(--color-ink-faded)] mt-1 tracking-wide">
              Title Pages
            </div>
          </div>
          <div className="text-left">
            <div className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-ink)] leading-none">
              2,400
            </div>
            <div className="text-xs md:text-sm text-[var(--color-ink-faded)] mt-1 tracking-wide">
              Cities
            </div>
          </div>
          <div className="text-left">
            <div className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-ink)] leading-none">
              50
            </div>
            <div className="text-xs md:text-sm text-[var(--color-ink-faded)] mt-1 tracking-wide">
              States
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="#explore"
          className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-[var(--color-ink)] text-[var(--color-cream)] font-body text-sm md:text-base tracking-wide hover:bg-[var(--color-accent)] transition-all duration-300 hover:-translate-y-0.5 group"
        >
          Start Exploring
          <svg 
            className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {/* Featured Image */}
      <div className="relative order-first lg:order-last">
        <div className="relative bg-white p-4 md:p-6 shadow-[0_4px_6px_rgba(44,36,22,0.05),0_20px_40px_rgba(44,36,22,0.1),0_40px_80px_rgba(44,36,22,0.08)] rotate-1 hover:rotate-0 hover:scale-[1.01] transition-transform duration-400 max-w-[500px] mx-auto">
          <Image
            src="https://sanborn-fire-maps.myshopify.com/cdn/shop/files/Charleston2.png?v=1690791832"
            alt="Charleston, South Carolina 1902"
            width={600}
            height={720}
            className="w-full h-auto"
            priority
          />
        </div>
        <p className="absolute -bottom-8 right-0 text-sm text-[var(--color-ink-faded)] italic">
          Charleston, South Carolina — 1902
        </p>
      </div>
    </section>
  );
}
