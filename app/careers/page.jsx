import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import ClientScripts from '../../components/ClientScripts';
import CareerForm from './CareerForm';

export const metadata = {
  title: 'Careers — Reddington Global Consultancy',
  description:
    'Join Reddington Global Consultancy. Discover rewarding career opportunities across BPO, recruitment, performance consulting, SaaS, and financial operations.',
  openGraph: {
    title: 'Careers at Reddington Global',
    description: 'Build your career with an industry-leading global consultancy and BPO firm.',
    type: 'website',
  },
};

export default async function CareerPage() {
  let jobs = [];

  try {
    const res = await fetch('https://rgstaffhub.reddingtonglobal.com/api/recruitment/public/jobs', {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const json = await res.json().catch(() => ({}));
      jobs = Array.isArray(json.data) ? json.data : [];
    }
  } catch (err) {
    console.error('Error fetching jobs list:', err);
    jobs = [];
  }

  const perks = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      title: 'Global Exposure',
      desc: 'Work directly with international clients across the US, UK, and India, mastering enterprise-grade operations.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      title: 'Fast-Track Growth',
      desc: 'Merit-based promotion cycles, leadership coaching, and continuous professional development programs.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1v-2.34M14 14.66V17c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-2.34" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
        </svg>
      ),
      title: 'Performance Rewards',
      desc: 'Competitive compensation packages, uncapped performance incentives, and milestone recognition rewards.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Vibrant Culture',
      desc: 'An inclusive, energetic workplace with team events, modern infrastructure, and genuine peer camaraderie.',
    },
  ];

  return (
    <>
      {/* SVG Gradient definition */}
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
        {/* ── HERO SECTION ── */}
        <section className="svc-hero">
          <div
            className="svc-hero__bg"
            style={{ backgroundImage: 'url(/assets/img/svc-recruitment-opt.webp)' }}
          ></div>
          <div className="svc-hero__veil"></div>
          <div className="container svc-hero__content">
            <p className="eyebrow">Careers at Reddington Global</p>
            <h1 className="svc-hero__title">
              Shape your future with an <span className="gold-italic">industry leader.</span>
            </h1>
            <p className="svc-hero__tagline">
              Join a team of driven thinkers, operators, and problem-solvers delivering premium BPO, staffing, and strategic consulting worldwide.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '8px' }}>
              <a href="#apply-portal" className="btn btn--gold">
                Apply for Roles
              </a>
              <a href="#culture" className="svc-hero__back">
                Why Reddington Global ↓
              </a>
            </div>
          </div>
        </section>

        {/* ── CULTURE & PERKS ── */}
        <section className="section career-perks-section" id="culture">
          <div className="container">
            <div className="career-section-header">
              <p className="eyebrow">Life at Reddington</p>
              <h2 className="section__title">
                Designed for your <span className="gold-italic">ambition.</span>
              </h2>
              <p className="lead">
                We believe exceptional work happens when talented professionals are empowered with autonomy, world-class resources, and visionary leadership.
              </p>
            </div>

            <div className="career-perks-grid">
              {perks.map((perk, i) => (
                <div key={i} className="career-perk-card">
                  <div className="career-perk-card__icon">{perk.icon}</div>
                  <h3 className="career-perk-card__title">{perk.title}</h3>
                  <p className="career-perk-card__desc">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OPEN POSITIONS ── */}
        <section className="section career-jobs-section" id="open-roles">
          <div className="container">
            <div className="career-section-header">
              <p className="eyebrow">Current Vacancies</p>
              <h2 className="section__title">
                Explore <span className="gold-italic">Open Positions</span>
              </h2>
              <p className="lead">
                Find the opportunity where your skills and passion create meaningful impact.
              </p>
            </div>

            {jobs.length > 0 ? (
              <div className="career-jobs-grid">
                {jobs.map((job) => (
                  <div key={job._id} className="career-job-card">
                    <div className="career-job-card__meta">
                      <span className="badge-tag">{job.department || 'General'}</span>
                      <span className="career-job-card__loc">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <path d="M12 21C12 21 5 14.5 5 9a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                        Gurugram / On-Site
                      </span>
                    </div>
                    <h3 className="career-job-card__title">{job.title}</h3>
                    <p className="career-job-card__desc">
                      Join our {job.department || 'operations'} team to drive high-standard execution and client success.
                    </p>
                    <a href="#apply-portal" className="career-job-card__action">
                      Apply for this role <span>→</span>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="career-empty-card">
                <div className="career-empty-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="36" height="36">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Ongoing Recruitment &amp; General Applications</h3>
                <p>
                  While specific role requisitions are being updated in our staffing hub, we are actively hiring for talent in <strong>BPO Operations</strong>, <strong>Talent Acquisition</strong>, <strong>Financial Analysis</strong>, and <strong>Client Services</strong>.
                </p>
                <p className="career-empty-card__sub">
                  Submit your application below and select <strong>General Application</strong> to be considered for our active candidate talent pool.
                </p>
                <a href="#apply-portal" className="btn btn--gold btn--sm">
                  Jump to Application Form ↓
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ── APPLICATION PORTAL SECTION ── */}
        <section className="section career-portal-section" id="apply">
          <div className="container">
            <div className="ct-wrap" style={{ maxWidth: '840px', margin: '0 auto' }}>
              <div className="ct-glow ct-glow--gold" aria-hidden="true"></div>
              <div className="ct-glow ct-glow--red" aria-hidden="true"></div>
              <CareerForm jobs={jobs} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <button className="totop" id="toTop" aria-label="Back to top">
        ↑
      </button>
      <ClientScripts />
    </>
  );
}
