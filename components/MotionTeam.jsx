import React from 'react';

const LEADERS = [
  {
    name: 'Jyotsana Bora',
    role: 'Founder & CHRO',
    badge: 'Human Capital Strategy',
    photo: '/assets/img/jyotsana.webp',
    bio: 'Founded Reddington Global in 2022 with a people-first ethos. Psychology Honours background with deep expertise in workforce design, executive talent acquisition, and organizational development across India and international delivery hubs.',
    highlights: ['Psychology Honours', 'Workforce Architecture', 'Global Delivery Lead'],
  },
  {
    name: 'Vishal Bora',
    role: 'Co-Founder & CEO',
    badge: 'Harvard Business School Alum',
    photo: '/assets/img/vishal.webp',
    position: 'center 25%',
    bio: "Harvard Alumnus and recipient of Asia's Visionary Leader Award 2018. Former executive at Teleperformance (scaled 9,000+ seats), Videocon, and Personiv (grew revenue to $138M/yr across 3,500 personnel). Driving RG's global expansion.",
    highlights: ['Harvard Alum', 'Ex-Teleperformance (9k+ seats)', '$138M ARR Scaled'],
  },
  {
    name: 'Subhashish Acharya',
    role: 'Chief Advisor',
    badge: 'Strategic Advisory',
    photo: '/assets/img/subhashish.webp',
    bio: 'Harvard Business School Graduate bringing peer-level credibility with institutional and PE-backed enterprises. Senior strategic advisor on US market entry, enterprise deal structuring, and global corporate expansion across tech and finance.',
    highlights: ['Harvard Business School', 'PE & Enterprise Advisory', 'US Market Expansion'],
  },
];

export default function MotionTeam() {
  return (
    <div className="leader-grid">
      {LEADERS.map((leader) => (
        <article key={leader.name} className="leader-box reveal">
          <div className="leader-box__img-wrap">
            <img
              src={leader.photo}
              alt={leader.name}
              loading="lazy"
              style={leader.position ? { objectPosition: leader.position } : undefined}
            />
            <span className="leader-box__badge">{leader.badge}</span>
          </div>
          <div className="leader-box__body">
            <div className="leader-box__meta">
              <h3 className="leader-box__name">{leader.name}</h3>
              <p className="leader-box__role">{leader.role}</p>
            </div>
            <p className="leader-box__bio">{leader.bio}</p>
            <div className="leader-box__tags">
              {leader.highlights.map((h) => (
                <span key={h} className="leader-box__tag">{h}</span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
