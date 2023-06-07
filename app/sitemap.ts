import { MetadataRoute } from 'next';
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.mrluisamador.com/',
      lastModified: new Date(),
    },
    {
      url: 'https://www.mrluisamador.com/blog',
      lastModified: new Date(),
    },
  ];
}