'use client';

import { useEffect, useRef } from 'react';
import { trackServiceView } from '../lib/analytics/events';
import { CONSULTATION, getPackageCharge } from '../lib/packages-data';

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

    // Every service converts through the prepaid ₹99 consultation
    const price = getPackageCharge(CONSULTATION).total;

    trackServiceView({
      slug: service.slug,
      title: service.title,
      category: service.categoryName || 'Consultancy',
      price,
    });
  }, [service]);

  return null;
}
