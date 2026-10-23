/**
 * Attribution & Campaign Tracking Engine
 * Captures UTM parameters, Meta Click ID (fbclid), landing page, and referrers.
 * Persists attribution across client-side SPA navigation for accurate ad conversion tracking.
 */

const STORAGE_KEY_SESSION = 'rgc_attribution';
const STORAGE_KEY_LOCAL = 'rgc_attribution_persisted';

/**
 * Extracts campaign parameters from a URL search query or string
 */
export function extractCampaignParams(searchStr = '') {
  if (typeof window === 'undefined') return {};

  const query = searchStr || window.location.search || '';
  const params = new URLSearchParams(query);

  const utmSource = params.get('utm_source') || '';
  const utmMedium = params.get('utm_medium') || '';
  const utmCampaign = params.get('utm_campaign') || '';
  const utmContent = params.get('utm_content') || '';
  const utmTerm = params.get('utm_term') || '';
  const fbclid = params.get('fbclid') || '';
  const gclid = params.get('gclid') || '';

  // Infer Meta / Social traffic from referrer if UTMs were not manually set
  let inferredSource = utmSource;
  let inferredMedium = utmMedium;

  if (!inferredSource && typeof document !== 'undefined') {
    const ref = document.referrer || '';
    if (ref.includes('facebook.com') || ref.includes('fb.com')) {
      inferredSource = 'facebook';
      inferredMedium = fbclid ? 'paid_social' : 'organic_social';
    } else if (ref.includes('instagram.com')) {
      inferredSource = 'instagram';
      inferredMedium = fbclid ? 'paid_social' : 'organic_social';
    } else if (ref.includes('linkedin.com')) {
      inferredSource = 'linkedin';
      inferredMedium = 'social';
    } else if (ref.includes('google.') && !gclid) {
      inferredSource = 'google';
      inferredMedium = 'organic';
    }
  }

  // If fbclid is present, definitely paid Meta Ads
  if (fbclid && !inferredSource) {
    inferredSource = 'meta';
    inferredMedium = 'paid_social';
  }

  const hasTrackingData = Boolean(
    inferredSource || utmCampaign || fbclid || gclid || utmContent || utmMedium
  );

  return {
    hasTrackingData,
    source: inferredSource || 'direct',
    medium: inferredMedium || 'none',
    campaign: utmCampaign || 'none',
    content: utmContent || '',
    term: utmTerm || '',
    fbclid: fbclid || '',
    gclid: gclid || '',
  };
}

/**
 * Initializes and persists campaign attribution on landing / route navigation
 */
export function initAttribution() {
  if (typeof window === 'undefined') return null;

  try {
    const currentParams = extractCampaignParams();
    const currentPath = window.location.pathname + window.location.search;
    const referrer = document.referrer || '';

    const existingSession = sessionStorage.getItem(STORAGE_KEY_SESSION);

    // If we have explicit new campaign params, or if this is the first session visit:
    if (currentParams.hasTrackingData || !existingSession) {
      const attributionData = {
        source: currentParams.source,
        medium: currentParams.medium,
        campaign: currentParams.campaign,
        content: currentParams.content,
        term: currentParams.term,
        fbclid: currentParams.fbclid,
        gclid: currentParams.gclid,
        landingPage: currentPath,
        referrer: referrer,
        capturedAt: new Date().toISOString(),
      };

      sessionStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(attributionData));
      localStorage.setItem(STORAGE_KEY_LOCAL, JSON.stringify(attributionData));
      return attributionData;
    }

    return JSON.parse(existingSession);
  } catch (err) {
    console.warn('Attribution engine error:', err);
    return null;
  }
}

/**
 * Retrieves the active attribution data to attach to form submissions or payment orders
 */
export function getAttributionData() {
  if (typeof window === 'undefined') {
    return {
      source: 'direct',
      medium: 'none',
      campaign: 'none',
      content: '',
      term: '',
      fbclid: '',
      gclid: '',
      landingPage: '/',
      referrer: '',
    };
  }

  try {
    const sessionData = sessionStorage.getItem(STORAGE_KEY_SESSION);
    if (sessionData) {
      return JSON.parse(sessionData);
    }

    const localData = localStorage.getItem(STORAGE_KEY_LOCAL);
    if (localData) {
      return JSON.parse(localData);
    }
  } catch (e) {}

  return {
    source: 'direct',
    medium: 'none',
    campaign: 'none',
    content: '',
    term: '',
    fbclid: '',
    gclid: '',
    landingPage: window.location.pathname,
    referrer: document.referrer || '',
  };
}
