import { notFound } from 'next/navigation';
import { SERVICES, getServiceBySlug } from '../../../lib/services-data';
import SiteNav from '../../../components/SiteNav';
import SiteFooter from '../../../components/SiteFooter';
import ClientScripts from '../../../components/ClientScripts';

export async function generateStaticParams() {
  return SERVICES.flatMap(s => [
    { slug: s.slug },
    ...(s.aliases ? s.aliases.map(a => ({ slug: a })) : []),
  ]);
}

export async function generateMetadata({ params }) {
  const svc = getServiceBySlug(params.slug);
  if (!svc) return {};
  return {
    title: `${svc.title} — Reddington Global`,
    description: svc.tagline,
  };
}

export default function ServicePage({ params }) {
  const svc = getServiceBySlug(params.slug);
  if (!svc) notFound();

  return (
    <>
      {/* ══ Shared SVG gradient defs ══ */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="gradGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6D97E" />
            <stop offset="55%" stopColor="#D9A93F" />
            <stop offset="100%" stopColor="#A87B1F" />
          </linearGradient>
          <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EE3B3B" />
            <stop offset="100%" stopColor="#9E0F14" />
          </linearGradient>
        </defs>
      </svg>

      {/* Progress */}
      <div className="progress" id="progressBar" aria-hidden="true"></div>

      <SiteNav />

      <main>
        {/* ══════════ SERVICE HERO ══════════ */}
        <section className="svc-hero">
          <div
            className="svc-hero__bg"
            style={{ backgroundImage: `url(${svc.image})` }}
            aria-hidden="true"
          >
            <div className="svc-hero__veil"></div>
          </div>
          <div className="container svc-hero__content">
            <a href="/#services" className="svc-hero__back">
              <span aria-hidden="true">←</span> All Services
            </a>
            <p className="eyebrow reveal">{svc.eyebrow}</p>
            <h1 className="svc-hero__title reveal">{svc.title}</h1>
            <p className="svc-hero__tagline reveal">{svc.tagline}</p>
            <a href="/#contact" className="btn btn--gold reveal">Get a Free Consultation</a>
          </div>
        </section>

        {/* ══════════ OVERVIEW ══════════ */}
        <section className="section svc-overview">
          <div className="container svc-overview__grid">
            <div className="svc-overview__text reveal">
              <p className="eyebrow">Overview</p>
              <h2 className="section__title">
                What we <span className="gold-italic">deliver.</span>
              </h2>
              <p className="lead">{svc.overview}</p>
              {svc.website?.href && (
                <a href={svc.website.href} target="_blank" rel="noreferrer" className="link-arrow" style={{ marginBottom: '14px', display: 'inline-flex' }}>
                  Visit {svc.website.label} <span aria-hidden="true">→</span>
                </a>
              )}
              <a href="/#contact" className="link-arrow">
                Talk to our team <span aria-hidden="true">→</span>
              </a>
            </div>
            <figure className="svc-overview__img img-reveal">
              <img src={svc.image} alt={svc.title} loading="lazy" />
            </figure>
          </div>
        </section>

        {/* ══════════ OFFERINGS ══════════ */}
        <section className="section section--dark svc-offerings">
          <div className="container">
            <div className="section__head reveal">
              <p className="eyebrow">What&apos;s Included</p>
              <h2 className="section__title">
                Key <span className="gold-italic">offerings.</span>
              </h2>
            </div>
            <div className="svc-offerings__grid">
              {svc.offerings.map(o => (
                <div className="svc-offering reveal" key={o.num}>
                  <span className="svc-offering__num">{o.num}</span>
                  <div>
                    <h3>{o.title}</h3>
                    <p>{o.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ WHY REDDINGTON ══════════ */}
        <section className="section svc-why">
          <div className="container">
            <div className="section__head reveal">
              <p className="eyebrow">Why Reddington</p>
              <h2 className="section__title">
                Built on <span className="gold-italic">trust &amp; results.</span>
              </h2>
            </div>
            <div className="svc-why__grid">
              {svc.whyRG.map((w, i) => (
                <div className="svc-why__card reveal" key={i}>
                  <div className="svc-why__num">0{i + 1}</div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ SLA & ASSURANCE ══════════ */}
        {svc.slas && (
          <section className="section section--dark svc-slas">
            <div className="container">
              <div className="section__head reveal">
                <p className="eyebrow">Service Level Commitment</p>
                <h2 className="section__title">
                  Guaranteed <span className="gold-italic">standards &amp; SLAs.</span>
                </h2>
              </div>
              <div className="svc-slas__grid">
                {svc.slas.map((s, i) => (
                  <div className="svc-sla__card reveal" key={i}>
                    <div className="svc-sla__metric">{s.metric}</div>
                    <div className="svc-sla__label">{s.label}</div>
                    <p className="svc-sla__detail">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════ CTA BAND ══════════ */}
        <section className="svc-cta">
          <div className="container svc-cta__inner reveal">
            <div>
              <p className="eyebrow">Ready to get started?</p>
              <h2 className="section__title">
                Let&apos;s build something <span className="gold-italic">great together.</span>
              </h2>
            </div>
            <div className="svc-cta__actions">
              <a href="/#contact" className="btn btn--gold">Get a Free Consultation</a>
              <a href="/#services" className="btn btn--ghost">View All Services</a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <button className="totop" id="toTop" aria-label="Back to top">↑</button>

      <ClientScripts />
    </>
  );
}
