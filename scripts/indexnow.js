#!/usr/bin/env node

/**
 * Submit every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver),
 * so search engines re-crawl changed pages straight away.
 * Run after each deploy: npm run indexnow
 *
 * The key file public/<KEY>.txt must be live on the site before submitting.
 */

const SITE = 'https://www.reddingtonglobal.com';
const KEY = 'd416d981c43cda880e98d5bf5735696b';

async function main() {
  const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (!urlList.length) throw new Error('No URLs found in sitemap');

  const keyCheck = await fetch(`${SITE}/${KEY}.txt`);
  if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
    throw new Error(`Key file ${SITE}/${KEY}.txt is not live yet. Deploy first, then rerun.`);
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: 'www.reddingtonglobal.com', key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
  });

  // 200 = accepted, 202 = accepted and key pending validation
  console.log(`[IndexNow] Submitted ${urlList.length} URLs → HTTP ${res.status}`);
  if (res.status >= 400) {
    console.error(await res.text());
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('[IndexNow]', err.message);
  process.exit(1);
});
