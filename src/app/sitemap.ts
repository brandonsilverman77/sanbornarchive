import { MetadataRoute } from 'next';
import { maps } from '@/data/maps';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const mapEntries: MetadataRoute.Sitemap = maps.map((map) => ({
    url: `${SITE_URL}/map/${map.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...mapEntries,
  ];
}
