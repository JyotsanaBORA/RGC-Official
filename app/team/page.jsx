import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import ClientScripts from '../../components/ClientScripts';
import MotionTeam from '../../components/MotionTeam';

export const metadata = {
  title: 'Our Team — Reddington Global',
  description: 'Meet the leadership team at Reddington Global — experienced operators driving performance, compliance, and operational excellence.',
};

export default function TeamPage() {
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
          <div className="svc-hero__bg" style={{ backgroundImage: 'url(/assets/img/group.png)' }}></div>
          <div className="svc-hero__overlay"></div>
          <div className="container svc-hero__content">
            <p className="eyebrow">Leadership</p>
            <h1 className="svc-hero__title">Meet the <span className="gold-italic">team.</span></h1>
            <p className="svc-hero__tagline">Experienced operators driving performance, compliance, and operational excellence across every engagement.</p>
          </div>
        </section>

        <section className="section team" id="team">
          <div className="container">
            <MotionTeam />
          </div>
        </section>
      </main>

      <SiteFooter />
      <button className="totop" id="toTop" aria-label="Back to top">↑</button>
      <ClientScripts />
    </>
  );
}
