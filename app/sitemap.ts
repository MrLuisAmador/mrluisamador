import {MetadataRoute} from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.mrluisamador.com/',
      lastModified: new Date(),
    },
    {
      url: 'https://www.mrluisamador.com/about',
      lastModified: new Date(),
    },
    {
      url: 'https://www.mrluisamador.com/services',
      lastModified: new Date(),
    },
    {
      url: 'https://www.mrluisamador.com/projects',
      lastModified: new Date(),
    },
    {
      url: 'https://www.mrluisamador.com/blogs',
      lastModified: new Date(),
    },
    {
      url: 'https://www.mrluisamador.com/contact',
      lastModified: new Date(),
    },
    {
      url: 'https://www.mrluisamador.com/thankyou',
      lastModified: new Date(),
    },
  ]
}
