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

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/prints`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...mapEntries,
    ...printEntries,
  ];
}
