import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import ClientScripts from '../../components/ClientScripts';
import MotionProcess from '../../components/MotionProcess';

export const metadata = {
  title: 'Our Process — Reddington Global',
  description: 'Discover our proven four-step operating framework — from discovery to ongoing optimisation — designed for measurable business impact.',
};

export default function ProcessPage() {
  return (
    <>
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

      <main>
        <section className="svc-hero">
          <div className="svc-hero__bg" style={{ backgroundImage: 'url(/assets/img/who-we-are-opt.webp)' }}></div>
          <div className="svc-hero__overlay"></div>
          <div className="container svc-hero__content">
            <p className="eyebrow">How We Work</p>
            <h1 className="svc-hero__title">A clear path to <span className="gold-italic">results.</span></h1>
            <p className="svc-hero__tagline">From discovery to ongoing optimisation, every engagement follows a proven four-step operating framework designed for measurable business impact.</p>
          </div>
        </section>

        <section className="section process" id="process">
          <div className="container">
            <MotionProcess />
          </div>
        </section>

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
                      <span>Gurugram & Sheridan · 24/7 Floor</span>
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
      </main>

      <SiteFooter />
      <button className="totop" id="toTop" aria-label="Back to top">↑</button>
      <ClientScripts />
    </>
  );
}
