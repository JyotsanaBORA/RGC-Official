export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/assets/img/rgc-logo.png" alt="Reddington Global" className="logo-img logo-img--footer" />
          <p>We focus on the needs of small to middle-market businesses to improve and grow their return.</p>
          <div className="footer__cert">
            <span>Certified by</span>
            <img src="/assets/img/nasscom.png" alt="NASSCOM" loading="lazy" />
          </div>
        </div>
        <nav className="footer__col" aria-label="Useful links">
          <h4>Useful Links</h4>
          <a href="/about">About Us</a>
          <a href="/#services">Our Services</a>
          <a href="/team">Our Team</a>
          <a href="/careers">Careers</a>
        </nav>
        <nav className="footer__col" aria-label="Services">
          <h4>Services</h4>
          <a href="/services/financial-services">Financial Services</a>
          <a href="/services/recruitment">Recruitment &amp; Staffing</a>
          <a href="/services/immergix-bpo">IMMERGIX BPO</a>
          <a href="/services/management-consultancy">Management Consultancy</a>
          <a href="/services/retail">Retail Requirements</a>
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
        <p>RG Consultancy · Reddington Group Inc · RG Care Foundation</p>
      </div>
    </footer>
  );
}
