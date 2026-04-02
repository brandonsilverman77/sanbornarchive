import { MetadataRoute } from 'next';
import { maps } from '@/data/maps';
import { isPrintEnabled } from '@/lib/shopify-products';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const mapEntries: MetadataRoute.Sitemap = maps.map((map) => ({
    url: `${SITE_URL}/map/${map.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: isPrintEnabled(map.id) ? 0.8 : 0.7,
  }));

  const printEntries: MetadataRoute.Sitemap = maps
    .filter((map) => isPrintEnabled(map.id))
    .map((map) => ({
      url: `${SITE_URL}/prints/${map.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  // State landing pages
  const states = new Set(maps.map((m) => m.state));
  const stateEntries: MetadataRoute.Sitemap = Array.from(states).map((state) => ({
    url: `${SITE_URL}/maps/${state.toLowerCase().replace(/ /g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/maps`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/prints`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...stateEntries,
    ...mapEntries,
    ...printEntries,
  ];
}
