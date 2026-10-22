import { notFound } from 'next/navigation';
import { SERVICES, getServiceBySlug } from '../../../lib/services-data';
import SiteNav from '../../../components/SiteNav';
import SiteFooter from '../../../components/SiteFooter';
import ClientScripts from '../../../components/ClientScripts';
import ServiceLeadForm from '../../../components/ServiceLeadForm';
import ServiceVisualizer from '../../../components/ServiceVisualizer';
import ServiceFaqAccordion from '../../../components/ServiceFaqAccordion';

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
  const svc = getServiceBySlug(params?.slug);
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
        <div className="svc-layout-wrap">
          <div className="svc-layout container">
            {/* ════════════════════════════════════════════════════════════════
                LEFT COLUMN: Comprehensive Content Stream
            ════════════════════════════════════════════════════════════════ */}
            <div className="svc-layout__main">
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

              {/* 1. Hero & Strategic Intro */}
              <section className="svc-intro-sec">
                <div className="svc-dash__pill reveal">
                  <span className="svc-dash__pill-dot"></span>
                  {svc.eyebrow}
                </div>

                <h1 className="svc-dash__title reveal">{svc.title}</h1>
                <p className="svc-dash__tagline reveal">{svc.tagline}</p>
                <p className="svc-dash__overview reveal">{svc.overview}</p>

                {/* Service Architecture Visualizer Canvas */}
                <div className="svc-dash__hero-visualizer reveal">
                  <ServiceVisualizer service={svc} />
                </div>

                {/* Proof Telemetry Stats Bar */}
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
              </section>

              {/* 2. Institutional Trust Pillars Row (matching rgcare .trust-row) */}
              <section className="svc-trust-sec reveal">
                <div className="svc-trust-grid">
                  <div className="svc-trust-item">
                    <span className="svc-trust-icon">⚡</span>
                    <div>
                      <strong>Contractual SLAs</strong>
                      <small>Defined uptime & daily QA metrics</small>
                    </div>
                  </div>
                  <div className="svc-trust-item">
                    <span className="svc-trust-icon">🌐</span>
                    <div>
                      <strong>Dual-Shore Delivery</strong>
                      <small>Gurugram HQ + Global operations</small>
                    </div>
                  </div>
                  <div className="svc-trust-item">
                    <span className="svc-trust-icon">🔒</span>
                    <div>
                      <strong>Zero-Compromise Security</strong>
                      <small>Strict Mutual NDA & ISO protocols</small>
                    </div>
                  </div>
                  <div className="svc-trust-item">
                    <span className="svc-trust-icon">📄</span>
                    <div>
                      <strong>₹99 Strategy Advisory</strong>
                      <small>1-on-1 Senior Director discovery</small>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. The Enterprise Challenge vs. Reddington Solution */}
              {svc.challengeVsSolution && (
                <section className="svc-matrix-sec reveal">
                  <div className="svc-sec-head">
                    <span className="eyebrow">Strategic Analysis</span>
                    <h2 className="svc-sec-title">
                      The Enterprise Bottleneck <span className="gold-italic">vs. Our Engineered Approach.</span>
                    </h2>
                  </div>

                  <div className="svc-matrix-grid">
                    <div className="svc-matrix-card svc-matrix-card--friction">
                      <div className="svc-matrix-badge friction">Industry Operational Bottleneck</div>
                      <h3>Where Typical Deployments Struggle</h3>
                      <p>{svc.challengeVsSolution.challenge}</p>
                    </div>

                    <div className="svc-matrix-card svc-matrix-card--solution">
                      <div className="svc-matrix-badge solution">The Reddington Global Model</div>
                      <h3>How We Architect Success</h3>
                      <p>{svc.challengeVsSolution.solution}</p>
                    </div>

                    <div className="svc-matrix-card svc-matrix-card--impact">
                      <div className="svc-matrix-badge impact">Quantifiable Business Impact</div>
                      <h3>The Bottom-Line Outcome</h3>
                      <p>{svc.challengeVsSolution.impact}</p>
                    </div>
                  </div>
                </section>
              )}

              {/* 4. Core Capabilities & Execution Deliverables */}
              <section className="svc-cap-sec reveal" id="capabilities">
                <div className="svc-sec-head">
                  <span className="eyebrow">Practice Areas & Deliverables</span>
                  <h2 className="svc-sec-title">
                    Core Capabilities & <span className="gold-italic">Execution Deliverables.</span>
                  </h2>
                  <p className="svc-sec-sub">
                    Institutional-grade operational rigor tailored for mid-market and enterprise scale.
                  </p>
                </div>

                <div className="svc-cap-grid">
                  {svc.offerings.map((off, idx) => (
                    <div key={idx} className="svc-cap-card">
                      <div className="svc-cap-top">
                        <span className="svc-cap-num">{off.num}</span>
                        <span className="svc-cap-dot"></span>
                      </div>
                      <h3 className="svc-cap-title">{off.title}</h3>
                      <p className="svc-cap-desc">{off.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. 4-Stage Operational Roadmap (How It Works) */}
              <section className="svc-journey-sec reveal">
                <div className="svc-sec-head">
                  <span className="eyebrow">Engagement Cadence</span>
                  <h2 className="svc-sec-title">
                    How We Execute: <span className="gold-italic">The 4-Stage Roadmap.</span>
                  </h2>
                  <p className="svc-sec-sub">
                    From ₹99 introductory discovery to full-scale production delivery.
                  </p>
                </div>

                <div className="svc-journey-grid">
                  <div className="svc-journey-card">
                    <div className="svc-journey-num">01</div>
                    <h4>Discovery & Audit</h4>
                    <p>1-on-1 strategy session to assess existing bottlenecks, team sizing, and technical requirements.</p>
                    <small>Stage 1 · ₹99 Consultation →</small>
                  </div>
                  <div className="svc-journey-card">
                    <div className="svc-journey-num">02</div>
                    <h4>Solution Architecture</h4>
                    <p>Custom operational roadmap, workflow integration, SLA definitions, and security sign-off.</p>
                    <small>Stage 2 · Governance Blueprint →</small>
                  </div>
                  <div className="svc-journey-card">
                    <div className="svc-journey-num">03</div>
                    <h4>Deployment & Ramp</h4>
                    <p>Dual-shore team mobilization, tooling integration, workflow calibration, and shadow trials.</p>
                    <small>Stage 3 · Live Deployment →</small>
                  </div>
                  <div className="svc-journey-card">
                    <div className="svc-journey-num">04</div>
                    <h4>SLA Optimization</h4>
                    <p>Continuous QA audits, bi-weekly leadership reviews, and proactive scaling governance.</p>
                    <small>Stage 4 · Ongoing Calibration →</small>
                  </div>
                </div>
              </section>

              {/* 6. Institutional SLAs & Governance Benchmarks */}
              {svc.slas && svc.slas.length > 0 && (
                <section className="svc-sla-sec reveal">
                  <div className="svc-sla-box">
                    <div className="svc-sla-intro">
                      <span className="eyebrow">Institutional Governance</span>
                      <h3>Service Level Agreements & Quality Commitments</h3>
                      <p>
                        Every engagement operates under contractually defined performance indicators, daily QA calibration, and zero-compromise security protocols.
                      </p>
                    </div>

                    <div className="svc-sla-items">
                      {svc.slas.map((sla, i) => (
                        <div key={i} className="svc-sla-item">
                          <span className="svc-sla-metric">{sla.metric}</span>
                          <strong className="svc-sla-label">{sla.label}</strong>
                          <span className="svc-sla-detail">{sla.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* 7. Frequently Asked Questions Accordion */}
              <section className="svc-faq-sec reveal" id="faqs">
                <div className="svc-sec-head">
                  <span className="eyebrow">Executive Clarity</span>
                  <h2 className="svc-sec-title">Questions Before You Begin?</h2>
                  <p className="svc-sec-sub">
                    Everything you need to know about our ₹99 introductory advisory, onboarding timeline, and SLA governance.
                  </p>
                </div>

                <ServiceFaqAccordion service={svc} />
              </section>

              {/* 8. Institutional Verification & Headquarters Notice */}
              <section className="svc-verify-sec reveal">
                <div className="svc-verify-card">
                  <div className="svc-verify-icon">✓</div>
                  <div className="svc-verify-text">
                    <strong>Institutional Verification & Compliance Notice</strong>
                    <p>
                      Reddington Global Consultancy Pvt Ltd (RGC) operates from 750 Udyog Vihar Phase 5, Sector 19, Gurugram, Haryana 122016, India. All consultation bookings generate an automated GST-compliant tax invoice. All client data and IP are strictly protected under mutual non-disclosure agreements (NDA).
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                RIGHT COLUMN: Sticky Consultation & Payment Form Card
                (Remains sticky throughout the entire page scroll!)
            ════════════════════════════════════════════════════════════════ */}
            <aside className="svc-layout__side" id="consultation-form-wrap">
              <div className="svc-sticky-card">
                <div className="svc-sticky-card__top">
                  <span className="svc-sticky-card__badge">Priority Direct Desk • ₹99</span>
                  <span className="svc-sticky-card__status">
                    <span className="svc-sticky-card__status-dot"></span> Active Slots Available
                  </span>
                </div>

                <ServiceLeadForm serviceTitle={svc.title} serviceSlug={svc.slug} />

                {/* Direct WhatsApp Fast-Track */}
                <div className="svc-sticky-card__footer">
                  <a
                    href={`https://wa.me/919818224995?text=${encodeURIComponent(`Hi Reddington Global, I am inquiring about ${svc.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="svc-sticky-card__wa-link"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Fast-Track via WhatsApp (+91 98182 24995)
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Mobile Sticky Bottom CTA */}
        <div className="svc-mobile-sticky-bar">
          <div className="svc-mobile-sticky-bar__info">
            <strong>{svc.shortTitle || svc.title}</strong>
            <span>1-on-1 Strategy Session • ₹99</span>
          </div>
          <a href="#consultation-form" className="btn btn--gold svc-mobile-sticky-bar__btn">
            Book @ ₹99 &rarr;
          </a>
        </div>
      </main>

      <SiteFooter />
      <ClientScripts />
    </>
  );
}
