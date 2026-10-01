import Link from 'next/link';
import { getServicesByCategory } from '../lib/services-data';

export default function SiteNav() {
  const bpoServices = getServicesByCategory('bpo');
  const consultancyServices = getServicesByCategory('consultancy');
  const marketingServices = getServicesByCategory('marketing');

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
            <div className="nav__dropdown-menu nav__dropdown-menu--3col" role="menu">
              {/* 1. BPO Services */}
              <div className="nav__dropdown-col">
                <span className="nav__dropdown-header">BPO Services</span>
                {bpoServices.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} role="menuitem">
                    <span className="nav__dropdown-item-title">{s.shortTitle || s.title}</span>
                    <span className="nav__dropdown-item-sub">{s.tagline.slice(0, 52)}...</span>
                  </Link>
                ))}
              </div>

              {/* 2. Consultancy Services */}
              <div className="nav__dropdown-col">
                <span className="nav__dropdown-header">Consultancy Services</span>
                {consultancyServices.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} role="menuitem">
                    <span className="nav__dropdown-item-title">{s.shortTitle || s.title}</span>
                    <span className="nav__dropdown-item-sub">{s.tagline.slice(0, 52)}...</span>
                  </Link>
                ))}
              </div>

              {/* 3. Digital Marketing */}
              <div className="nav__dropdown-col">
                <span className="nav__dropdown-header">Growth &amp; Media</span>
                {marketingServices.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} role="menuitem">
                    <span className="nav__dropdown-item-title">{s.shortTitle || s.title}</span>
                    <span className="nav__dropdown-item-sub">{s.tagline.slice(0, 52)}...</span>
                  </Link>
                ))}
                <div className="nav__dropdown-callout">
                  <span className="nav__dropdown-callout-badge">Fast-Track Delivery</span>
                  <p>Enterprise SLA guaranteed by contract.</p>
                </div>
              </div>
            </div>
          </div>
          <Link href="/process">Our Edge</Link>
          <Link href="/team">Team</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/contact" className="btn btn--gold btn--sm">Get Consultation</Link>
        </nav>
        <button className="nav__burger" id="burgerBtn" aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
