import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import ClientScripts from './ClientScripts';

/**
 * Shared layout for legal pages (Privacy Policy, Terms & Conditions).
 * sections: [{ id, title, body: [string | string[]] }] — a string is a paragraph, an array is a bullet list.
 */
export default function LegalPage({ eyebrow, title, accent, intro, updated, sections }) {
  return (
    <>
      <div className="progress" id="progressBar" aria-hidden="true"></div>
      <SiteNav />

      <main>
        <section className="svc-hero">
          <div className="svc-hero__bg" style={{ backgroundImage: 'url(/assets/img/who-we-are-opt.webp)' }}></div>
          <div className="svc-hero__overlay"></div>
          <div className="container svc-hero__content">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="svc-hero__title">
              {title} <span className="gold-italic">{accent}</span>
            </h1>
            <p className="svc-hero__tagline">{intro}</p>
          </div>
        </section>

        <section className="section legal">
          <div className="container">
            <div className="legal__panel">
              <div className="legal__grid" aria-hidden="true"></div>
              <div className="legal__orb" aria-hidden="true"></div>

              <div className="legal__layout">
                <nav className="legal__toc" aria-label="On this page">
                  <p className="legal__toc-title">
                    <span className="legal__pulse" aria-hidden="true"></span>
                    On this page
                  </p>
                  <ol>
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a href={`#${s.id}`}>{s.title}</a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <article className="legal__body">
                  <p className="legal__updated">Last updated: {updated}</p>
                  {sections.map((s, i) => (
                    <section key={s.id} id={s.id} className="legal__section">
                      <h2>
                        <span className="legal__num">{String(i + 1).padStart(2, '0')}</span>
                        {s.title}
                      </h2>
                      {s.body.map((block, idx) =>
                        Array.isArray(block) ? (
                          <ul key={idx}>
                            {block.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p key={idx}>{block}</p>
                        )
                      )}
                    </section>
                  ))}
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ClientScripts />
    </>
  );
}
