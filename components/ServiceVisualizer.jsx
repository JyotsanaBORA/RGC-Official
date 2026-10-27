'use client';

import React from 'react';

const SERVICE_CONFIGS = {
  'bpo-sales': {
    badge: 'Sales & Revenue Operations',
    systemId: 'SYS-REV-PIPELINE',
    accentColor: '#D49F2D',
    accentGradient: 'linear-gradient(135deg, #D49F2D, #F59E0B)',
    flowTitle: 'High-Velocity Revenue Pipeline Architecture',
    steps: [
      {
        num: '01',
        title: 'Inbound SDR Ingestion',
        meta: '< 5 Mins Speed-to-Lead',
        tag: 'Instant Routing',
      },
      {
        num: '02',
        title: 'Executive Discovery (BDR)',
        meta: 'ICP & TAM Verification',
        tag: 'Intent Scored',
      },
      {
        num: '03',
        title: 'Inside Sales Closing (AE)',
        meta: 'Objection & Contract Cycle',
        tag: 'High Conversion',
      },
      {
        num: '04',
        title: 'MRR Expansion & Renewal',
        meta: 'Zero-Decay Customer Value',
        tag: 'Predictable MRR',
      },
    ],
    kpis: [
      { value: '3.4x', label: 'Pipeline Velocity' },
      { value: '< 5m', label: 'Inbound Response' },
      { value: '100%', label: 'CRM Compliance' },
    ],
  },
  'bpo-backoffice': {
    badge: 'Back Office Operations',
    systemId: 'SYS-OPS-ORCHESTRATE',
    accentColor: '#0EA5E9',
    accentGradient: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
    flowTitle: 'Precision Data Processing & Workflow Matrix',
    steps: [
      {
        num: '01',
        title: 'Document & OCR Ingestion',
        meta: 'Multi-stream Data Capture',
        tag: 'Automated Parser',
      },
      {
        num: '02',
        title: 'Dual-Key Validation Engine',
        meta: '99.8% Error Tolerance',
        tag: 'Zero-Error QA',
      },
      {
        num: '03',
        title: 'KYC & Compliance Verification',
        meta: 'Identity & Fraud Screening',
        tag: 'Audit Ready',
      },
      {
        num: '04',
        title: 'Same-Day Ledger Settlement',
        meta: 'Cutoff Window Protocol',
        tag: 'Continuous 24/7',
      },
    ],
    kpis: [
      { value: '99.8%', label: 'Accuracy SLA' },
      { value: '24/7/365', label: 'Continuous Floor' },
      { value: '-50%', label: 'Cost Reduction' },
    ],
  },
  'bpo-customer-service': {
    badge: 'Customer Services & Support',
    systemId: 'SYS-CX-OMNICHANNEL',
    accentColor: '#10B981',
    accentGradient: 'linear-gradient(135deg, #10B981, #34D399)',
    flowTitle: '24/7 Omnichannel Telemetry & Support Floor',
    steps: [
      {
        num: '01',
        title: 'Omnichannel Inbound Queue',
        meta: 'Voice, Chat, Ticket & WhatsApp',
        tag: 'Unified Influx',
      },
      {
        num: '02',
        title: 'Smart Intent Dispatch',
        meta: '< 25 Sec Speed-to-Answer',
        tag: 'Rapid Routing',
      },
      {
        num: '03',
        title: 'Tier-1 & Tier-2 Helpdesk',
        meta: '92.4% First Contact Resolution',
        tag: 'FCR Benchmark',
      },
      {
        num: '04',
        title: 'Calibrated QA & CSAT Scoring',
        meta: '4.8 / 5.0 Continuous Rating',
        tag: 'Executive CSAT',
      },
    ],
    kpis: [
      { value: '< 25s', label: 'Voice Response SLA' },
      { value: '> 92%', label: 'First Contact (FCR)' },
      { value: '4.8 / 5', label: 'CSAT Benchmark' },
    ],
  },
  'saas-digital-solutions': {
    badge: 'AI & SaaS Digital Solutions',
    systemId: 'SYS-AI-CLOUD-PIPELINE',
    accentColor: '#6366F1',
    accentGradient: 'linear-gradient(135deg, #6366F1, #818CF8)',
    flowTitle: 'Enterprise AI & Cloud Native Systems Architecture',
    steps: [
      {
        num: '01',
        title: 'Modern Web Client (Next.js)',
        meta: 'Sub-second Edge Hydration',
        tag: 'Intelligent UI',
      },
      {
        num: '02',
        title: 'REST & GraphQL API Gateway',
        meta: 'Bi-directional Cloud Connectors',
        tag: 'Middleware Fabric',
      },
      {
        num: '03',
        title: 'AI Inference & Automation Engine',
        meta: 'Custom LLMs & Intelligent RPA',
        tag: 'AI Runtime Core',
      },
      {
        num: '04',
        title: 'Secure Cloud & Payment Vaults',
        meta: 'SOC-2 / PCI-DSS Security',
        tag: 'Encrypted Core',
      },
    ],
    kpis: [
      { value: '99.95%', label: 'Infrastructure & AI' },
      { value: '< 45ms', label: 'API & AI Latency' },
      { value: 'SOC-2 / PCI', label: 'Security Grade' },
    ],
  },
  'web-development': {
    badge: 'Enterprise Web Engineering',
    systemId: 'SYS-WEB-REACT-NEXTJS',
    accentColor: '#3B82F6',
    accentGradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
    flowTitle: 'Modern Next.js, Headless CMS & Cloud Web Pipeline',
    steps: [
      {
        num: '01',
        title: 'Component Design & UX Architecture',
        meta: 'Responsive Figma to React System',
        tag: 'Design System',
      },
      {
        num: '02',
        title: 'Full-Stack Next.js / React Engine',
        meta: 'Server-Side Rendering & Edge Routing',
        tag: 'Modern Framework',
      },
      {
        num: '03',
        title: 'Headless CMS & API Integrations',
        meta: 'REST, GraphQL & Webhook Fabrics',
        tag: 'API Fabric',
      },
      {
        num: '04',
        title: 'Edge Deployment & Vitals Optimization',
        meta: 'Sub-second LCP & Global CDN Caching',
        tag: 'Edge Performance',
      },
    ],
    kpis: [
      { value: '< 1.2s', label: 'Largest Contentful Paint' },
      { value: '99.9%', label: 'Cloud Uptime SLA' },
      { value: '100%', label: 'Mobile Responsive Score' },
    ],
  },
  'bookkeeping-accountancy': {
    badge: 'Bookkeeping & Accountancy',
    systemId: 'SYS-FIN-GOVERNANCE',
    accentColor: '#D97706',
    accentGradient: 'linear-gradient(135deg, #D97706, #F59E0B)',
    flowTitle: 'Statutory Financial Governance & Audit Matrix',
    steps: [
      {
        num: '01',
        title: 'Daily Bank & Ledger Ingestion',
        meta: 'Zero Backlog Feed Sync',
        tag: 'Continuous Audit',
      },
      {
        num: '02',
        title: 'Double-Entry Reconciliation',
        meta: 'Accurate General Ledger Audit',
        tag: 'Pristine Books',
      },
      {
        num: '03',
        title: 'GST, TDS & Payroll Compliance',
        meta: '100% Punctual Compliance (India)',
        tag: 'Compliant Filings',
      },
      {
        num: '04',
        title: 'Executive Management Pack',
        meta: 'Punctual Monthly Delivery',
        tag: 'Board Ready MIS',
      },
    ],
    kpis: [
      { value: '100%', label: 'Statutory On-Time' },
      { value: 'Punctual', label: 'Monthly Closing' },
      { value: '100%', label: 'Compliance Record' },
    ],
  },
  'payroll-compensation': {
    badge: 'Payroll & Compensation Management',
    systemId: 'SYS-PAYROLL-DATA',
    accentColor: '#059669',
    accentGradient: 'linear-gradient(135deg, #059669, #10B981)',
    flowTitle: 'Workforce Payroll Data, Wage Calculations & Balance Matrix',
    steps: [
      {
        num: '01',
        title: 'Timesheet & Attendance Sync',
        meta: 'Allowances, OT & Leave Ingestion',
        tag: 'Timesheet Sync',
      },
      {
        num: '02',
        title: 'Wage & Compensation Compute',
        meta: 'Accurate Gross & Net Pay Compute',
        tag: 'Zero-Error Calc',
      },
      {
        num: '03',
        title: 'Statutory Deductions & Tax (TDS)',
        meta: 'PF, ESIC, PT & Form 16 Compliance',
        tag: 'Labor Law Guard',
      },
      {
        num: '04',
        title: 'Payroll Data & Balance Sheets',
        meta: 'Payout-Ready Sheets & Payslips',
        tag: 'Balance Ready',
      },
    ],
    kpis: [
      { value: '₹4,999', label: 'Plans Starting @ (per month)' },
      { value: '100%', label: 'Calculation Accuracy' },
      { value: 'Zero', label: 'Statutory Drift' },
    ],
  },
  'performance-management-consultancy': {
    badge: 'Performance Management Consultancy',
    systemId: 'SYS-QA-CALIBRATION',
    accentColor: '#8B5CF6',
    accentGradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
    flowTitle: 'Floor Telemetry & QA Interaction Calibration Matrix',
    steps: [
      {
        num: '01',
        title: 'Real-Time Floor Telemetry',
        meta: 'Call Pacing & Talk-Track Metrics',
        tag: 'Live Activity',
      },
      {
        num: '02',
        title: '100% Interaction QA Scoring',
        meta: 'Calibrated Evaluation Rubric',
        tag: 'Zero Drift',
      },
      {
        num: '03',
        title: 'Weekly Tactical Coaching Sprints',
        meta: 'Objection Handling Clinics',
        tag: 'Dialed Cadence',
      },
      {
        num: '04',
        title: 'Measurable Conversion Elevation',
        meta: '+32% Documented Output Lift',
        tag: 'Predictable ROI',
      },
    ],
    kpis: [
      { value: '+32%', label: 'Productivity Lift' },
      { value: '100%', label: 'Audited QA' },
      { value: '< 14 Days', label: 'Rapid Rollout' },
    ],
  },
  'digital-marketing': {
    badge: 'Digital Marketing & Growth',
    systemId: 'SYS-MKTG-ATTRIBUTION',
    accentColor: '#EC4899',
    accentGradient: 'linear-gradient(135deg, #EC4899, #F472B6)',
    flowTitle: 'Multi-Channel Acquisition & ROAS Attribution Funnel',
    steps: [
      {
        num: '01',
        title: 'Targeted Paid Influx (Meta/Google)',
        meta: 'High-Intent Commercial Audience',
        tag: 'Precision Ads',
      },
      {
        num: '02',
        title: 'High-Conversion Landing Architecture',
        meta: 'Frictionless Mobile-First Flow',
        tag: 'CRO Optimized',
      },
      {
        num: '03',
        title: 'Full Attribution Modeling (CAPI/GA4)',
        meta: 'Server-Side Event Tracking',
        tag: '100% Tracked',
      },
      {
        num: '04',
        title: 'Revenue Acceleration (4.2x ROAS)',
        meta: '-38% Reduced Cost Per Lead',
        tag: 'Compounding Scale',
      },
    ],
    kpis: [
      { value: '4.2x', label: 'Blended ROAS' },
      { value: '-38%', label: 'Lower CPL' },
      { value: '100%', label: 'Attribution Tracking' },
    ],
  },
  'recruitment-hiring': {
    badge: 'Recruitment & Hiring Solutions',
    systemId: 'SYS-TALENT-MATCH',
    accentColor: '#3B82F6',
    accentGradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
    flowTitle: 'Precision Talent Mapping & Placement Pipeline',
    steps: [
      {
        num: '01',
        title: 'Global Talent Sourcing & Mapping',
        meta: 'IT, Growth & Corporate Verticals',
        tag: 'Active TAM Search',
      },
      {
        num: '02',
        title: 'Multi-Stage Technical Evaluation',
        meta: 'Domain Skills & Portfolio Audit',
        tag: 'Top 3% Vetted',
      },
      {
        num: '03',
        title: 'Curated 48-Hour Shortlist',
        meta: 'Pre-Screened Executive Candidates',
        tag: '< 48h Delivery',
      },
      {
        num: '04',
        title: 'Placement & 90-Day Retention SLA',
        meta: '95% Long-Term Retention Benchmark',
        tag: 'Structured Replacement Support',
      },
    ],
    kpis: [
      { value: '< 48h', label: 'Shortlist Delivery' },
      { value: '95%', label: 'Retention SLA' },
      { value: 'Top 3%', label: 'Accepted Talent' },
    ],
  },
};

