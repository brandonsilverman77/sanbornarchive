import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      {/* Content */}
      <div className="hero-content">
        <p className="hero-label">
          A Free Digital Archive
        </p>
        
        <h1>
          The Lost Art of
          <br />
          <em>American Cartography</em>
        </h1>
        
        <p className="hero-description">
          Explore over 3,500 meticulously preserved title pages from the Sanborn Fire Insurance Maps — 
          a stunning collection of Victorian-era typography and design, drawn between 1867 and 1923.
        </p>

        {/* Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">3,500+</div>
            <div className="hero-stat-label">Title Pages</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">2,400</div>
            <div className="hero-stat-label">Cities</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">50</div>
            <div className="hero-stat-label">States</div>
          </div>
        </div>

        {/* CTA */}
        <Link href="#explore" className="hero-cta">
          Start Exploring
          <svg 
            width="20" 
            height="20" 
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
      <div className="hero-image">
        <div className="hero-image-frame">
          <Image
            src="https://sanborn-fire-maps.myshopify.com/cdn/shop/files/Charleston2.png?v=1690791832"
            alt="Charleston, South Carolina 1902"
            width={600}
            height={720}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </div>
        <p className="hero-image-caption">
          Charleston, South Carolina — 1902
        </p>
      </div>
    </section>
  );
}
