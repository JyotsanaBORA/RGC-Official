import React from 'react';

const STEPS = [
  {
    num: '01',
    phase: 'Phase 01',
    badge: 'Discovery Sprint',
    title: 'Discover & Diagnose',
    desc: 'Deep-dive operational audit mapping workflows, SLA baselines, headcount bottlenecks, and technical friction.',
    deliverables: ['Workflow Diagnostic', 'Capacity Audit', 'SLA Framework Scope'],
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
    phase: 'Phase 02',
    badge: 'Precision Architecture',
    title: 'Design & Solution',
    desc: 'Engineering your dedicated delivery engine — custom talent matrix, compliance protocols, and dual-shore architecture.',
    deliverables: ['Custom Talent Radar', 'Dual-Shore Setup', 'KPI & QA Scorecards'],
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
    phase: 'Phase 03',
    badge: 'Structured Staging',
    title: 'Deploy & Execute',
    desc: 'Pre-vetted operators and engineers onboard through an encrypted bridge, validated via structured pilot workflows before full scaling.',
    deliverables: ['Phased Pilot Ramp-Up', 'AES-256 Secure Bridge', 'Floor Team Supervision'],
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
    phase: 'Phase 04',
    badge: '99.8% Precision',
    title: 'Optimise & Scale',
    desc: 'Continuous performance feedback, calibrated QA scoring, and data-driven audits to permanently eliminate error rates.',
    deliverables: ['Real-Time QA Scoring', 'Monthly Financial Packs', 'Zero-Variance Audits'],
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
      {STEPS.map((step) => (
        <div key={step.num} className="process__step reveal">
          <div className="process__step-header">
            <div className="process__icon-wrap" aria-hidden="true">
              {step.icon}
            </div>
            <div className="process__step-badges">
              <span className="process__phase">{step.phase}</span>
              <span className="process__badge-pill">{step.badge}</span>
            </div>
          </div>
          <h3 className="process__title">{step.title}</h3>
          <p className="process__desc">{step.desc}</p>
          <div className="process__deliverables">
            {step.deliverables.map((d, i) => (
              <span key={i} className="process__deliv-chip">
                <span className="process__deliv-dot"></span>
                {d}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
