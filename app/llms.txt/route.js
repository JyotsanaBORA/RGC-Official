import { SERVICES } from '../../lib/services-data';

export const dynamic = 'force-static';

const SITE = 'https://www.reddingtonglobal.com';

/**
 * GET /llms.txt
 * Plain-text summary of the business for AI assistants (llmstxt.org format),
 * built from the same service data as the service pages.
 */
export function GET() {
  const services = SERVICES.map((s) => `- [${s.title}](${SITE}/services/${s.slug}): ${s.tagline.replace(/\*/g, '')}`).join('\n');

  const body = `# Reddington Global

> Reddington Global Consultancy Pvt Ltd is a Gurugram, India based firm offering BPO services, website development, AI & SaaS solutions, bookkeeping & accountancy, payroll, digital marketing, performance management consultancy and recruitment for small and mid-sized businesses.

Every engagement starts with a 1-on-1 consultation @ ₹99 (inclusive of GST, paid in advance and not adjusted against project fees). After the call we recommend a plan, timeline (ETA) and quote. Plan prices on the website are "Starting @" prices, exclusive of GST; some plans are custom quote.

## Services

${services}

## Pricing highlights

- Website Development: Basic, Standard and Premium plans starting @ ₹4,999, ₹9,999 and ₹19,999 (+ GST). Basic sites can go live in as little as 10 days.
- Payroll: starting @ ₹4,999/month for up to 10 employees (wage calculation, tax deduction, statutory compliance).
- Bookkeeping: Starter plan starting @ ₹4,999/month; larger plans on custom quote.

## Company

- [About](${SITE}/about)
- [Contact](${SITE}/contact)
- [FAQ](${SITE}/faq)
- [Our Process](${SITE}/process)
- [Privacy Policy](${SITE}/privacy-policy)
- [Terms & Conditions](${SITE}/terms-and-conditions)

## Contact

- Email: sales@reddingtonglobal.com
- Phone / WhatsApp: +91 98182 24995
- Office: Unit 319, 3rd Floor, Suncity Success Tower, Sector 65, Golf Course Extension Road, Gurugram, Haryana 122101, India
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
