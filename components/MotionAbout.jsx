import React from 'react';

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
      {CARDS.map((c) => (
        <div className="about__card reveal" key={c.num}>
          <div className="about__card-num">{c.num}</div>
          <h3>{c.title}</h3>
          <p>{c.desc}</p>
        </div>
      ))}
    </div>
  );
}
