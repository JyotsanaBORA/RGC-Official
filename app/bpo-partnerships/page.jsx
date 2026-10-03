import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import ClientScripts from '../../components/ClientScripts';
import BpoPartnerForm from './BpoPartnerForm';

export const metadata = {
  title: 'BPO Partnerships & Campaign Opportunities | Reddington Global',
  description:
    'Reddington Global connects BPOs and call centers with high-yield campaign opportunities, operational assessment, and onboarding coordination.',
  openGraph: {
    title: 'Campaign Opportunities for BPOs & Call Centers — Reddington Global',
    description:
      'Connect your call center with the right enterprise campaigns. Sourcing, capability matching, commercial coordination, and onboarding support.',
    type: 'website',
  },
};

export default function BpoPartnershipsPage() {
  const growthServices = [
    {
      num: '01',
      title: 'Campaign Sourcing & Partner Introductions',
      desc: 'We identify campaign opportunities through our partner network and introduce suitable call centers based on their experience, capacity, and operational readiness.',
    },
    {
      num: '02',
      title: 'Capability Assessment & Campaign Matching',
      desc: 'We review your team’s experience, infrastructure, management capabilities, and compliance processes to assess alignment with available campaign requirements.',
    },
    {
      num: '03',
      title: 'Commercial Coordination',
      desc: 'We help coordinate discussions around campaign scope, qualification criteria, payout structures, reporting requirements, and applicable clawback provisions.',
    },
    {
      num: '04',
      title: 'Onboarding Support',
      desc: 'We facilitate communication between your call center and the campaign partner to help coordinate documentation, training requirements, and launch preparation.',
    },
    {
      num: '05',
      title: 'Ongoing Relationship Coordination',
      desc: 'We remain a point of coordination for the partnerships we introduce, supporting communication and helping address operational or commercial queries.',
    },
  ];

  const whoShouldApply = [
    {
      icon: '🏢',
      title: 'Established BPOs & Call Centers',
      desc: 'Centers with ready seats seeking stable, high-volume campaign opportunities to scale their operational capacity.',
    },
    {
      icon: '🎙️',
      title: 'US Voice & Financial Services Teams',
      desc: 'Teams with proven experience in US voice processes, financial consulting, debt management, or customer support campaigns.',
    },
    {
      icon: '⚙️',
      title: 'Modern Calling Infrastructure',
      desc: 'Operators equipped with enterprise dialer infrastructure, QA monitoring, call recording, and real-time reporting stacks.',
    },
    {
      icon: '🛡️',
      title: 'Compliance & Data Security Ready',
      desc: 'Businesses able to adhere strictly to applicable data security, compliance standards, and campaign SLAs.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Register Your Interest',
      desc: 'Share your company profile, campaign experience, dialer tech stack, and available seat capacity.',
    },
    {
      step: '02',
      title: 'Discuss Your Capabilities',
      desc: 'Our partnership team reviews your operational readiness, agent competencies, and business requirements.',
    },
    {
      step: '03',
      title: 'Explore a Suitable Opportunity',
      desc: 'Where there is an ideal match, we coordinate an introduction to the relevant enterprise campaign partner.',
    },
    {
      step: '04',
      title: 'Agree on Terms & Onboard',
      desc: 'Selected call centers complete the required documentation, compliance checks, and agent training before go-live.',
    },
  ];

  return (
    <>
      <div className="progress" id="progressBar" aria-hidden="true"></div>
      <SiteNav />

      <main>
        {/* ══════════ HERO SECTION ══════════ */}
        <section className="svc-hero">
          <div
            className="svc-hero__bg"
            style={{ backgroundImage: 'url(/assets/img/svc-bpo-opt.webp)' }}
          ></div>
          <div className="svc-hero__veil"></div>
          <div className="container svc-hero__content">
            <p className="eyebrow">BPO Partnerships · Call Center Growth</p>
            <h1 className="svc-hero__title">
              Campaign Opportunities for <span className="gold-italic">BPOs &amp; Call Centers.</span>
            </h1>
            <p className="svc-hero__tagline">
              Connect your call center with the right business opportunities. Reddington Global Consultancy Pvt Ltd helps BPOs and call centers explore campaign opportunities through its network of business partners and service providers.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '15px', lineHeight: '1.65' }}>
              We bring together call centers with delivery capabilities and partners seeking reliable teams to support their campaigns. From initial assessment to partner introductions and onboarding coordination, we help both sides establish a clear foundation for working together.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '10px' }}>
              <a href="#partner-form" className="btn btn--gold">
                Register Your Call Center
              </a>
              <a href="#how-it-works" className="btn btn--ghost">
                How It Works ↓
              </a>
            </div>
          </div>
        </section>

        {/* ══════════ HOW WE HELP YOUR BUSINESS GROW ══════════ */}
        <section className="section" id="how-we-help" style={{ background: '#FDFBF7' }}>
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">Value Proposition</p>
              <h2 className="section__title">
                How we help your <span className="gold-italic">business grow.</span>
              </h2>
              <p className="lead">
                A structured bridge between ambitious delivery centers and enterprise campaign demand.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                marginTop: '32px',
              }}
            >
              {growthServices.map((item) => (
                <div
                  key={item.num}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(212, 159, 45, 0.22)',
                    borderRadius: '16px',
                    padding: '28px 24px',
                    boxShadow: '0 4px 20px rgba(40, 20, 10, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: '800',
                      color: 'var(--gold-deep)',
                    }}
                  >
                    {item.num}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: '750', color: '#140A03', lineHeight: '1.3' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#4A3E36', fontSize: '14.5px', lineHeight: '1.65' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ WHO SHOULD APPLY ══════════ */}
        <section className="section" id="who-should-apply" style={{ background: '#F7F3EC' }}>
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">Eligibility &amp; Criteria</p>
              <h2 className="section__title">
                Who should <span className="gold-italic">apply?</span>
              </h2>
              <p className="lead">
                We partner with high-quality contact centers that maintain strict service standards and compliance.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px',
                marginTop: '32px',
              }}
            >
              {whoShouldApply.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(212, 159, 45, 0.25)',
                    borderRadius: '16px',
                    padding: '26px 20px',
                    boxShadow: '0 4px 18px rgba(40, 20, 10, 0.05)',
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '14px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '17px', fontWeight: '750', color: '#140A03', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#4A3E36', fontSize: '14px', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ HOW IT WORKS ══════════ */}
        <section className="section" id="how-it-works" style={{ background: '#FDFBF7' }}>
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">Operational Framework</p>
              <h2 className="section__title">
                How it <span className="gold-italic">works.</span>
              </h2>
              <p className="lead">
                From initial profile registration to live launch, our process ensures alignment at every step.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
                marginTop: '36px',
              }}
            >
              {steps.map((s) => (
                <div
                  key={s.step}
                  style={{
                    background: '#FFFFFF',
                    borderTop: '3px solid #D49F2D',
                    borderRight: '1px solid rgba(212, 159, 45, 0.2)',
                    borderBottom: '1px solid rgba(212, 159, 45, 0.2)',
                    borderLeft: '1px solid rgba(212, 159, 45, 0.2)',
                    borderRadius: '14px',
                    padding: '24px 20px',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '14px',
                      fontWeight: '800',
                      color: '#D49F2D',
                      letterSpacing: '0.1em',
                    }}
                  >
                    STEP {s.step}
                  </span>
                  <h3 style={{ fontSize: '17px', fontWeight: '750', color: '#140A03', margin: '10px 0 8px' }}>
                    {s.title}
                  </h3>
                  <p style={{ color: '#4A3E36', fontSize: '14px', lineHeight: '1.6' }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ FORM & DIRECT CONTACT ══════════ */}
        <section className="contact-section" id="apply">
          <div className="container ct-grid">
            <div className="ct-info">
              <p className="eyebrow">Partner With Us</p>
              <h2 className="section__title ct-info__title">
                Let&apos;s explore opportunities for your <span className="gold-italic">call center.</span>
              </h2>
              <p className="ct-info__sub">
                Tell us about your team and the campaigns you are looking to run. We will contact you to discuss your capabilities and any suitable opportunities available through our network.
              </p>

              <div className="ct-channels" style={{ marginTop: '28px' }}>
                <a href="tel:+919818224495" className="ct-channel">
                  <span className="ct-channel__icon">📞</span>
                  <span className="ct-channel__text">
                    <span className="ct-channel__label">Call Our Partnership Desk</span>
                    <span className="ct-channel__value">+91 98182 24495</span>
                  </span>
                </a>
                <a href="mailto:sales@reddingtonglobal.com" className="ct-channel">
                  <span className="ct-channel__icon">✉️</span>
                  <span className="ct-channel__text">
                    <span className="ct-channel__label">Direct Partnership Inquiries</span>
                    <span className="ct-channel__value">sales@reddingtonglobal.com</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="ct-form-wrap">
              <BpoPartnerForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <button className="totop" id="toTop" aria-label="Back to top">↑</button>
      <ClientScripts />
    </>
  );
}
