'use client';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const stepVariant = {
  hidden: { opacity: 0, y: 44, scale: 0.95 },
  show: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.14, duration: 0.72, ease },
  }),
};

const iconVariant = {
  hidden: { opacity: 0, scale: 0.5, rotate: -20 },
  show: (i) => ({
    opacity: 1, scale: 1, rotate: 0,
    transition: { delay: i * 0.14 + 0.28, duration: 0.5, type: 'spring', stiffness: 180 },
  }),
};

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    desc: 'A focused consultation to understand your operations, pain points, and growth goals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="6.5" />
        <path d="M20 20l-3.8-3.8" />
        <path d="M11 8.2v5.6" />
        <path d="M8.2 11h5.6" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Design',
    desc: 'We engineer a precision solution — staffing model, compliance architecture, and KPI framework.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="4" width="17" height="15.5" rx="2.5" />
        <path d="M7.5 9h9" />
        <path d="M7.5 13h5" />
        <path d="M15.5 12.2l2.9 2.9" />
        <path d="M18.4 12.2l-2.9 2.9" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Deploy',
    desc: 'Our trained on-site team goes live — aligned with your brand, culture, and service standards.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v10" />
        <path d="M8.5 7.2L12 3l3.5 4.2" />
        <path d="M4 15.5h16" />
        <path d="M6.5 20h11" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Optimise',
    desc: 'Continuous performance loops, quality audits, and data insights to keep your outcomes sharp.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5h16" />
        <rect x="5" y="12.5" width="3" height="5" rx="0.8" />
        <rect x="10.5" y="9.5" width="3" height="8" rx="0.8" />
        <rect x="16" y="6.5" width="3" height="11" rx="0.8" />
        <path d="M6 7.5l4-2.2 3.2 1.8L18 4.6" />
      </svg>
    ),
  },
];

export default function MotionProcess() {
  return (
    <div className="process__grid">
      {STEPS.map((step, i) => (
        <motion.div
          key={step.num}
          className="process__step"
          variants={stepVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          custom={i}
        >
          <motion.div
            className="process__icon-wrap"
            aria-hidden="true"
            variants={iconVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i}
          >
            {step.icon}
          </motion.div>
          <span className="process__num">{step.num}</span>
          <h3 className="process__title">{step.title}</h3>
          <p className="process__desc">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
