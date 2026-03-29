import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://coreframe.one';
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
    {
      url: `${baseUrl}/de`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
  ];
}
