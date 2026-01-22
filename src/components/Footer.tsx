import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-10 md:py-16 px-6 md:px-16 bg-[var(--color-ink)] text-[var(--color-cream)]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        <div className="font-display text-lg md:text-xl">
          Sanborn Fire Maps
        </div>

        <ul className="flex flex-wrap justify-center gap-4 md:gap-8 list-none">
          <li>
            <Link
              href="/about"
              className="text-[var(--color-cream)]/70 text-sm hover:text-[var(--color-cream)] transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-[var(--color-cream)]/70 text-sm hover:text-[var(--color-cream)] transition-colors"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/privacy"
              className="text-[var(--color-cream)]/70 text-sm hover:text-[var(--color-cream)] transition-colors"
            >
              Privacy
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="text-[var(--color-cream)]/70 text-sm hover:text-[var(--color-cream)] transition-colors"
            >
              Terms
            </Link>
          </li>
        </ul>

        <p className="text-[var(--color-cream)]/50 text-xs md:text-sm">
          Built with care by Brandon Silverman
        </p>
      </div>
    </footer>
  );
}
