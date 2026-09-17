import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import ClientScripts from '../../components/ClientScripts';

export const metadata = {
  title: 'Projects — Reddington Global',
  description: 'Execution stories from real operations — see how our teams collaborate, deploy, and scale delivery environments.',
};

export default function ProjectsPage() {
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
          <div className="svc-hero__bg" style={{ backgroundImage: 'url(/assets/img/gal-hiring.jpg)' }}></div>
          <div className="svc-hero__overlay"></div>
          <div className="container svc-hero__content">
            <p className="eyebrow">Projects</p>
            <h1 className="svc-hero__title">Execution stories from <span className="gold-italic">real operations.</span></h1>
            <p className="svc-hero__tagline">A snapshot of how our teams collaborate, deploy, and scale delivery environments for client-facing operations.</p>
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="container">
            <div className="projects__grid reveal">
              <article className="project-card">
                <img src="/assets/img/gal-seminar.png" alt="Team seminar at Reddington Global" loading="lazy" />
                <div className="project-card__body">
                  <h3>Operational Workshops</h3>
                  <p>Structured strategy sessions that align teams on delivery standards, workflows, and performance goals.</p>
                </div>
              </article>
              <article className="project-card">
                <img src="/assets/img/gal-hiring.jpg" alt="Interviewing new talent" loading="lazy" />
                <div className="project-card__body">
                  <h3>Talent Acquisition</h3>
                  <p>Focused recruitment and onboarding initiatives designed to build role-ready teams quickly and reliably.</p>
                </div>
              </article>
              <article className="project-card">
                <img src="/assets/img/gal-staffing.jpg" alt="Staffing consultation" loading="lazy" />
                <div className="project-card__body">
                  <h3>On-Site Delivery Setup</h3>
                  <p>End-to-end launch support across staffing, process management, and customer experience operations.</p>
                </div>
              </article>
            </div>
          </div>

          <div className="gallery" aria-label="Life at Reddington Global">
            <div className="gallery__track">
              <img src="/assets/img/gal-seminar.png" alt="Team seminar at Reddington Global" loading="lazy" />
              <img src="/assets/img/gal-hiring.jpg" alt="Interviewing new talent" loading="lazy" />
              <img src="/assets/img/group.png" alt="Team gathering" loading="lazy" />
              <img src="/assets/img/gal-staffing.jpg" alt="Staffing consultation" loading="lazy" />
              <img src="/assets/img/gal-talking.png" alt="Colleagues in conversation" loading="lazy" />
              <img src="/assets/img/gal-walking.png" alt="On the move at the office" loading="lazy" />
              <img src="/assets/img/gal-seminar.png" alt="" loading="lazy" />
              <img src="/assets/img/gal-hiring.jpg" alt="" loading="lazy" />
              <img src="/assets/img/group.png" alt="" loading="lazy" />
              <img src="/assets/img/gal-staffing.jpg" alt="" loading="lazy" />
              <img src="/assets/img/gal-talking.png" alt="" loading="lazy" />
              <img src="/assets/img/gal-walking.png" alt="" loading="lazy" />
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
