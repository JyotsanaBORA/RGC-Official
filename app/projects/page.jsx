import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import ClientScripts from '../../components/ClientScripts';

export const metadata = {
  title: 'Projects — Reddington Global',
  description: 'Execution stories from real operations — see how our teams collaborate, deploy, and scale delivery environments.',
};

export default function ProjectsPage() {
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
          <div className="svc-hero__bg" style={{ backgroundImage: 'url(/assets/img/svc-bpo-opt.webp)' }}></div>
          <div className="svc-hero__overlay"></div>
          <div className="container svc-hero__content">
            <p className="eyebrow">Projects</p>
            <h1 className="svc-hero__title">Execution stories from <span className="gold-italic">real operations.</span></h1>
            <p className="svc-hero__tagline">A snapshot of how our teams collaborate, deploy, and scale delivery environments for client-facing operations.</p>
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="container">
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
                <img src="/assets/img/svc-compliance-opt.webp" alt="Operational Compliance & Audit Governance" loading="lazy" />
                <div className="project-card__body">
                  <h3>Regulatory &amp; Statutory Governance</h3>
                  <p>Multi-jurisdiction tax and ledger reconciliation frameworks ensuring zero-penalty operational compliance.</p>
                </div>
              </article>
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
