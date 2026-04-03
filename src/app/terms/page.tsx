import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of use for the Sanborn Fire Maps Archive. Guidelines for using our digital collection and purchasing framed prints.',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="guide-page">
        <article className="guide-content">
          <div className="guide-header">
            <h1 className="guide-title">Terms of Use</h1>
            <p className="guide-subtitle">
              Last updated: April 2026
            </p>
          </div>

          <div className="guide-body">
            <p className="guide-lede">
              By accessing and using sanbornfiremaps.com (&ldquo;the Site&rdquo;), you agree to the
              following terms and conditions. Please read them carefully.
            </p>

            <h2>The Archive</h2>
            <p>
              The Sanborn Fire Maps Archive is a digital collection of title pages from Sanborn Fire
              Insurance Maps. The original maps were produced by the Sanborn Map Company between 1867
              and 1970 and are in the public domain. Our digital scans and restorations of these
              public domain works are made available for personal, non-commercial use.
            </p>

            <h2>Personal Use</h2>
            <p>
              You are welcome to browse, download, and use images from the archive for personal,
              non-commercial purposes. This includes:
            </p>
            <ul>
              <li>Personal research and study</li>
              <li>Educational use</li>
              <li>Personal creative projects</li>
              <li>Social media sharing (with attribution appreciated)</li>
            </ul>

            <h2>Commercial Use</h2>
            <p>
              If you wish to use images from the archive for commercial purposes — including
              publications, products, advertising, or resale — please{' '}
              <Link href="/contact">contact us</Link> to discuss licensing.
            </p>

            <h2>Framed Prints</h2>
            <p>
              Framed prints sold through the Site are produced and fulfilled by Simply Framed in
              partnership with us. By purchasing a framed print, you agree to the following:
            </p>
            <ul>
              <li>
                <strong>Pricing</strong> — All prices are listed in US dollars and include the print,
                framing, and standard shipping within the United States.
              </li>
              <li>
                <strong>Production time</strong> — Each print is custom framed to order. Please allow
                approximately 2 weeks for production and shipping.
              </li>
              <li>
                <strong>Returns</strong> — Due to the custom nature of framed prints, we are unable to
                accept returns for change of mind. If your print arrives damaged or defective, please
                contact us within 7 days of delivery and we will arrange a replacement.
              </li>
              <li>
                <strong>Shipping</strong> — We currently ship framed prints within the United States.
                Prints are carefully packaged to prevent damage during transit.
              </li>
            </ul>

            <h2>Accuracy</h2>
            <p>
              We strive to accurately represent the maps in our archive, including their city, state,
              and year of origin. However, we make no guarantees about the completeness or accuracy of
              historical information associated with each map. The maps are presented as historical
              documents and should be understood in that context.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              The Site and its contents are provided &ldquo;as is.&rdquo; We make no warranties,
              express or implied, regarding the Site&apos;s availability, accuracy, or fitness for any
              particular purpose. We shall not be liable for any damages arising from your use of the
              Site or purchase of products.
            </p>

            <h2>Changes to These Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the Site after changes are
              posted constitutes acceptance of the updated terms.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about these terms, please{' '}
              <Link href="/contact">contact us</Link>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
