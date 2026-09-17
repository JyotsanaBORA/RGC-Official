import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import ClientScripts from '../../components/ClientScripts';

export const metadata = {
  title: 'Testimonials — Reddington Global',
  description: 'Hear from the leaders and partners who trust Reddington Global to deliver operational excellence.',
};

export default function TestimonialsPage() {
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
          <div className="svc-hero__bg" style={{ backgroundImage: 'url(/assets/img/gal-talking.png)' }}></div>
          <div className="svc-hero__overlay"></div>
          <div className="container svc-hero__content">
            <p className="eyebrow">Testimonials</p>
            <h1 className="svc-hero__title">Trusted by leaders we <span className="gold-italic">work with.</span></h1>
            <p className="svc-hero__tagline">Real feedback from the organisations and professionals who partner with us every day.</p>
          </div>
        </section>

        <section className="section testimonials" id="testimonials">
          <div className="container">
            <div className="tslider reveal" id="tslider">
              <div className="tslider__track" id="tsliderTrack">
                <blockquote className="tcard">
                  <div className="tcard__stars" aria-label="5 stars">★★★★★</div>
                  <p>&ldquo;Reddington consistently demonstrates professionalism and innovation. Their disciplined execution makes them a trusted partner across every engagement.&rdquo;</p>
                  <footer><cite><span className="tcard__name">Parveen</span><span className="tcard__role">Director, Operations</span></cite></footer>
                </blockquote>
                <blockquote className="tcard">
                  <div className="tcard__stars" aria-label="5 stars">★★★★★</div>
                  <p>&ldquo;My team and I believe personalised video experiences are essential for trusted relationships, and Reddington is helping us deliver that impact at scale.&rdquo;</p>
                  <footer><cite><span className="tcard__name">Joe</span><span className="tcard__role">VP Customer Success</span></cite></footer>
                </blockquote>
                <blockquote className="tcard">
                  <div className="tcard__stars" aria-label="5 stars">★★★★★</div>
                  <p>&ldquo;Reddington provided exceptional strategic guidance, strengthening our digital approach and significantly elevating our online brand presence.&rdquo;</p>
                  <footer><cite><span className="tcard__name">Chiranjib</span><span className="tcard__role">Head of Digital, Enterprise</span></cite></footer>
                </blockquote>
              </div>
              <div className="tslider__nav">
                <button id="tPrev" aria-label="Previous testimonial">←</button>
                <div className="tslider__dots" id="tDots"></div>
                <button id="tNext" aria-label="Next testimonial">→</button>
              </div>
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
