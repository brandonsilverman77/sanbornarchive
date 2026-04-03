import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the Sanborn Fire Maps Archive. Questions about prints, the collection, or licensing? We\'d love to hear from you.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="guide-page">
        <article className="guide-content">
          <div className="guide-header">
            <h1 className="guide-title">Contact</h1>
            <p className="guide-subtitle">
              Questions, feedback, or just want to say hello? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="guide-body">
            <h2>General Inquiries</h2>
            <p>
              For questions about the archive, the collection, or anything else, reach out
              at{' '}
              <a href="mailto:brandon@sanbornfiremaps.com">brandon@sanbornfiremaps.com</a>.
            </p>

            <h2>Framed Prints</h2>
            <p>
              Questions about print sizing, framing options, shipping, or your order? Email us
              at{' '}
              <a href="mailto:brandon@sanbornfiremaps.com">brandon@sanbornfiremaps.com</a> and
              we&apos;ll get back to you as soon as possible. You can also browse our full
              selection of <Link href="/prints">framed prints</Link>.
            </p>

            <h2>Licensing & Commercial Use</h2>
            <p>
              The images in this archive are freely available for personal, non-commercial use.
              If you&apos;re interested in commercial licensing or have questions about usage
              rights, please get in touch and we&apos;ll be happy to discuss.
            </p>

            <h2>Press & Media</h2>
            <p>
              For press inquiries, interviews, or media requests, please
              email{' '}
              <a href="mailto:brandon@sanbornfiremaps.com">brandon@sanbornfiremaps.com</a>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
