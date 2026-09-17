import ClientScripts from '../components/ClientScripts';
import MotionTeam from '../components/MotionTeam';
import MotionServices from '../components/MotionServices';
import MotionAbout from '../components/MotionAbout';
import MotionContact from '../components/MotionContact';
import MotionProcess from '../components/MotionProcess';

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
      <header className="nav" id="nav">
        <div className="container nav__inner">
          <div className="nav__brand-group">
            <a href="#top" className="nav__brand" aria-label="Reddington Global Consultancy home">
              <img src="/assets/img/rgc-logo.png" alt="Reddington Global" className="logo-img" />
            </a>
            <span className="nav__brand-text">
              <span className="nav__brand-line">REDDINGTON GLOBAL</span>
              <span className="nav__brand-line nav__brand-line--sub">CONSULTANCY</span>
            </span>
          </div>
          <nav className="nav__links" id="navLinks" aria-label="Primary">
            <a href="/about">Who We Are</a>
            <div className="nav__dropdown" id="navServicesDropdown">
              <a href="#services" className="nav__dropdown-toggle" aria-expanded="false" aria-haspopup="true">
                Services <span className="nav__dropdown-arrow" aria-hidden="true">▾</span>
              </a>
              <ul className="nav__dropdown-menu" role="menu">
                <li role="none"><a href="/services/financial-services" role="menuitem">Financial Services</a></li>
                <li role="none"><a href="/services/recruitment" role="menuitem">Recruitment and Staffing Services</a></li>
                <li role="none"><a href="/services/immergix-bpo" role="menuitem">IMMERGIX BPO</a></li>
                <li role="none"><a href="/services/management-consultancy" role="menuitem">Management Consultancy</a></li>
                <li role="none"><a href="/services/retail" role="menuitem">Retail Requirements</a></li>
                <li role="none"><a href="/services/performance-management" role="menuitem">Performance Management</a></li>
                <li role="none"><a href="/services/contact-centre" role="menuitem">On-Site Contact Centre</a></li>
              </ul>
            </div>
            <a href="/process">Our Edge</a>
            <a href="/team">Team</a>
            <a href="/testimonials">Testimonials</a>
            <a href="/contact" className="btn btn--gold btn--sm">Book Consultation</a>
          </nav>
          <button className="nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section className="hero" id="top">
        <div className="hero__bg" aria-hidden="true">
          <video className="hero__video" autoPlay muted loop playsInline poster="/assets/img/hero-poster.png">
            <source src="/assets/video/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero__veil"></div>
          <div className="hero__orb hero__orb--1"></div>
          <div className="hero__orb hero__orb--2"></div>
          <div className="hero__orb hero__orb--3"></div>
          <div className="hero__glow" id="heroGlow"></div>
          <svg className="hero__grid" width="100%" height="100%" aria-hidden="true">
            <defs>
              <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(200,169,126,0.07)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container hero__content">
          <p className="eyebrow reveal">RG Consultancy · Reddington Group Inc · RG Care</p>
          <h1 className="hero__title">
            <span className="w">Consulting</span>{' '}
            <span className="w">that</span>{' '}
            <span className="w">moves</span>{' '}
            <span className="w gold-italic">business</span>{' '}
            <span className="w">forward.</span>
          </h1>
          <p className="hero__sub reveal">
            From recruitment and performance management to fully managed on-site contact centres, we help small and middle-market businesses streamline operations, scale with confidence, and improve measurable returns.
          </p>
          <div className="hero__cta reveal">
            <a href="#contact" className="btn btn--gold">Get a Free Consultation</a>
            <a href="#services" className="btn btn--ghost">Explore Services</a>
          </div>
          <div className="hero__trust reveal">
            <span className="hero__trust-badge">NASSCOM Certified</span>
            <span className="hero__trust-sep" aria-hidden="true">·</span>
            <span>Trusted by Airtel, Kajaria, Credilio &amp; more</span>
            <span className="hero__trust-sep" aria-hidden="true">·</span>
            <span>India &amp; USA Operations</span>
          </div>
          <div className="hero__stats reveal">
            <div className="stat">
              <span className="stat__num" data-count="20">0</span>
              <span className="stat__suffix">+</span>
              <span className="stat__label">Years of Operational Experience</span>
            </div>
            <div className="stat">
              <span className="stat__num" data-count="3">0</span>
              <span className="stat__suffix"></span>
              <span className="stat__label">Global Presence Across India &amp; USA</span>
            </div>
            <div className="stat">
              <span className="stat__num" data-count="24">0</span>
              <span className="stat__suffix">/7</span>
              <span className="stat__label">Service Excellence, Round the Clock</span>
            </div>
            <div className="stat">
              <span className="stat__num" data-count="100">0</span>
              <span className="stat__suffix">%</span>
              <span className="stat__label">Compliance-First Delivery</span>
            </div>
          </div>
        </div>
        <a href="#about" className="hero__scroll" aria-label="Scroll to content"><span></span></a>
      </section>

      {/* ══════════ CAPABILITY MARQUEE ══════════ */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          <span className="marquee__word">Recruitment</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Performance Management</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Financial Services</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Contact Centres</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Compliance &amp; QA</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Retail Operations</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Recruitment</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Performance Management</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Financial Services</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Contact Centres</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Compliance &amp; QA</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Retail Operations</span><span className="marquee__dot">/</span>
        </div>
      </div>

      {/* ══════════ ABOUT ══════════ */}
      <section className="section about" id="about">
        <div className="container about__grid">
          <div className="about__left reveal">
            <p className="eyebrow">Who We Are</p>
            <h2 className="section__title">An on-site model with a clear <span className="gold-italic">strategic edge.</span></h2>
            <p className="lead">Reddington Global&apos;s on-site consultancy centre is built for execution at enterprise standards. Backed by decades of operational leadership and long-standing client relationships, we help businesses unlock durable value through practical, high-impact consultancy.</p>
            <p className="muted">We partner with small to middle-market organisations to improve outcomes through operational intelligence, compliance, and quality assurance delivered as one integrated model.</p>
            <a href="#contact" className="link-arrow">Start a conversation <span aria-hidden="true">→</span></a>
            <figure className="about__photo img-reveal">
              <img src="/assets/img/who-we-are.png" alt="The Reddington Global team at work" loading="lazy" />
            </figure>
          </div>
          <MotionAbout />
        </div>
      </section>

      {/* ══════════ CLIENTS ══════════ */}
      <section className="clients" aria-label="Trusted by our clients">
        <div className="container clients__head reveal">
          <p className="eyebrow">Trusted By</p>
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

      {/* ══════════ SERVICES ══════════ */}
      <section className="section services" id="services">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">Services &amp; Solutions</p>
            <h2 className="section__title">What we <span className="gold-italic">offer.</span></h2>
          </div>
          <MotionServices />
        </div>
      </section>

      {/* ══════════ PROCESS / HOW WE WORK ══════════ */}
      <section className="section process" id="process">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">How We Work</p>
            <h2 className="section__title">A clear path to <span className="gold-italic">results.</span></h2>
            <p className="lead">From discovery to ongoing optimisation, every engagement follows a proven four-step operating framework designed for measurable business impact.</p>
          </div>
          <MotionProcess />
        </div>
      </section>

      {/* ══════════ EDGE / WHY US ══════════ */}
      <section className="section edge" id="edge">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">Why Reddington</p>
            <h2 className="section__title">Bring these strengths together, and you <span className="gold-italic">outperform the ordinary.</span></h2>
          </div>
          <div className="edge__layout">
            <div className="edge__media reveal" aria-hidden="true">
              <img className="edge__photo edge__photo--1" src="/assets/img/gal-seminar.png" alt="" loading="lazy" />
              <img className="edge__photo edge__photo--2" src="/assets/img/group.png" alt="" loading="lazy" />
              <img className="edge__photo edge__photo--3" src="/assets/img/gal-talking.png" alt="" loading="lazy" />
              <div className="edge__badge">
                <span className="edge__badge-num">24/7</span>
                <span className="edge__badge-label">On-site excellence</span>
              </div>
            </div>
            <div className="edge__grid">
              <div className="edge__item reveal"><span className="edge__num">01</span><div><h3>Cost Efficiency</h3><p>Lower infrastructure and overhead costs translated into commercially efficient delivery through a high-performing on-site team.</p></div></div>
              <div className="edge__item reveal"><span className="edge__num">02</span><div><h3>Built-In Security</h3><p>From confidentiality protocols to cyber-risk controls, security is embedded into every layer of execution.</p></div></div>
              <div className="edge__item reveal"><span className="edge__num">03</span><div><h3>Precision Staffing</h3><p>Specialist teams aligned to your operating model, designed to elevate customer experience beyond local constraints.</p></div></div>
              <div className="edge__item reveal"><span className="edge__num">04</span><div><h3>Higher Productivity</h3><p>Our on-site contact centre operations help organisations increase throughput, quality, and consistency across teams.</p></div></div>
              <div className="edge__item reveal"><span className="edge__num">05</span><div><h3>Operational Flexibility</h3><p>Built for seamless 24/7 coverage with adaptable execution models that evolve with your business requirements.</p></div></div>
              <div className="edge__item reveal"><span className="edge__num">06</span><div><h3>Stronger Customer Relationships</h3><p>Durable customer loyalty developed through consistent support, faster resolution cycles, and dependable service standards.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TEAM ══════════ */}
      <section className="section team" id="team">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">Leadership</p>
            <h2 className="section__title"><span className="gold-italic">Founders.</span></h2>
          </div>
          <MotionTeam />
        </div>
      </section>

      {/* ══════════ PROJECTS & LIFE AT REDDINGTON ══════════ */}
      <section className="section projects" id="projects" aria-label="Recent projects and life at Reddington Global">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">Projects</p>
            <h2 className="section__title">Execution stories from <span className="gold-italic">real operations.</span></h2>
            <p className="lead">A snapshot of how our teams collaborate, deploy, and scale delivery environments for client-facing operations.</p>
          </div>
          <div className="projects__grid reveal">
            <article className="project-card">
              <img src="/assets/img/gal-seminar.png" alt="Team seminar at Reddington Global" loading="lazy" />
              <div className="project-card__body">
                <h3>Operational Workshops</h3>
                <p>Structured strategy sessions that align teams on delivery standards, workflows, and performance goals.</p>
              </div>
            </article>
            <article className="project-card">
              <img src="/assets/img/gal-hiring.jpg" alt="Interviewing new talent" loading="lazy" />
              <div className="project-card__body">
                <h3>Talent Acquisition</h3>
                <p>Focused recruitment and onboarding initiatives designed to build role-ready teams quickly and reliably.</p>
              </div>
            </article>
            <article className="project-card">
              <img src="/assets/img/gal-staffing.jpg" alt="Staffing consultation" loading="lazy" />
              <div className="project-card__body">
                <h3>On-Site Delivery Setup</h3>
                <p>End-to-end launch support across staffing, process management, and customer experience operations.</p>
              </div>
            </article>
          </div>
        </div>

        <div className="gallery" aria-label="Life at Reddington Global">
          <div className="gallery__track">
            <img src="/assets/img/gal-seminar.png" alt="Team seminar at Reddington Global" loading="lazy" />
            <img src="/assets/img/gal-hiring.jpg" alt="Interviewing new talent" loading="lazy" />
            <img src="/assets/img/group.png" alt="Team gathering" loading="lazy" />
            <img src="/assets/img/gal-staffing.jpg" alt="Staffing consultation" loading="lazy" />
            <img src="/assets/img/gal-talking.png" alt="Colleagues in conversation" loading="lazy" />
            <img src="/assets/img/gal-walking.png" alt="On the move at the office" loading="lazy" />
            <img src="/assets/img/gal-seminar.png" alt="" loading="lazy" />
            <img src="/assets/img/gal-hiring.jpg" alt="" loading="lazy" />
            <img src="/assets/img/group.png" alt="" loading="lazy" />
            <img src="/assets/img/gal-staffing.jpg" alt="" loading="lazy" />
            <img src="/assets/img/gal-talking.png" alt="" loading="lazy" />
            <img src="/assets/img/gal-walking.png" alt="" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="section testimonials" id="testimonials">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">Testimonials</p>
            <h2 className="section__title">Trusted by leaders we <span className="gold-italic">work with.</span></h2>
          </div>
          <div className="tslider reveal" id="tslider">
            <div className="tslider__track" id="tsliderTrack">
              <blockquote className="tcard">
                <div className="tcard__stars" aria-label="5 stars">★★★★★</div>
                <p>&ldquo;Reddington consistently demonstrates professionalism and innovation. Their disciplined execution makes them a trusted partner across every engagement.&rdquo;</p>
                <footer><cite><span className="tcard__name">Parveen</span><span className="tcard__role">Director, Operations</span></cite></footer>
              </blockquote>
              <blockquote className="tcard">
                <div className="tcard__stars" aria-label="5 stars">★★★★★</div>
                <p>&ldquo;My team and I believe personalised video experiences are essential for trusted relationships, and Reddington is helping us deliver that impact at scale.&rdquo;</p>
                <footer><cite><span className="tcard__name">Joe</span><span className="tcard__role">VP Customer Success</span></cite></footer>
              </blockquote>
              <blockquote className="tcard">
                <div className="tcard__stars" aria-label="5 stars">★★★★★</div>
                <p>&ldquo;Reddington provided exceptional strategic guidance, strengthening our digital approach and significantly elevating our online brand presence.&rdquo;</p>
                <footer><cite><span className="tcard__name">Chiranjib</span><span className="tcard__role">Head of Digital, Enterprise</span></cite></footer>
              </blockquote>
            </div>
            <div className="tslider__nav">
              <button id="tPrev" aria-label="Previous testimonial">←</button>
              <div className="tslider__dots" id="tDots"></div>
              <button id="tNext" aria-label="Next testimonial">→</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="section faq" id="faq" aria-label="Frequently asked questions">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">FAQ</p>
            <h2 className="section__title">Frequently asked <span className="gold-italic">questions.</span></h2>
          </div>
          <div className="faq__list reveal">
            <details className="faq__item">
              <summary>Which industries do you primarily support?</summary>
              <p>We support organisations across financial services, retail, contact centre operations, and growth-stage enterprises that require structured operational scale.</p>
            </details>
            <details className="faq__item">
              <summary>Can you provide on-site and managed delivery models?</summary>
              <p>Yes. Through Reddington Global, we deliver both embedded on-site teams and managed operations tailored to your business structure.</p>
            </details>
            <details className="faq__item">
              <summary>How quickly can a project be initiated?</summary>
              <p>Project timelines depend on scope, staffing needs, and integration requirements. Following discovery, we provide a clear launch roadmap with milestones.</p>
            </details>
            <details className="faq__item">
              <summary>Do you support India and international operations?</summary>
              <p>Yes. We currently operate across India and the USA, with leadership experience supporting broader international delivery environments.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section className="contact-section" id="contact">
        <MotionContact />
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <img src="/assets/img/rgc-logo.png" alt="Reddington Global" className="logo-img logo-img--footer" />
            <p>We partner with small to middle-market businesses to improve performance, strengthen customer operations, and drive sustainable growth.</p>
            <div className="footer__cert">
              <span>Certified by</span>
              <img src="/assets/img/nasscom.png" alt="NASSCOM" loading="lazy" />
            </div>
          </div>
          <nav className="footer__col" aria-label="Useful links">
            <h4>Useful Links</h4>
            <a href="/about">About Us</a>
            <a href="#services">Our Services</a>
            <a href="/team">Our Team</a>
            <a href="/contact">Consultation</a>
          </nav>
          <nav className="footer__col" aria-label="Company">
            <h4>Company</h4>
            <a href="/testimonials">Testimonials</a>
            <a href="/process">Why Us</a>
            <a href="/faq">FAQ</a>
            <a href="/contact">Contact Us</a>
          </nav>
          <div className="footer__col">
            <h4>Contact</h4>
            <a href="mailto:sales@reddingtonglobal.com">sales@reddingtonglobal.com</a>
            <a href="tel:+919818224495">+91 98182 24495</a>
            <a href="tel:+19497794978">+1 (949) 779-4978</a>
          </div>
        </div>
        <div className="container footer__bar">
          <p>© 2026 Reddington Global. All rights reserved.</p>
          <div className="footer__social">
            <a href="https://www.linkedin.com/company/immergixthefuture/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social-link">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="mailto:sales@reddingtonglobal.com" aria-label="Email us" className="footer__social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/></svg>
            </a>
          </div>
          <p className="footer__tagline">RG Consultancy · Reddington Group Inc · RG Care Foundation</p>
        </div>
      </footer>

      <button className="totop" id="toTop" aria-label="Back to top">↑</button>

      {/* All client-side interactivity */}
      <ClientScripts />
    </>
  );
}
