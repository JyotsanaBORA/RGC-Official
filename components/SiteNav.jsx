import Link from 'next/link';
import { SERVICES } from '../lib/services-data';

export default function SiteNav() {
  const colTalentOps = SERVICES.filter(s =>
    ['recruitment', 'immergix-bpo', 'performance-management-consultancy'].includes(s.slug)
  );
  const colTechFinance = SERVICES.filter(s =>
    ['saas-digital-solutions', 'payroll-compensation', 'bookkeeping-statutory-compliance'].includes(s.slug)
  );

  return (
    <header className="nav" id="nav">
      <div className="container nav__inner">
        <Link href="/" className="nav__brand-group" aria-label="Reddington Global home">
          <div className="nav__brand">
            <img src="/assets/img/rgc-logo-opt.png" alt="Reddington Global" className="logo-img" />
          </div>
          <span className="nav__brand-text">
            <span className="nav__brand-line">REDDINGTON GLOBAL</span>
            <span className="nav__brand-line nav__brand-line--sub">CONSULTANCY</span>
          </span>
        </Link>
        <nav className="nav__links" id="navLinks" aria-label="Primary">
          <Link href="/about">Who We Are</Link>
          <div className="nav__dropdown" id="navServicesDropdown">
            <button
              type="button"
              className="nav__dropdown-toggle"
              aria-expanded="false"
              aria-haspopup="true"
              id="servicesDropdownToggle"
            >
              Services <span className="nav__dropdown-arrow" aria-hidden="true">▾</span>
            </button>
            <div className="nav__dropdown-menu" role="menu">
              <div className="nav__dropdown-col">
                <span className="nav__dropdown-header">Operations &amp; Talent</span>
                {colTalentOps.map(s => (
                  <Link key={s.slug} href={`/services/${s.slug}`} role="menuitem">
                    <span className="nav__dropdown-item-title">{s.title}</span>
                    <span className="nav__dropdown-item-sub">{s.eyebrow}</span>
                  </Link>
                ))}
              </div>
              <div className="nav__dropdown-col">
                <span className="nav__dropdown-header">Technology &amp; Finance</span>
                {colTechFinance.map(s => (
                  <Link key={s.slug} href={`/services/${s.slug}`} role="menuitem">
                    <span className="nav__dropdown-item-title">{s.title}</span>
                    <span className="nav__dropdown-item-sub">{s.eyebrow}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/process">Our Edge</Link>
          <Link href="/team">Team</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/contact" className="btn btn--gold btn--sm">Get Consultation</Link>
        </nav>
        <button className="nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

