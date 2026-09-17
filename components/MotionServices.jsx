'use client';
import { motion } from 'framer-motion';

const imgVariant = {
  hidden: { scale: 1.18, opacity: 0 },
  show: (i) => ({
    scale: 1.02,
    opacity: 1,
    transition: { delay: i * 0.1 + 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 54, scale: 0.93 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  }),
};

const iconVariant = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { delay: i * 0.1 + 0.35, duration: 0.5, type: 'spring', stiffness: 200 },
  }),
};

const SERVICES = [
  {
    href: '/services/recruitment',
    img: '/assets/img/svc-recruitment.png',
    label: 'Learn more about Recruitment Solutions',
    title: 'Recruitment Solutions',
    desc: 'Perfection is never the endpoint. We identify, evaluate, and place the right talent with precision to match your exact business demand.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
        <path d="M16 3.5a3.5 3.5 0 010 7M18.5 13.7c1.8 1 3 2.9 3 5.1" />
      </svg>
    ),
  },
  {
    href: '/services/performance-management',
    img: '/assets/img/svc-performance.png',
    label: 'Learn more about Performance Management',
    title: 'Performance Management',
    desc: 'Specialist-led performance programmes across operational intelligence, compliance, quality assurance, and measurable delivery improvement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 20h18M6 20V10m6 10V4m6 16v-7" />
      </svg>
    ),
  },
  {
    href: '/services/retail',
    img: '/assets/img/svc-retail.png',
    label: 'Learn more about Retail Requirements',
    title: 'Retail Requirements',
    desc: 'We manage ongoing retail and OEM requirements that keep contact centre operations efficient, stable, and fully supported every day.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 7l2-3h12l2 3M4 7h16v13H4zM9 11h6" />
      </svg>
    ),
  },
  {
    href: '/services/financial-services',
    img: '/assets/img/svc-financial.png',
    label: 'Learn more about Financial Services',
    title: 'Financial Services',
    desc: 'Empowering banks, NBFCs, insurers, and fintechs with compliant, secure, scalable BPO — customer support, KYC, collections, and loan processing.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    href: '/services/contact-centre',
    img: '/assets/img/svc-contact.png',
    label: 'Learn more about On-Site Contact Centre',
    title: 'On-Site Contact Centre',
    desc: 'We transition traditional setups into high-performing on-site contact centres with dedicated teams and round-the-clock service standards.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    href: '/services/management-consultancy',
    img: '/assets/img/svc-performance.png',
    label: 'Learn more about Management Consultancy',
    title: 'Management Consultancy',
    desc: 'Strategic advisory from experienced operators across process transformation, organisational design, and sustainable growth planning.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function MotionServices() {
  return (
    <div className="services__grid">
      {SERVICES.map((svc, i) => (
        <motion.article
          key={svc.href}
          className="service tilt"
          variants={cardVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          custom={i}
        >
          <a href={svc.href} className="service__link" aria-label={svc.label}></a>
          <figure className="service__img">
            <motion.img
              src={svc.img}
              alt=""
              loading="lazy"
              variants={imgVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              custom={i}
            />
          </figure>
          <motion.div
            className="service__icon"
            aria-hidden="true"
            variants={iconVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i}
          >
            {svc.icon}
          </motion.div>
          <h3>{svc.title}</h3>
          <p>{svc.desc}</p>
          <span className="service__more" aria-hidden="true">Learn more →</span>
        </motion.article>
      ))}

      {/* CTA card */}
      <motion.article
        className="service service--cta"
        variants={cardVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        custom={5}
      >
        <h3>Not sure where to begin?</h3>
        <p>Share your objective, and we&apos;ll recommend the right delivery model.</p>
        <a href="#contact" className="btn btn--gold btn--sm">Talk to Us</a>
      </motion.article>
    </div>
  );
}
