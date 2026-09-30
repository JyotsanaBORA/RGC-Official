import ClientScripts from '../components/ClientScripts';
import MotionTeam from '../components/MotionTeam';
import MotionServices from '../components/MotionServices';
import MotionAbout from '../components/MotionAbout';
import MotionContact from '../components/MotionContact';
import MotionProcess from '../components/MotionProcess';
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

      {/* ══════════ HERO ══════════ */}
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
            <a href="#contact" className="btn btn--gold">Get a Free Consultation</a>
            <a href="#services" className="btn btn--ghost">Explore Services</a>
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
          <span className="marquee__word">Recruitment &amp; Staffing</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Immergix BPO</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Performance Management Consultancy</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Payroll &amp; Compensation</span><span className="marquee__dot">/</span>
          <span className="marquee__word">SaaS &amp; Digital Solutions</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Bookkeeping &amp; Statutory Compliance</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Recruitment &amp; Staffing</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Immergix BPO</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Performance Management Consultancy</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Payroll &amp; Compensation</span><span className="marquee__dot">/</span>
          <span className="marquee__word">SaaS &amp; Digital Solutions</span><span className="marquee__dot">/</span>
          <span className="marquee__word">Bookkeeping &amp; Statutory Compliance</span><span className="marquee__dot">/</span>
        </div>
      </div>

      {/* ══════════ ABOUT ══════════ */}
      <section className="section about" id="about">
        <div className="container about__grid">
          <div className="about__left reveal">
            <p className="eyebrow">Who We Are</p>
            <h2 className="section__title">An integrated model with a clear <span className="gold-italic">strategic edge.</span></h2>
            <p className="lead">Reddington Global is built for execution at enterprise standards. Backed by executive leadership with decades of operational mastery and global credentials, we combine specialized talent, customer operations, digital solutions, and statutory compliance into one integrated scaling partner.</p>
            <p className="muted">We partner with growth-stage enterprises and middle-market organizations to improve outcomes through operational intelligence, technological integration, and audit-ready governance.</p>
            <a href="#contact" className="link-arrow">Start a conversation <span aria-hidden="true">→</span></a>
            <figure className="about__photo img-reveal">
              <img src="/assets/img/who-we-are-opt.webp" alt="Reddington Global leadership strategy briefing" loading="lazy" />
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
              <div className="edge__blueprint">
                <div className="edge__blueprint-header">
                  <div className="edge__blueprint-tag">Operating Architecture</div>
                  <span className="edge__blueprint-pill">Dual-Shore Network</span>
                </div>

                <div className="edge__blueprint-flow">
                  <div className="edge__blueprint-node">
                    <span className="node-icon">🏢</span>
                    <div className="node-info">
                      <strong>Client Headquarters</strong>
                      <span>US · UK · Canada · Global</span>
                    </div>
                  </div>
                  <div className="edge__blueprint-connector">
                    <span className="connector-line"></span>
                    <span className="connector-badge">AES-256 Bridge</span>
                  </div>
                  <div className="edge__blueprint-node edge__blueprint-node--rg">
                    <span className="node-icon">⚡</span>
                    <div className="node-info">
                      <strong>Reddington Delivery Hub</strong>
                      <span>Gurugram &amp; Sheridan · 24/7 Floor</span>
                    </div>
                  </div>
                </div>

                <div className="edge__blueprint-stats">
                  <div className="bp-stat">
                    <span className="bp-stat__val">99.8%</span>
                    <span className="bp-stat__lbl">SLA Precision</span>
                  </div>
                  <div className="bp-stat">
                    <span className="bp-stat__val">24/7</span>
                    <span className="bp-stat__lbl">Continuous Uptime</span>
                  </div>
                  <div className="bp-stat">
                    <span className="bp-stat__val">100%</span>
                    <span className="bp-stat__lbl">Audit Compliance</span>
                  </div>
                </div>

                <div className="edge__blueprint-footer">
                  <span className="status-dot"></span>
                  <span>Active Institutional Delivery Pipeline</span>
                </div>
              </div>
            </div>
            <div className="edge__grid">
              <div className="edge__item reveal"><span className="edge__num">01</span><div><h3>Cost Efficiency</h3><p>Lower infrastructure and overhead costs translated into commercially efficient delivery through high-performing specialized teams.</p></div></div>
              <div className="edge__item reveal"><span className="edge__num">02</span><div><h3>Built-In Security</h3><p>From confidentiality protocols to cyber-risk controls, security is embedded into every layer of execution.</p></div></div>
              <div className="edge__item reveal"><span className="edge__num">03</span><div><h3>Precision Staffing</h3><p>Specialist teams aligned to your operating model, designed to elevate customer experience beyond local constraints.</p></div></div>
              <div className="edge__item reveal"><span className="edge__num">04</span><div><h3>Higher Productivity</h3><p>Integrated delivery across BPO, digital systems, and financial back-office operations helps organizations increase throughput, quality, and consistency.</p></div></div>
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
            <p className="eyebrow">Executive Leadership</p>
            <h2 className="section__title">Led by builders & <span className="gold-italic">enterprise operators.</span></h2>
            <p className="lead">Decades of operational scale, executive talent acquisition, and institutional advisory.</p>
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
              <img src="/assets/img/svc-bpo-opt.webp" alt="24/7 Enterprise BPO Operations Floor" loading="lazy" />
              <div className="project-card__body">
                <h3>24/7 Operations Command</h3>
                <p>Real-time queue monitoring, floor supervision, and KPI tracking calibrated for high-volume enterprise SLAs.</p>
              </div>
            </article>
            <article className="project-card">
              <img src="/assets/img/svc-saas-opt.webp" alt="Cloud Architecture & Digital Solutions" loading="lazy" />
              <div className="project-card__body">
                <h3>Cloud Systems &amp; SaaS Delivery</h3>
                <p>Full-stack web engineering, resilient REST/GraphQL API fabrics, and microservices automated for high concurrency.</p>
              </div>
            </article>
            <article className="project-card">
              <img src="/assets/img/svc-performance-opt.webp" alt="Operational KPI Intelligence" loading="lazy" />
              <div className="project-card__body">
                <h3>Quality &amp; Process Governance</h3>
                <p>Structured QA frameworks, compliance audits, and daily performance calibration to eliminate delivery friction.</p>
              </div>
            </article>
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

      {/* ══════════ CONTACT ══════════ */}
      <section className="contact-section" id="contact">
        <MotionContact />
      </section>

      {/* ══════════ FAQ (LAST SECTION) ══════════ */}
      <section className="section faq" id="faq" aria-label="Frequently asked questions">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">FAQ</p>
            <h2 className="section__title">Frequently asked <span className="gold-italic">questions.</span></h2>
          </div>
          <div className="faq__list reveal">
            <details className="faq__item">
              <summary>Which industries do you primarily support?</summary>
              <p>We support organisations across contact centre operations, SaaS and technology enterprises, recruitment and staffing, and growth-stage businesses that require structured operational and financial scale.</p>
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

      {/* ══════════ FOOTER ══════════ */}
      <SiteFooter />

      <button className="totop" id="toTop" aria-label="Back to top">↑</button>

      {/* All client-side interactivity */}
      <ClientScripts />
    </>
  );
}
