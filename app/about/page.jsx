import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import ClientScripts from '../../components/ClientScripts';
import MotionAbout from '../../components/MotionAbout';

export const metadata = {
  title: 'About Us — Reddington Global',
  description: 'Learn about Reddington Global — specialized talent, 24/7 BPO operations, SaaS engineering, and statutory financial compliance under one unified partner.',
};

export default function AboutPage() {
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
            <p className="eyebrow">Who We Are</p>
            <h1 className="svc-hero__title">Integrated execution with an <span className="gold-italic">enterprise edge.</span></h1>
            <p className="svc-hero__tagline">Reddington Global provides the operational backbone, technology integration, and compliance muscle for scaling businesses.</p>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container about__grid">
            <div className="about__left reveal">
              <h2 className="section__title">Decades of operational <span className="gold-italic">leadership.</span></h2>
              <p className="lead">Backed by decades of operational leadership and long-standing client relationships, we help businesses unlock durable value through practical, high-impact consultancy.</p>
              <p className="muted">We partner with small to middle-market organisations to improve outcomes through operational intelligence, compliance, and quality assurance delivered as one integrated model.</p>
              <a href="/contact" className="link-arrow">Start a conversation <span aria-hidden="true">→</span></a>
              <figure className="about__photo img-reveal">
                <img src="/assets/img/who-we-are-opt.webp" alt="The Reddington Global team at work" loading="lazy" />
              </figure>
            </div>
            <MotionAbout />
          </div>
        </section>
      </main>

      <SiteFooter />
      <button className="totop" id="toTop" aria-label="Back to top">↑</button>
      <ClientScripts />
    </>
  );
}
