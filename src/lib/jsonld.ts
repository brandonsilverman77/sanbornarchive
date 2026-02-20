import { SITE_URL, SITE_NAME } from './constants';
import { MapImage } from './types';

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
  return {
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
}
