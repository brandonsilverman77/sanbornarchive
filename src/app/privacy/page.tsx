import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for the Sanborn Fire Maps Archive. Learn how we handle your data when you visit our site or purchase framed prints.',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="guide-page">
        <article className="guide-content">
          <div className="guide-header">
            <h1 className="guide-title">Privacy Policy</h1>
            <p className="guide-subtitle">
              Last updated: April 2026
            </p>
          </div>

          <div className="guide-body">
            <p className="guide-lede">
              The Sanborn Fire Maps Archive (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              operates sanbornfiremaps.com. This page describes how we collect, use, and protect your
              information when you visit our website or purchase framed prints.
            </p>

            <h2>Information We Collect</h2>
            <h3>Analytics Data</h3>
            <p>
              We use Google Analytics to understand how visitors interact with our site. This service
              collects anonymized data including pages visited, time spent on the site, referring
              websites, and general geographic location. This data is aggregated and does not
              personally identify you.
            </p>

            <h3>Purchase Information</h3>
            <p>
              When you purchase a framed print, your order is processed through Shopify. Shopify
              collects the information necessary to fulfill your order, including your name, shipping
              address, email address, and payment information. We do not store your payment details
              directly. Please refer to{' '}
              <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer">
                Shopify&apos;s Privacy Policy
              </a>{' '}
              for details on how they handle your data.
            </p>

            <h3>Framing Services</h3>
            <p>
              Framing for our prints is provided by Simply Framed. When your order is fulfilled,
              relevant order details are shared with Simply Framed to produce and ship your framed
              print. Please refer to{' '}
              <a href="https://www.simplyframed.com/pages/privacy-policy" target="_blank" rel="noopener noreferrer">
                Simply Framed&apos;s Privacy Policy
              </a>{' '}
              for details on their data practices.
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill print orders</li>
              <li>Respond to your questions and requests</li>
              <li>Understand how visitors use our site so we can improve it</li>
              <li>Communicate with you about your order status</li>
            </ul>

            <h2>Cookies</h2>
            <p>
              Our site uses cookies for analytics (Google Analytics) and for shopping cart
              functionality (Shopify). These cookies help us understand site usage and enable
              the shopping experience. You can disable cookies in your browser settings, though
              this may affect certain site functionality.
            </p>

            <h2>Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Google Analytics</strong> — Site analytics and traffic measurement</li>
              <li><strong>Shopify</strong> — E-commerce and payment processing</li>
              <li><strong>Simply Framed</strong> — Print framing and fulfillment</li>
              <li><strong>Cloudflare R2</strong> — Image hosting and delivery</li>
            </ul>
            <p>
              Each of these services has its own privacy policy governing their use of data.
            </p>

            <h2>Data Security</h2>
            <p>
              We take reasonable measures to protect your information. Payment processing is
              handled entirely by Shopify using industry-standard encryption. We do not store
              credit card numbers or other sensitive payment information on our servers.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our site is not directed at children under 13. We do not knowingly collect personal
              information from children under 13.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be posted on this
              page with an updated revision date.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about this privacy policy or your data, please contact us
              at{' '}
              <a href="mailto:brandon@sanbornfiremaps.com">brandon@sanbornfiremaps.com</a>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
