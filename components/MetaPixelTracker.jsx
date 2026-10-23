'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initAttribution } from '../lib/analytics/attribution';

/**
 * MetaPixelTracker
 * Listens to client-side Next.js route transitions and fires PageView events to Meta Pixel.
 * Also initializes campaign attribution (UTMs, fbclid, referrers) across all pages.
 */
export default function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstMount = useRef(true);

  useEffect(() => {
    // 1. Initialize or update attribution parameters from URL / referrer
    initAttribution();

    // 2. Handle Meta Pixel PageView
    // The initial hard page load already fires PageView inside MetaPixel.jsx
    // Here we track all subsequent client-side Next.js route transitions.
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }

    // Also notify GTM dataLayer for GA4 / Google Ads unified multi-page tracking
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: pathname,
        page_search: searchParams?.toString() || '',
      });
    }
  }, [pathname, searchParams]);

  return null;
}
