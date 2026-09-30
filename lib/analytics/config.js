/**
 * Analytics Configuration
 * Set your Google Tag Manager (GTM) or GA4 ID here or in your .env.local file.
 */
export const ANALYTICS_CONFIG = {
  // Primary GTM ID (e.g., 'GTM-XXXXXXX') - recommended for running Ads
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WB37ZL9N',

  // Optional standalone Google Analytics 4 ID (e.g., 'G-XXXXXXXXXX')
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',

  // Optional Google Ads Conversion ID (e.g., 'AW-XXXXXXXXX')
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '',
};
