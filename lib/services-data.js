export const SERVICES = [
  {
    slug: 'recruitment',
    title: 'Recruitment & Staffing',
    eyebrow: 'Talent · Sourcing · Scale',
    image: '/assets/img/svc-recruitment-opt.webp',
    tagline: 'End-to-end talent sourcing engineered to fulfill high-volume headcount requirements with speed and precision.',
    overview:
      'End-to-end talent sourcing engineered to fulfill high-volume headcount requirements with speed and precision. We specialize in sourcing, screening, and deploying skilled professionals across both technical and non-technical domains to support fast-scaling business operations.',
    offerings: [
      { num: '01', title: 'High-Volume Headcount Staffing', desc: 'Rapid candidate sourcing and screening pipelines engineered to fill large-scale hiring needs across operational floors.' },
      { num: '02', title: 'Technical Talent Placement', desc: 'Targeted sourcing and technical assessments for software developers, IT support, systems engineers, and technical specialists.' },
      { num: '03', title: 'Non-Technical & Operations Staffing', desc: 'Specialized placement for customer support, sales, BPO, HR, finance, and corporate management personnel.' },
      { num: '04', title: 'Rigorous Screening & Assessment', desc: 'Multi-tier evaluation including domain competence, behavioral interviews, language proficiency, and background vetting.' },
      { num: '05', title: 'Contract & Flexible Staffing', desc: 'Agile workforce solutions for project-based initiatives, rapid scaling periods, and interim specialized assignments.' },
      { num: '06', title: 'Fast-Track Deployment & Onboarding', desc: 'Structured induction support to ensure candidates transition swiftly and reach peak floor productivity without delay.' },
    ],
    whyRG: [
      { title: 'Speed and Volume Precision', desc: 'Our talent sourcing engine scales seamlessly to fulfill urgent, high-volume hiring mandates on tight deadlines.' },
      { title: 'Comprehensive Domain Expertise', desc: 'Active talent pipelines across technical, operational, and corporate domains give you access to pre-vetted professionals.' },
      { title: 'Retention-Focused Placements', desc: 'We prioritize cultural and competency alignment to significantly lower early attrition and reduce recurring hiring expenses.' },
    ],
    slas: [
      { metric: '≤ 72 Hours', label: 'Average Time to Shortlist', detail: 'Pre-screened candidates delivered for high-priority mandates.' },
      { metric: '90 Days', label: 'Placement Warranty', detail: 'No-cost replacement guarantee on full-time placements.' },
      { metric: '100%', label: 'Compliance & Verification', detail: 'Background, credential, and reference checks conducted before onboarding.' },
    ],
  },
  {
    slug: 'immergix-bpo',
    title: 'Immergix BPO',
    eyebrow: 'Lifecycle BPO · Omnichannel · 24/7',
    image: '/assets/img/svc-bpo-opt.webp',
    tagline: 'Comprehensive business process outsourcing designed to manage customer interactions across the entire sales lifecycle.',
    overview:
      'Comprehensive business process outsourcing is designed to manage customer interactions across the entire sales lifecycle. Through our dedicated contact center operations, we handle inbound and outbound pre-sales engagement to qualify leads, alongside responsive post-sales support to resolve customer inquiries and boost retention.',
    offerings: [
      { num: '01', title: 'Inbound Pre-Sales & Lead Qualification', desc: 'Immediate handling of incoming prospect inquiries, qualifying high-intent leads, and scheduling consultations to accelerate pipeline velocity.' },
      { num: '02', title: 'Outbound Sales Engagement', desc: 'Targeted outbound campaigns conducted by trained sales professionals to nurture opportunities and drive conversions.' },
      { num: '03', title: 'Dedicated Contact Center Operations', desc: 'Turnkey contact center infrastructure, trained personnel, and floor supervision operating 24/7 with strict SLA adherence.' },
      { num: '04', title: 'Responsive Post-Sales Support', desc: 'Rapid ticket resolution, omnichannel customer service, and technical assistance designed to delight customers post-purchase.' },
      { num: '05', title: 'Retention & Account Care', desc: 'Proactive check-ins, customer success workflows, and win-back programs structured to minimize churn and foster long-term loyalty.' },
      { num: '06', title: 'Omnichannel Interaction Management', desc: 'Seamless customer communications unified across voice, live chat, email, SMS, and WhatsApp platforms.' },
    ],
    whyRG: [
      { title: 'Full Sales Lifecycle Coverage', desc: 'From first lead touchpoint to ongoing post-sale support, we create a seamless customer experience that maximizes customer lifetime value.' },
      { title: 'Dedicated & Embedded Operations', desc: 'Our teams adopt your brand voice and workflows completely, acting as an authentic extension of your core business.' },
      { title: 'Performance & Quality SLA Driven', desc: 'Monitored with strict KPIs, real-time dashboards, and daily QA checks to deliver consistent service excellence.' },
    ],
    slas: [
      { metric: '24/7/365', label: 'Floor Availability', detail: 'Multi-shift operational coverage with zero-downtime BCP protocols.' },
      { metric: '> 95%', label: 'SLA Adherence', detail: 'Consistently maintained service levels across inbound and outbound channels.' },
      { metric: '100%', label: 'QA Recorded & Calibrated', detail: 'Daily interaction scoring and weekly coaching feedback loops.' },
    ],
  },
  {
    slug: 'performance-management-consultancy',
    aliases: ['performance-management', 'management-consultancy'],
    title: 'Performance Management Consultancy',
    eyebrow: 'Advisory · Operations · QA',
    image: '/assets/img/svc-performance-opt.webp',
    tagline: 'Targeted advisory solutions built to streamline day-to-day operations and improve floor efficiency.',
    overview:
      'Targeted advisory solutions built to streamline day-to-day operations and improve floor efficiency. We implement robust performance management systems, optimize contact center workflows to maximize sales output, and deliver structured Quality Assurance (QA) frameworks to ensure interaction standards remain consistent.',
    offerings: [
      { num: '01', title: 'Performance Management Systems', desc: 'Design and implementation of robust KPI frameworks, scorecards, and real-time tracking systems to align individual goals with business outcomes.' },
      { num: '02', title: 'Workflow & Floor Optimization', desc: 'Streamlining day-to-day operations and contact center floor workflows to eliminate bottlenecks and maximize sales output.' },
      { num: '03', title: 'Structured Quality Assurance (QA)', desc: 'Comprehensive QA design including interaction monitoring, scoring calibration, coaching frameworks, and audit-ready compliance.' },
      { num: '04', title: 'Operational Audit & Process Re-engineering', desc: 'In-depth diagnostic reviews of current business processes to eliminate redundancies, reduce operational costs, and boost output.' },
      { num: '05', title: 'Coaching & Agent Development', desc: 'Targeted coaching programs for agents and team leaders to close skill gaps identified through QA and performance analytics.' },
      { num: '06', title: 'Workforce Management & Analytics', desc: 'Capacity forecasting, shift scheduling, SLA management, and executive reporting dashboards for clear operational visibility.' },
    ],
    whyRG: [
      { title: 'Operational Practitioners, Not Theorists', desc: 'Our consultants have managed high-pressure contact centers and enterprise operations from the inside — we deliver systems, not slide decks.' },
      { title: 'Data-Led Continuous Improvement', desc: 'Every framework is grounded in live metrics and calibrated QA data to ensure measurable, sustained performance gains.' },
      { title: 'Embedded Execution Support', desc: 'We embed directly with your leadership and floor teams to implement change seamlessly without disrupting business continuity.' },
    ],
    slas: [
      { metric: '100%', label: 'Data-Led Interventions', detail: 'All performance frameworks anchored on empirical operational metrics.' },
      { metric: 'Embedded', label: 'On-Floor Advisory', detail: 'Consultants work directly alongside your teams to ensure rapid adoption.' },
      { metric: 'Audit-Ready', label: 'Compliance & QA Standards', detail: 'Robust frameworks designed to withstand internal and regulatory audits.' },
    ],
  },
  {
    slug: 'payroll-compensation',
    title: 'Payroll & Compensation Management',
    eyebrow: 'Payroll · Compliance · Compensation',
    image: '/assets/img/svc-payroll-opt.webp',
    tagline: 'A secure, streamlined payroll processing service designed to handle timely salary disbursements and end-to-end workforce compensation.',
    overview:
      'A secure, streamlined payroll processing service designed to handle timely salary disbursements and end-to-end workforce compensation. We manage wage calculations, tax deductions, and statutory compliance reporting to ensure operational accuracy and peace of mind.',
    offerings: [
      { num: '01', title: 'Salary Disbursement & Processing', desc: 'Automated, timely salary calculations and direct bank transfers with accurate pay slip generation for your entire workforce.' },
      { num: '02', title: 'Wage & Overtime Calculations', desc: 'Precise computation of regular wages, overtime hours, shift allowances, incentives, bonuses, and reimbursement claims.' },
      { num: '03', title: 'Statutory Tax Deductions', desc: 'End-to-end management of income tax (TDS), provident fund (PF), ESI, professional tax, and other regulatory withholdings.' },
      { num: '04', title: 'Compliance Reporting & Filings', desc: 'Preparation and submission of monthly statutory returns, challans, and annual filings ensuring full compliance with labor laws.' },
      { num: '05', title: 'Compensation & Benefits Structuring', desc: 'Advisory on competitive compensation frameworks, salary structuring, and tax-efficient benefits packages for employees.' },
      { num: '06', title: 'Audits & Reconciliation', desc: 'Comprehensive payroll reconciliation, ledger entries, and audit trail maintenance to ensure 100% financial transparency.' },
    ],
    whyRG: [
      { title: 'Zero-Error Payroll Guarantee', desc: 'Multi-tier verification processes ensure 100% precision in salary computations, deductions, and payout schedules.' },
      { title: 'Absolute Data Security & Confidentiality', desc: 'Enterprise-grade encryption and access controls safeguard sensitive employee salary and banking details.' },
      { title: 'Complete Regulatory Compliance', desc: 'We stay ahead of evolving statutory requirements so your business remains completely compliant and audit-ready.' },
    ],
    slas: [
      { metric: '100%', label: 'On-Time Disbursement', detail: 'Guaranteed salary processing on agreed monthly cutoff dates.' },
      { metric: '0% Variance', label: 'Statutory Accuracy', detail: 'Precise calculation and timely remittance of TDS, PF, ESI, and PT.' },
      { metric: 'AES-256', label: 'Data Confidentiality', detail: 'Strict encryption protocols for all sensitive compensation and bank data.' },
    ],
  },
  {
    slug: 'saas-digital-solutions',
    aliases: ['saas-services'],
    title: 'SaaS & Digital Solutions',
    eyebrow: 'Cloud · Engineering · Integrations',
    image: '/assets/img/svc-saas-opt.webp',
    tagline: 'A modern digital presence and intelligent software architecture give your business a serious competitive edge.',
    overview:
      'A modern digital presence and intelligent software architecture give your business a serious competitive edge. We build cohesive, high-speed ecosystems where custom web experiences, unified CRMs, and third-party platforms communicate seamlessly to automate operations and fuel scalable growth.',
    offerings: [
      { num: '01', title: 'Website Design & Development', desc: 'Modern, responsive, and conversion-focused web applications built with cutting-edge frontends and optimized user experiences.' },
      { num: '02', title: 'API Integration & Architecture', desc: 'Design, development, and secure integration of REST and GraphQL APIs to seamlessly connect disparate platforms and databases.' },
      { num: '03', title: '3rd-Party Software Integration', desc: 'Bi-directional synchronization with leading CRM, ERP, telephony, marketing automation, and communication tools.' },
      { num: '04', title: 'Payment Gateway Integration', desc: 'Secure, frictionless checkout implementations with Stripe, Razorpay, PayPal, UPI, and global merchant processors.' },
      { num: '05', title: 'Custom SaaS Platform Development', desc: 'Cloud-native SaaS applications designed with scalable multi-tenant architecture, robust security, and intuitive admin consoles.' },
      { num: '06', title: 'Maintenance & SLA Support', desc: 'Continuous system monitoring, API uptime tracking, security patching, and ongoing feature enhancements.' },
    ],
    whyRG: [
      { title: 'Full-Stack Technical Capabilities', desc: 'Our engineers handle everything from visual UX/UI design to deep backend API protocols and database pipelines.' },
      { title: 'Seamless Ecosystem Connectivity', desc: 'We eliminate data silos by connecting all your internal tools, CRMs, and third-party SaaS services into a unified workflow.' },
      { title: 'Security & Payment Standards', desc: 'All payment integrations and API connections follow stringent PCI-DSS, TLS, and industry-standard security best practices.' },
    ],
    slas: [
      { metric: '99.9%', label: 'System Uptime SLA', detail: 'High-availability cloud infrastructure and continuous monitoring.' },
      { metric: 'PCI-DSS', label: 'Secure Architecture', detail: 'Compliant payment integrations, encrypted endpoints, and tokenized data.' },
      { metric: '2-Week', label: 'Agile Sprint Cadence', detail: 'Predictable delivery cycles with continuous deployment and versioning.' },
    ],
  },
  {
    slug: 'bookkeeping-statutory-compliance',
    aliases: ['bookkeeping'],
    title: 'Bookkeeping & Statutory Compliance',
    eyebrow: 'Accounting · GST & TDS · Compliance',
    image: '/assets/img/svc-compliance-opt.webp',
    tagline: 'Clean financial records do more than keep authorities satisfied—they dictate how confidently you navigate your next stage of growth.',
    overview:
      'Clean financial records do more than keep authorities satisfied—they dictate how confidently you navigate your next stage of growth. We handle the intricacies of regular bookkeeping, routine reporting, and multi-tier tax compliance, so your financial picture remains clear, compliant, and dependable.',
    offerings: [
      { num: '01', title: 'Financial Data Entry & Ledger', desc: 'Systematic recording of daily sales, purchases, bank transactions, expenses, and ledger entries with complete precision.' },
      { num: '02', title: 'Tax Filing & Computation', desc: 'Timely preparation and electronic filing of corporate and business income tax returns to ensure zero penalty exposure.' },
      { num: '03', title: 'GST Management', desc: 'End-to-end GST compliance including monthly/quarterly return filings (GSTR-1, GSTR-3B, GSTR-9), input tax credit (ITC) reconciliation, and e-invoicing.' },
      { num: '04', title: 'TDS Filing & Reconciliation', desc: 'Calculation, deposit, and quarterly filing of TDS returns (Form 24Q, 26Q), along with generation and issuance of Form 16/16A certificates.' },
      { num: '05', title: 'Statutory Compliance Support', desc: 'Adherence to regional and national financial regulations, audit readiness preparation, and liaison with regulatory authorities.' },
      { num: '06', title: 'Monthly Financial Reports', desc: 'Detailed monthly profit & loss statements, balance sheets, cash flow reports, and debtor aging analyses for leadership decision-making.' },
    ],
    whyRG: [
      { title: 'Indian & International Tax Know-How', desc: 'Deep mastery of Indian tax statutes (GST, TDS, Income Tax) alongside global bookkeeping standards.' },
      { title: 'Audit-Ready Books at All Times', desc: 'Every voucher, invoice, and ledger entry is organized and cross-referenced, making annual audits frictionless.' },
      { title: 'Timely Reporting for Sound Decisions', desc: 'Receive punctual monthly financial packs that give you clear visibility into revenue trends, cost structures, and cash burn.' },
    ],
    slas: [
      { metric: '5th of Month', label: 'Punctual Book Closing', detail: 'Reconciled profit & loss and balance sheets delivered without delay.' },
      { metric: 'Zero Penalty', label: 'Filing Guarantee', detail: 'Timely and accurate e-filing for GST returns, TDS forms, and statutory dues.' },
      { metric: '100%', label: 'Audit-Ready Records', detail: 'Every transaction mapped to source documents for seamless external audits.' },
    ],
  },
];

export function getServiceBySlug(slug) {
  return SERVICES.find(s => s.slug === slug || s.aliases?.includes(slug)) || null;
}
