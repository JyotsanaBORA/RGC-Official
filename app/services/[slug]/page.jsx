import { notFound } from 'next/navigation';
import { SERVICES, getServiceBySlug } from '../../../lib/services-data';
import SiteNav from '../../../components/SiteNav';
import SiteFooter from '../../../components/SiteFooter';
import ClientScripts from '../../../components/ClientScripts';
import ServiceLeadForm from '../../../components/ServiceLeadForm';

export async function generateStaticParams() {
  return SERVICES.flatMap((s) => [
    { slug: s.slug },
    ...(s.aliases ? s.aliases.map((a) => ({ slug: a })) : []),
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
      {/* Shared gradient definitions */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="gradGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6D97E" />
            <stop offset="55%" stopColor="#D9A93F" />
            <stop offset="100%" stopColor="#A87B1F" />
          </linearGradient>
        </defs>
      </svg>

      <div className="progress" id="progressBar" aria-hidden="true"></div>

      <SiteNav />

      <main className="svc-dash">
        {/* ════════════════════════════════════════════════════════════════
            1. EXECUTIVE SPLIT HERO DASHBOARD (Deloitte / TCS Standard)
        ════════════════════════════════════════════════════════════════ */}
        <section className="svc-dash__hero">
          <div className="container">
            {/* Breadcrumb */}
            <div className="svc-dash__breadcrumb reveal">
              <a href="/">Home</a>
              <span className="svc-dash__sep">/</span>
              <a href="/#services">Services</a>
              <span className="svc-dash__sep">/</span>
              <span className="svc-dash__cat">{svc.categoryName}</span>
              <span className="svc-dash__sep">/</span>
              <span className="svc-dash__current">{svc.title}</span>
            </div>

            <div className="svc-dash__hero-grid">
              {/* Left Column: Strategic Value Proposition & Telemetry */}
              <div className="svc-dash__hero-left">
                <div className="svc-dash__pill reveal">
                  <span className="svc-dash__pill-dot"></span>
                  {svc.eyebrow}
                </div>

                <h1 className="svc-dash__title reveal">{svc.title}</h1>

                <p className="svc-dash__tagline reveal">{svc.tagline}</p>

                <p className="svc-dash__overview reveal">{svc.overview}</p>

                {/* Product UI & Operations Platform Console */}
                <figure className="svc-dash__hero-photo reveal">
                  <img
                    src={svc.image}
                    alt={`${svc.title} enterprise platform console at Reddington Global`}
                    className="svc-dash__hero-img"
                  />
                  <figcaption className="svc-dash__hero-caption">
                    <span className="svc-dash__live-badge">Enterprise Console</span>
                    <span>Reddington Global Practice Operations · Real-Time Platform Telemetry</span>
                  </figcaption>
                </figure>

                {/* Proof Telemetry Stats Cards */}
                {svc.stats && svc.stats.length > 0 && (
                  <div className="svc-dash__stats-row reveal">
                    {svc.stats.map((st, i) => (
                      <div key={i} className="svc-dash__stat-card">
                        <span className="svc-dash__stat-num">{st.metric}</span>
                        <span className="svc-dash__stat-label">{st.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Instant Action Anchors */}
                <div className="svc-dash__hero-actions reveal">
                  <a href="#capabilities" className="btn btn--secondary">
                    Explore Capabilities ↓
                  </a>
                  <a
                    href="https://wa.me/919818224495"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="svc-dash__quick-wa"
                  >
                    <span>💬</span> WhatsApp Direct
                  </a>
                </div>
              </div>

              {/* Right Column: Embedded Strategic Consultation Form */}
              <div className="svc-dash__hero-right reveal">
                <ServiceLeadForm serviceTitle={svc.title} serviceSlug={svc.slug} />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            2. THE ENTERPRISE PROBLEM VS. REDDINGTON SOLUTION
        ════════════════════════════════════════════════════════════════ */}
        {svc.challengeVsSolution && (
          <section className="svc-dash__matrix">
            <div className="container">
              <div className="svc-dash__matrix-header reveal">
                <p className="eyebrow">Strategic Analysis</p>
                <h2 className="section__title">
                  The Enterprise Challenge <span className="gold-italic">vs. Our Engineered Approach.</span>
                </h2>
              </div>

              <div className="svc-dash__matrix-grid reveal">
                {/* Friction Card */}
                <div className="svc-dash__matrix-card svc-dash__matrix-card--friction">
                  <div className="svc-dash__matrix-badge svc-dash__matrix-badge--friction">
                    Industry Operational Bottleneck
                  </div>
                  <h3>Where Typical Deployments Struggle</h3>
                  <p>{svc.challengeVsSolution.challenge}</p>
                </div>

                {/* Solution Card */}
                <div className="svc-dash__matrix-card svc-dash__matrix-card--solution">
                  <div className="svc-dash__matrix-badge svc-dash__matrix-badge--solution">
                    The Reddington Global Model
                  </div>
                  <h3>How We Architect Success</h3>
                  <p>{svc.challengeVsSolution.solution}</p>
                </div>

                {/* Impact Card */}
                <div className="svc-dash__matrix-card svc-dash__matrix-card--impact">
                  <div className="svc-dash__matrix-badge svc-dash__matrix-badge--impact">
                    Quantifiable Business Impact
                  </div>
                  <h3>The Bottom-Line Outcome</h3>
                  <p>{svc.challengeVsSolution.impact}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════════
            3. CORE CAPABILITIES (6 High-Density Enterprise Modules)
        ════════════════════════════════════════════════════════════════ */}
        <section className="svc-dash__capabilities" id="capabilities">
          <div className="container">
            <div className="svc-dash__cap-header reveal">
              <p className="eyebrow">Specialized Practice Areas</p>
              <h2 className="section__title">
                Core Capabilities &amp; <span className="gold-italic">Execution Deliverables.</span>
              </h2>
              <p className="section__sub">
                End-to-end operational rigor built for middle-market and enterprise scale.
              </p>
            </div>

            <div className="svc-dash__cap-grid">
              {svc.offerings.map((off, idx) => (
                <div key={idx} className="svc-dash__cap-card reveal">
                  <div className="svc-dash__cap-top">
                    <span className="svc-dash__cap-num">{off.num}</span>
                    <span className="svc-dash__cap-dot"></span>
                  </div>
                  <h3 className="svc-dash__cap-title">{off.title}</h3>
                  <p className="svc-dash__cap-desc">{off.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            4. OPERATIONAL SLAS & GOVERNANCE COMMITMENTS
        ════════════════════════════════════════════════════════════════ */}
        {svc.slas && svc.slas.length > 0 && (
          <section className="svc-dash__slas">
            <div className="container">
              <div className="svc-dash__sla-box reveal">
                <div className="svc-dash__sla-intro">
                  <p className="eyebrow">Institutional Governance</p>
                  <h3>Service Level Agreements &amp; Quality Benchmarks</h3>
                  <p>
                    Every engagement operates under contractually defined performance indicators, daily QA calibration, and zero-compromise security protocols.
                  </p>
                </div>

                <div className="svc-dash__sla-items">
                  {svc.slas.map((sla, i) => (
                    <div key={i} className="svc-dash__sla-item">
                      <span className="svc-dash__sla-metric">{sla.metric}</span>
                      <strong className="svc-dash__sla-label">{sla.label}</strong>
                      <span className="svc-dash__sla-detail">{sla.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════════
            5. EXECUTIVE ENGAGEMENT DESK (Bottom Fast-Track Banner)
        ════════════════════════════════════════════════════════════════ */}
        <section className="svc-dash__cta">
          <div className="container">
            <div className="svc-dash__cta-card reveal">
              <div className="svc-dash__cta-content">
                <p className="eyebrow">Initiate Operational Scoping</p>
                <h2>Ready to scale your {svc.shortTitle || svc.title}?</h2>
                <p>
                  Connect directly with our practice leaders in Gurugram and the USA for a structured discovery briefing.
                </p>
              </div>
              <div className="svc-dash__cta-actions">
                <a href="#consultation-form" className="btn btn--gold">
                  Book Strategy Briefing
                </a>
                <a href="tel:+919818224495" className="btn btn--secondary">
                  📞 +91 98182 24495
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ClientScripts />
    </>
  );
}
