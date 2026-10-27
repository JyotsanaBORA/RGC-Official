'use client';

import Link from 'next/link';
import { SERVICES } from '../lib/services-data';
import { trackContactClick } from '../lib/analytics/events';

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
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
        </nav>
        <nav className="footer__col" aria-label="Services">
          <h4>Services</h4>
          {SERVICES.map(s => (
            <Link key={s.slug} href={`/services/${s.slug}`} target="_blank" rel="noopener noreferrer">{s.title}</Link>
          ))}
        </nav>
        <div className="footer__col">
          <h4>Contact</h4>
          <a
            href="mailto:sales@reddingtonglobal.com"
            onClick={() => trackContactClick('email', 'sales@reddingtonglobal.com')}
          >
            sales@reddingtonglobal.com
          </a>
          <a
            href="tel:+919818224995"
            onClick={() => trackContactClick('phone', '+919818224995')}
          >
            +91 98182 24995
          </a>
        </div>
      </div>
      <div className="container footer__bar">
        <p>© 2026 Reddington Global. All rights reserved.</p>
        <nav className="footer__legal" aria-label="Legal">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
        </nav>
        <div className="footer__social">
          <a
            href="https://www.linkedin.com/company/reddington-global-consultancy-pvt-ltd/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="footer__social-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
          </a>
          <a
            href="https://www.facebook.com/p/Reddington-Global-Consultancy-Pvt-Ltd-61593446227660/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Meta / Facebook"
            className="footer__social-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a
            href="https://instagram.com/reddingtonglobalconsultancy?xtok=aHo4bjlkaXc0dm0%3D"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="footer__social-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </div>
        <p className="footer__tagline">RG Consultancy · Reddington Group Inc · RG Care Foundation</p>
      </div>
    </footer>
  );
}
