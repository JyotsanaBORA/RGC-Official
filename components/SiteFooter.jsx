import Link from 'next/link';
import { SERVICES } from '../lib/services-data';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/assets/img/rgc-logo-opt.png" alt="Reddington Global" className="logo-img logo-img--footer" />
          <p>We focus on the needs of small to middle-market businesses to improve and grow their return.</p>
          <div className="footer__cert">
            <span>Certified by</span>
            <img src="/assets/img/nasscom.png" alt="NASSCOM" loading="lazy" />
          </div>
        </div>
        <nav className="footer__col" aria-label="Useful links">
          <h4>Useful Links</h4>
          <Link href="/about">About Us</Link>
          <Link href="/bpo-partnerships">BPO Partnerships</Link>
          <Link href="/#services">Our Services</Link>
          <Link href="/team">Our Team</Link>
          <Link href="/careers">Careers</Link>
        </nav>
        <nav className="footer__col" aria-label="Services">
          <h4>Services</h4>
          {SERVICES.map(s => (
            <Link key={s.slug} href={`/services/${s.slug}`} target="_blank" rel="noopener noreferrer">{s.title}</Link>
          ))}
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
          <a href="https://www.linkedin.com/company/reddingtonglobal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="mailto:sales@reddingtonglobal.com" aria-label="Email us" className="footer__social-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/></svg>
          </a>
        </div>
        <p className="footer__tagline">RG Consultancy · Reddington Group Inc · RG Care Foundation</p>
      </div>
    </footer>
  );
}
