import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import ClientScripts from '../../components/ClientScripts';

export const metadata = {
  title: 'FAQ — Reddington Global',
  description: 'Frequently asked questions about Reddington Global services, delivery models, and how we work.',
};

export default function FaqPage() {
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
          <div className="svc-hero__bg" style={{ backgroundImage: 'url(/assets/img/gal-seminar.png)' }}></div>
          <div className="svc-hero__overlay"></div>
          <div className="container svc-hero__content">
            <p className="eyebrow">FAQ</p>
            <h1 className="svc-hero__title">Frequently asked <span className="gold-italic">questions.</span></h1>
            <p className="svc-hero__tagline">Everything you need to know about working with us.</p>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="container">
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
              <details className="faq__item">
                <summary>What makes Reddington different from typical outsourcing firms?</summary>
                <p>We&apos;re an on-site consultancy — not a remote BPO. Our teams embed within your environment, align with your culture, and operate under your brand standards with full compliance coverage.</p>
              </details>
              <details className="faq__item">
                <summary>What kind of reporting and visibility do clients get?</summary>
                <p>We provide real-time dashboards, weekly performance reviews, and monthly strategic reports covering KPIs, quality scores, compliance metrics, and improvement roadmaps.</p>
              </details>
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
