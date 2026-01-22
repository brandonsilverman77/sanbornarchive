import Link from 'next/link';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-16 bg-[var(--color-cream-dark)]">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-medium mb-6 md:mb-8 text-[var(--color-ink)]">
          About This Archive
        </h2>
        
        <p className="text-base md:text-lg text-[var(--color-ink-light)] leading-relaxed mb-6 md:mb-8">
          This project began over a decade ago when I stumbled upon a{' '}
          <a
            href="https://bibliodyssey.blogspot.com/2011/02/sanborn-fire-insurance-map-typography.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] border-b border-current hover:text-[var(--color-accent-light)] transition-colors"
          >
            small collection
          </a>{' '}
          of incredible typography from the Sanborn Fire Insurance Maps. I had never seen 
          anything like them, and I became obsessed.
        </p>

        <p className="text-base md:text-lg text-[var(--color-ink-light)] leading-relaxed mb-6 md:mb-8">
          The Sanborn Map Company created detailed maps of over 12,000 American towns and cities 
          between 1867 and 1970. Originally used by fire insurance companies to assess risk, 
          these maps now serve as an invaluable record of American urban history — and their 
          title pages are works of art in their own right.
        </p>

        <p className="text-base md:text-lg text-[var(--color-ink-light)] leading-relaxed mb-8 md:mb-10">
          This archive is dedicated to preserving and sharing the incredible typography and 
          artistry of these maps. Every image is freely available for personal use. If you&apos;d 
          like a museum-quality print, we partner with archival print specialists to offer 
          custom-sized reproductions.
        </p>

        <Link
          href="/about"
          className="text-[var(--color-accent)] border-b border-current hover:text-[var(--color-accent-light)] transition-colors text-base md:text-lg"
        >
          Read the full story →
        </Link>
      </div>
    </section>
  );
}
