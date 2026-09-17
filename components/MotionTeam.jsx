'use client';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

// Variants
const photoVariant = {
  hidden: (reverse) => ({ opacity: 0, x: reverse ? 80 : -80, scale: 1.06 }),
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 1, ease } },
};

const bodyVariant = {
  hidden: (reverse) => ({ opacity: 0, x: reverse ? -60 : 60 }),
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease, delay: 0.12 } },
};

const ruleVariant = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease, delay: 0.4 } },
};

const pillVariant = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease, delay: 0.3 } },
};

const factVariant = {
  hidden: { opacity: 0, x: 18 },
  show: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.45 + i * 0.1, duration: 0.55, ease },
  }),
};

function LeaderCard({ reverse = false, photo, name, roleTitle, roleSub, facts }) {
  return (
    <motion.div
      className={`leader-card${reverse ? ' leader-card--reverse' : ''}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      {/* ── Photo side ── */}
      <motion.div
        className="leader-card__photo-wrap"
        variants={photoVariant}
        custom={reverse}
      >
        <img src={photo.src} alt={photo.alt} loading="lazy" style={{ ...(photo.position && { objectPosition: photo.position }), ...(photo.fit && { objectFit: photo.fit }) }} />
        <span className="leader-card__photo-name">{name}</span>
      </motion.div>

      {/* ── Info side ── */}
      <motion.div
        className="leader-card__body"
        variants={bodyVariant}
        custom={reverse}
      >
        <div className="leader-card__header">
          <h3 className="leader-card__name">{name}</h3>

          <motion.div className="leader-card__role-pill" variants={pillVariant}>
            <span className="leader-card__role-dot" aria-hidden="true"></span>
            {roleTitle}&ensp;<span style={{ opacity: 0.45 }}>|</span>&ensp;{roleSub}
          </motion.div>

          <motion.div className="leader-card__rule" variants={ruleVariant} />
        </div>

        <dl className="leader-card__timeline">
          {facts.map((f, i) => (
            <motion.div
              className="leader-card__fact"
              key={f.dt}
              variants={factVariant}
              custom={i}
            >
              <dt>{f.dt}</dt>
              <dd>{f.dd}</dd>
            </motion.div>
          ))}
        </dl>
      </motion.div>
    </motion.div>
  );
}

export default function MotionTeam() {
  return (
    <div className="leader-cards">
      <LeaderCard
        reverse={false}
        photo={{ src: '/assets/img/jyotsanaimage.jpeg', alt: 'Jyotsana Bora' }}
        name="Jyotsana Bora"
        roleTitle="Founder & CHRO"
        roleSub="Director"
        facts={[
          { dt: 'Foundation', dd: 'Founded Reddington Global in 2022 with a vision rooted in people-first excellence.' },
          { dt: 'Education', dd: 'Psychology Honours — deep expertise in behavioural science and people strategy.' },
          { dt: 'Expertise', dd: 'Workforce design, talent acquisition, HR leadership and organisational development at scale.' },
          { dt: 'Role', dd: 'Leads human capital strategy across India and international operations.' },
        ]}
      />

      <LeaderCard
        reverse={false}
        photo={{ src: '/assets/img/vishal.png', alt: 'Vishal Bora', position: 'center 35%' }}
        name="Vishal Bora"
        roleTitle="Co-Founder & CEO"
        roleSub="Director"
        facts={[
          { dt: 'Harvard Business School', dd: "Harvard Alumnus. Asia's Visionary Leader Award 2018 recipient." },
          { dt: 'Teleperformance (2001–2008)', dd: 'Scaled operations to 9,000+ workforce across international and domestic divisions.' },
          { dt: 'Videocon (2008–2010)', dd: 'Built and managed COE across 22 circles for Videocon mobile Services.' },
          { dt: 'Personiv (2010–2023)', dd: 'Built revenue from ground up to $138M/year across 3 geographies and 3,500 members.' },
          { dt: 'Today at Reddington', dd: 'Driving BPO expansion across US, UK & Canada with AI-augmented contact centre delivery.' },
        ]}
      />

      <LeaderCard
        reverse={false}
        photo={{ src: '/assets/img/dheeraj.png', alt: 'Subhashish Acharya' }}
        name="Subhashish Acharya"
        roleTitle="Chief Advisor"
        roleSub="Strategic Advisory"
        facts={[
          { dt: 'Harvard Business School', dd: 'Harvard Graduate — brings peer-level credibility with PE-backed and institutional clients.' },
          { dt: 'Market Entry', dd: 'Strategic advisor on US market entry, enterprise deal structuring and client acquisition.' },
          { dt: 'Global Leadership', dd: 'Global leadership across financial services, consulting and technology sectors.' },
          { dt: 'Skills', dd: 'Key architect of the commercial and operational model presented to our clients ' },
        ]}
      />
    </div>
  );
}

