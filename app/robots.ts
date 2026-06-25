import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Protects your backend routes from being indexed
    },
    sitemap: 'https://www.cloudpxl.com/sitemap.xml',
  }
}