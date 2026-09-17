import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import ClientScripts from '../../components/ClientScripts';
import MotionContact from '../../components/MotionContact';

export const metadata = {
  title: 'Contact Us — Reddington Global',
  description: 'Get in touch with Reddington Global for a free consultation. Offices in India and USA.',
};

export default function ContactPage() {
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
          <div className="svc-hero__bg" style={{ backgroundImage: 'url(/assets/img/gal-talking.png)' }}></div>
          <div className="svc-hero__overlay"></div>
          <div className="container svc-hero__content">
            <p className="eyebrow">Get In Touch</p>
            <h1 className="svc-hero__title">Let&apos;s start a <span className="gold-italic">conversation.</span></h1>
            <p className="svc-hero__tagline">Whether you need a consultation, a proposal, or just want to explore how we can help — we&apos;re ready.</p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <MotionContact />
        </section>
      </main>

      <SiteFooter />
      <button className="totop" id="toTop" aria-label="Back to top">↑</button>
      <ClientScripts />
    </>
  );
}
