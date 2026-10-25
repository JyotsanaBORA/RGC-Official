'use client';

import { useEffect, useRef } from 'react';
import { trackServiceView } from '../lib/analytics/events';

/**
 * ServicePageViewTracker
 * Fires Meta Pixel 'ViewContent' and GA4 dataLayer 'view_item' events
 * with service-specific metadata, category, and package price.
 */
export default function ServicePageViewTracker({ service }) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!service || trackedRef.current) return;
    trackedRef.current = true;

    const isWebDev = service.slug === 'web-development' || service.slug === 'web-dev';
    const price = isWebDev ? 4999 : 99;

    trackServiceView({
      slug: service.slug,
      title: service.title,
      category: service.categoryName || 'Consultancy',
      price,
    });
  }, [service]);

  return null;
}
