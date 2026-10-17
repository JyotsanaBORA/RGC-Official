import ClientScripts from '../components/ClientScripts';
import MotionServices from '../components/MotionServices';
import GlobalDeliveryTree from '../components/GlobalDeliveryTree';
import MotionContact from '../components/MotionContact';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

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
        <h1 className="sr-only">Reddington Global — Operational Scale, Engineered for Enterprise</h1>
        <div className="hero__bg" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="hero__video"
          >
            <source src="/assets/video/Hero-Services-RGC.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ══════════ STATS STRIP (BELOW HERO VIDEO) ══════════ */}
      <section className="hero-stats-strip" aria-label="Key Performance Metrics">
        <div className="container">
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
      </section>

      {/* ══════════ SCROLL 2: SERVICES ══════════ */}
      <section className="section services" id="services">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">Services & Solutions</p>
            <h2 className="section__title">What we <span className="gold-italic">offer.</span></h2>
            <p className="lead">Enterprise-grade customer care, back-office operations, software engineering, and statutory compliance tailored to high-growth businesses.</p>
          </div>
          <MotionServices />
          <GlobalDeliveryTree />
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