export default function ServiceVisualizer({ service }) {
  const slug = service?.slug || 'bpo-sales';
  const config =
    SERVICE_CONFIGS[slug] ||
    SERVICE_CONFIGS[service?.aliases?.[0]] ||
    SERVICE_CONFIGS['bpo-sales'];

  return (
    <div
      className="svc-canvas"
      style={{
        '--canvas-accent': config.accentColor,
        '--canvas-gradient': config.accentGradient,
      }}
    >
      {/* ── Console Header Bar ── */}
      <div className="svc-canvas__header">
        <div className="svc-canvas__controls">
          <span className="svc-canvas__dot svc-canvas__dot--red"></span>
          <span className="svc-canvas__dot svc-canvas__dot--amber"></span>
          <span className="svc-canvas__dot svc-canvas__dot--green"></span>
          <span className="svc-canvas__sys-id">{config.systemId}</span>
        </div>
        <div className="svc-canvas__center-tag">
          <span className="svc-canvas__center-label">Practice Architecture</span>
        </div>
        <div className="svc-canvas__status">
          <span className="svc-canvas__pulse-dot"></span>
          <span className="svc-canvas__status-text">Active SLA Execution</span>
        </div>
      </div>

      {/* ── Visual Flow Canvas ── */}
      <div className="svc-canvas__body">
        <div className="svc-canvas__title-row">
          <h3 className="svc-canvas__flow-title">{config.flowTitle}</h3>
          <span className="svc-canvas__practice-badge">{config.badge}</span>
        </div>

        {/* 4 Connected Process Stages */}
        <div className="svc-canvas__stages">
          {config.steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="svc-canvas__stage">
                <div className="svc-canvas__stage-head">
                  <span className="svc-canvas__stage-num">{step.num}</span>
                  <span className="svc-canvas__stage-tag">{step.tag}</span>
                </div>
                <h4 className="svc-canvas__stage-title">{step.title}</h4>
                <p className="svc-canvas__stage-meta">{step.meta}</p>
                <div className="svc-canvas__stage-indicator"></div>
              </div>

              {idx < config.steps.length - 1 && (
                <div className="svc-canvas__connector" aria-hidden="true">
                  <div className="svc-canvas__connector-line"></div>
                  <div className="svc-canvas__connector-arrow">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 8h8M9 4l4 4-4 4" />
                    </svg>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Bottom Telemetry Verification Row ── */}
        <div className="svc-canvas__footer">
          <div className="svc-canvas__kpis">
            {config.kpis.map((kpi, idx) => (
              <div key={idx} className="svc-canvas__kpi-chip">
                <span className="svc-canvas__kpi-val">{kpi.value}</span>
                <span className="svc-canvas__kpi-lbl">{kpi.label}</span>
              </div>
            ))}
          </div>
          <div className="svc-canvas__footer-note">
            <span className="svc-canvas__lock-icon">✦</span>
            <span>Audited & Governed by Reddington Global SLA Framework</span>
          </div>
        </div>
      </div>
    </div>
  );
}
