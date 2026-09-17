'use client';
import { motion } from 'framer-motion';

const cardVariant = {
  hidden: { opacity: 0, x: 60, scale: 0.95 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { delay: i * 0.16, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  }),
};

const numVariant = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.16 + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const CARDS = [
  {
    num: '01',
    title: 'Operational Intelligence',
    desc: 'Subject-matter experts with deep experience in operational performance management and process excellence.',
  },
  {
    num: '02',
    title: 'Compliance & Quality',
    desc: 'Compliance-first delivery with rigorous quality assurance woven into every engagement.',
  },
  {
    num: '03',
    title: 'People-First Staffing',
    desc: 'The right people aligned precisely to demand, with a hiring approach focused on long-term fit and sustained outcomes.',
  },
];

export default function MotionAbout() {
  return (
    <div className="about__right">
      {CARDS.map((c, i) => (
        <motion.div
          className="about__card"
          key={c.num}
          variants={cardVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          custom={i}
        >
          <motion.div
            className="about__card-num"
            variants={numVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i}
          >
            {c.num}
          </motion.div>
          <h3>{c.title}</h3>
          <p>{c.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
