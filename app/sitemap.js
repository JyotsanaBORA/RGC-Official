import { SERVICES } from '../lib/services-data';

export default function sitemap() {
  const baseUrl = 'https://www.reddingtonglobal.com';
  const now = new Date();

  const staticRoutes = [
    '',
    '/about',
    '/careers',
    '/contact',
    '/faq',
    '/process',
    '/projects',
    '/team',
    '/testimonials',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
