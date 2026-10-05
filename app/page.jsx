import ClientScripts from '../components/ClientScripts';
import MotionServices from '../components/MotionServices';
import MotionContact from '../components/MotionContact';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* ══ SVG Gradient Defs (shared across logo instances) ══ */}
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

      <div className="progress" id="progressBar" aria-hidden="true"></div>

      {/* ══════════ NAVIGATION ══════════ */}
      <SiteNav />

      {/* ══════════ SCROLL 1: HERO ══════════ */}
      <section className="hero" id="top">
        <div className="hero__bg" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="hero__video"
          >
            <source src="/assets/video/hero-casual-backup.mp4" type="video/mp4" />
            <source src="/assets/video/hero_casual_backup.mp4" type="video/mp4" />
          </video>
          <div className="hero__veil"></div>
          <svg className="hero__grid" width="100%" height="100%" aria-hidden="true">
            <defs>
              <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(212,159,45,0.08)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container hero__content">
          <p className="eyebrow reveal">Talent · Customer Operations · SaaS Engineering · Statutory Compliance</p>
          <h1 className="hero__title">
            <span className="w">Operational</span>{' '}
            <span className="w">scale,</span>{' '}
            <span className="w">engineered</span>{' '}
            <span className="w">for</span>{' '}
            <span className="w">enterprise.</span>
          </h1>
          <p className="hero__sub reveal">
            From specialized staffing and 24/7 BPO to full-stack digital solutions and statutory tax compliance, we deliver integrated operational muscle to scale your business with confidence.
          </p>
          <div className="hero__cta reveal">
            <a href="#contact" className="btn btn--gold">Consultancy at ₹99</a>
            <a href="#services" className="btn btn--ghost">Explore Services</a>
            <Link href="/bpo-partnerships" className="btn btn--ghost">BPO Partnerships</Link>
          </div>
          <div className="hero__trust reveal">
            <span className="hero__trust-badge">NASSCOM Certified</span>
            <span className="hero__trust-item">GSTN &amp; MCA Ready</span>
            <span className="hero__trust-item">PCI-DSS &amp; AES-256</span>
            <span className="hero__trust-item">Dual-Shore (India &amp; USA)</span>
          </div>
          <div className="hero__stats reveal">
            <div className="stat">
              <span className="stat__num" data-count="20">0</span>
              <span className="stat__suffix">+</span>
              <span className="stat__label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat__num" data-count="3">0</span>
              <span className="stat__suffix"></span>
              <span className="stat__label">Global Delivery Hubs</span>
            </div>
            <div className="stat">
              <span className="stat__num" data-count="24">0</span>
              <span className="stat__suffix">/7</span>
              <span className="stat__label">Continuous Uptime</span>
            </div>
            <div className="stat">
              <span className="stat__num" data-count="100">0</span>
              <span className="stat__suffix">%</span>
              <span className="stat__label">Compliance-First</span>
            </div>
          </div>
        </div>
        <a href="#services" className="hero__scroll" aria-label="Scroll to services"><span></span></a>
      </section>

      {/* ══════════ SCROLL 2: SERVICES ══════════ */}
      <section className="section services" id="services">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">Services &amp; Solutions</p>
            <h2 className="section__title">What we <span className="gold-italic">offer.</span></h2>
            <p className="lead">Enterprise-grade customer care, back-office operations, software engineering, and statutory compliance tailored to high-growth businesses.</p>
          </div>
          <MotionServices />
        </div>
      </section>

      {/* ══════════ SCROLL 3: CLIENTS & ABOUT HIGHLIGHT ══════════ */}
      <section className="clients" aria-label="Trusted by our clients">
        <div className="container clients__head reveal">
          <p className="eyebrow">Trusted By Industry Leaders</p>
          <h2 className="clients__title">Our Clients</h2>
        </div>
        <div className="logo-marquee reveal">
          <div className="logo-marquee__track">
            <span className="logo-chip"><img src="/assets/img/client-finqy.png" alt="FinQy" loading="lazy" /></span>
            <span className="logo-chip"><img src="/assets/img/client-zoftware.png" alt="Zoftware" loading="lazy" /></span>
            <span className="logo-chip"><img src="/assets/img/client-policyx.jpg" alt="PolicyX" loading="lazy" /></span>
            <span className="logo-chip"><img src="/assets/img/client-credilio.svg" alt="Credilio" loading="lazy" /></span>
            <span className="logo-chip"><img src="/assets/img/client-kajaria.png" alt="Kajaria" loading="lazy" /></span>
            <span className="logo-chip"><img src="/assets/img/client-leveldebt.jpg" alt="Level Debt" loading="lazy" /></span>
            <span className="logo-chip"><img src="/assets/img/client-clarit.webp" alt="Clarity" loading="lazy" /></span>

            <span className="logo-chip" aria-hidden="true"><img src="/assets/img/client-finqy.png" alt="" loading="lazy" /></span>
            <span className="logo-chip" aria-hidden="true"><img src="/assets/img/client-zoftware.png" alt="" loading="lazy" /></span>
            <span className="logo-chip" aria-hidden="true"><img src="/assets/img/client-policyx.jpg" alt="" loading="lazy" /></span>
            <span className="logo-chip" aria-hidden="true"><img src="/assets/img/client-credilio.svg" alt="" loading="lazy" /></span>
            <span className="logo-chip" aria-hidden="true"><img src="/assets/img/client-kajaria.png" alt="" loading="lazy" /></span>
            <span className="logo-chip" aria-hidden="true"><img src="/assets/img/client-leveldebt.jpg" alt="" loading="lazy" /></span>
            <span className="logo-chip" aria-hidden="true"><img src="/assets/img/client-clarit.webp" alt="" loading="lazy" /></span>
          </div>
        </div>
      </section>

      {/* ══════════ SCROLL 4: CONTACT & FOOTER ══════════ */}
      <section className="contact-section" id="contact">
        <MotionContact />
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <SiteFooter />

      <button className="totop" id="toTop" aria-label="Back to top">↑</button>

      {/* All client-side interactivity */}
      <ClientScripts />
    </>
  );
}
