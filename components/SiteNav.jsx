export default function SiteNav() {
  return (
    <header className="nav" id="nav">
      <div className="container nav__inner">
        <div className="nav__brand-group">
          <a href="/" className="nav__brand" aria-label="Reddington Global Consultancy home">
            <img src="/assets/img/rgc-logo.png" alt="Reddington Global" className="logo-img" />
          </a>
          <span className="nav__brand-text">
            <span className="nav__brand-line">REDDINGTON GLOBAL</span>
            <span className="nav__brand-line nav__brand-line--sub">CONSULTANCY</span>
          </span>
        </div>
        <nav className="nav__links" id="navLinks" aria-label="Primary">
          <a href="/about">Who We Are</a>
          <div className="nav__dropdown" id="navServicesDropdown">
            <a href="/#services" className="nav__dropdown-toggle" aria-expanded="false" aria-haspopup="true">
              Services <span className="nav__dropdown-arrow" aria-hidden="true">▾</span>
            </a>
            <ul className="nav__dropdown-menu" role="menu">
              <li role="none"><a href="/services/financial-services" role="menuitem">Financial Services</a></li>
              <li role="none"><a href="/services/recruitment" role="menuitem">Recruitment and Staffing Services</a></li>
              <li role="none"><a href="/services/immergix-bpo" role="menuitem">IMMERGIX BPO</a></li>
              <li role="none"><a href="/services/management-consultancy" role="menuitem">Management Consultancy</a></li>
              <li role="none"><a href="/services/retail" role="menuitem">Retail Requirements</a></li>
              <li role="none"><a href="/services/performance-management" role="menuitem">Performance Management</a></li>
              <li role="none"><a href="/services/contact-centre" role="menuitem">On-Site Contact Centre</a></li>
            </ul>
          </div>
          <a href="/process">Our Edge</a>
          <a href="/team">Team</a>
          <a href="/testimonials">Testimonials</a>
          <a href="/contact" className="btn btn--gold btn--sm">Get Consultation</a>
        </nav>
        <button className="nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
