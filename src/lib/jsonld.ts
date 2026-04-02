import { SITE_URL, SITE_NAME } from './constants';
import { MapImage } from './types';
import { isPrintEnabled, PRINT_SIZE_TIERS } from './shopify-products';

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'A digital archive of over 3,500 Sanborn Fire Insurance Map title pages from 1867–1923.',
    founder: {
      '@type': 'Person',
      name: 'Brandon Silverman',
    },
  };
}

export function getCollectionPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Sanborn Fire Maps — A Digital Archive',
    description: 'Explore over 3,500 meticulously preserved title pages from the Sanborn Fire Insurance Maps.',
    url: SITE_URL,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'Collection',
      name: 'Sanborn Fire Insurance Maps',
      description: 'A collection of Victorian-era fire insurance map title pages drawn between 1867 and 1923.',
    },
  };
}

export function getMapJsonLd(map: MapImage) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: `Sanborn Fire Insurance Map: ${map.city}, ${map.state} (${map.year})`,
    description: `Title page from the ${map.year} Sanborn Fire Insurance Map for ${map.city}, ${map.state}.`,
    url: `${SITE_URL}/map/${map.id}`,
    image: map.medium,
    dateCreated: `${map.year}`,
    creator: {
      '@type': 'Organization',
      name: 'Sanborn Map Company',
    },
    spatialCoverage: {
      '@type': 'Place',
      name: `${map.city}, ${map.state}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: map.city,
        addressRegion: map.state,
        addressCountry: 'US',
      },
    },
    encodingFormat: 'image/jpeg',
    isPartOf: {
      '@type': 'Collection',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return baseData;
}

export function getProductJsonLd(map: MapImage) {
  if (!isPrintEnabled(map.id)) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${map.city}, ${map.state} (${map.year}) — Framed Sanborn Map Print`,
    description: `Museum-quality framed print of the ${map.year} Sanborn Fire Insurance Map for ${map.city}, ${map.state}. Giclée printed on archival paper, custom framed with Gallery Natural hardwood frame, conservation mat, and UV-protective glazing.`,
    image: map.medium,
    url: `${SITE_URL}/map/${map.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Sanborn Fire Maps',
    },
    offers: PRINT_SIZE_TIERS.map((tier) => ({
      '@type': 'Offer',
      name: `${tier.name} Print`,
      price: tier.price.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/map/${map.id}`,
      seller: {
        '@type': 'Organization',
        name: 'Sanborn Fire Maps',
      },
    })),
  };
}

export function getFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does shipping take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each print is custom framed to order and ships in 7–10 business days. Shipping is free on orders over $200.',
        },
      },
      {
        '@type': 'Question',
        name: 'What materials are used?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prints are produced using giclée printing on 100% cotton, acid-free archival paper with fade-resistant inks. Frames are sustainably sourced Gallery Natural hardwood with acid-free conservation matting and UV-protective acrylic glazing.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is your return policy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept returns within 30 days of delivery for damaged or defective items. Since each print is custom framed to order, we cannot accept returns for change of mind. Please contact us if your order arrives damaged.',
        },
      },
      {
        '@type': 'Question',
        name: 'What sizes are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prints are available in three sizes: Small (12" longest edge, $139), Medium (18" longest edge, $299), and Large (24" longest edge, $465). All sizes include the frame, mat, glazing, and mounting hardware.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who frames the prints?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All prints are custom framed by Simply Framed, a premium framing studio trusted by museums and galleries nationwide. Each frame is handmade in the USA.',
        },
      },
    ],
  };
}
