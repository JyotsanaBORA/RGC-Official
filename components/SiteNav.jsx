import Link from 'next/link';
import { SERVICES } from '../lib/services-data';

const NAV_ITEM_SUBS = {
  'bpo-sales': 'Inbound & outbound pipeline',
  'bpo-backoffice': 'Data operations & KYC/AML',
  'bpo-customer-service': 'By Vishal Sir · 24/7 care',
  'recruitment-staffing': 'High-volume headcount',
  'saas-digital-solutions': 'Web, APIs & payment gateways',
  'digital-marketing': 'Paid media, SEO & CRO funnels',
  'performance-management-consultancy': 'Floor efficiency & QA systems',
  'bookkeeping-accountancy': 'GST, TDS & monthly MIS',
  'payroll-compensation': 'Disbursements & tax compliance',
};

export default function SiteNav() {
  const bpoServices = SERVICES.filter((s) => s.category === 'bpo');
  const techServices = SERVICES.filter((s) =>
    ['saas-digital-solutions', 'digital-marketing', 'performance-management-consultancy'].includes(s.slug)
  );
  const financeServices = SERVICES.filter((s) =>
    ['bookkeeping-accountancy', 'payroll-compensation'].includes(s.slug)
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

            <div className="nav__dropdown-menu nav__dropdown-menu--3col" role="menu">
              {/* 1. BPO Services */}
              <div className="nav__dropdown-col">
                <span className="nav__dropdown-header">BPO Services</span>
                {bpoServices.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} role="menuitem">
                    <span className="nav__dropdown-item-title">{s.shortTitle || s.title}</span>
                    <span className="nav__dropdown-item-sub">{NAV_ITEM_SUBS[s.slug] || s.tagline}</span>
                  </Link>
                ))}
              </div>

              {/* 2. Tech & Growth Consultancy */}
              <div className="nav__dropdown-col">
                <span className="nav__dropdown-header">Tech &amp; Growth</span>
                {techServices.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} role="menuitem">
                    <span className="nav__dropdown-item-title">{s.shortTitle || s.title}</span>
                    <span className="nav__dropdown-item-sub">{NAV_ITEM_SUBS[s.slug] || s.tagline}</span>
                  </Link>
                ))}
              </div>

              {/* 3. Finance & Governance */}
              <div className="nav__dropdown-col">
                <span className="nav__dropdown-header">Finance &amp; HR</span>
                {financeServices.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} role="menuitem">
                    <span className="nav__dropdown-item-title">{s.shortTitle || s.title}</span>
                    <span className="nav__dropdown-item-sub">{NAV_ITEM_SUBS[s.slug] || s.tagline}</span>
                  </Link>
                ))}
                <div className="nav__dropdown-callout">
                  <span className="nav__dropdown-callout-badge">Enterprise SLA</span>
                  <p>Direct practice scoping within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>

          <Link href="/process">Our Edge</Link>
          <Link href="/team">Team</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/contact" className="btn btn--gold btn--sm">Get Consultation</Link>
        </nav>

        <button className="nav__toggle nav__burger" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
