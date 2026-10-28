/**
 * Reddington Global — Service Architecture
 * Categorized into 3 Core Verticals:
 *  1. BPO & Customer Operations (Customer Services, Back Office, Sales, Performance Management, Recruitment)
 *  2. Software Development & IT Solutions (SaaS Solutions, Digital Marketing & Growth)
 *  3. Bookkeeping & Accounting (Bookkeeping & Accounts, Payroll & Compensation)
 */

export const SERVICE_CATEGORIES = [
  {
    id: 'bpo-operations',
    name: 'BPO & Customer Operations',
    shortName: 'BPO & Operations',
    tagline: '24/7 Floor Telemetry, Omnichannel CX & Back-Office Scaling',
    description:
      'Comprehensive customer care operations, scalable back-office administration, high-velocity sales support, KYC compliance verification, and 24/7 technical helpdesk delivery.',
    capabilities: [
      'Customer Service',
      'Back Office',
      'Sales Support',
      'KYC / Operations',
      '24/7 Support',
    ],
  },
  {
    id: 'software-development',
    name: 'Software Development & IT Solutions',
    shortName: 'Software & IT Solutions',
    tagline: 'AI, Web Engineering, Custom APIs, Cloud & Integrations',
    description:
      'Scalable cloud-native digital ecosystems, high-conversion Web & SaaS applications, enterprise AI & automation workflows, custom REST/GraphQL API fabrics, and DevOps cloud hosting.',
    capabilities: [
      'Web Development',
      'AI & Automation',
      'SaaS & Applications',
      'APIs & Integrations',
      'Cloud',
    ],
  },
  {
    id: 'accounting-finance',
    name: 'Bookkeeping & Accounting',
    shortName: 'Bookkeeping & Accounting',
    tagline: 'Audit-Ready Ledgers, Reconciliation, Tax & Financial Reporting',
    description:
      'Pristine financial transparency and zero regulatory penalties. Day-to-day general ledgers, multi-account reconciliations, statutory tax compliance (GST & TDS), and punctual monthly executive reporting.',
    capabilities: [
      'Bookkeeping',
      'Payroll',
      'Reconciliation',
      'Tax Support',
      'Reporting',
    ],
  },
];

export const SERVICES = [
  // ═══════════════════════════════════════════════════════════════════
  // 1. BPO SERVICES
  // ═══════════════════════════════════════════════════════════════════
  {
    slug: 'bpo-sales',
    aliases: ['sales'],
    category: 'bpo-operations',
    categoryName: 'BPO & Customer Operations',
    title: 'Sales & Revenue Operations',
    shortTitle: 'Sales BPO',
    eyebrow: 'BPO Services · Inbound & Outbound Pipeline',
    image: '/assets/img/svc-sales-opt.webp',
    tagline: 'High-velocity sales execution, qualified pipeline generation, and dedicated outbound conversion teams.',
    overview:
      'Comprehensive business process outsourcing designed to manage customer interactions across the entire sales lifecycle. Through our dedicated contact center operations, we handle inbound and outbound pre-sales engagement to qualify leads, alongside responsive post-sales support to resolve customer inquiries and boost retention.',
    stats: [
      { metric: '3.4x', label: 'Average Pipeline Velocity' },
      { metric: '< 5 Mins', label: 'Inbound Lead Response Time' },
      { metric: '100%', label: 'CRM & Activity Compliance' },
    ],
    challengeVsSolution: {
      challenge: 'Unqualified lead decay, high SDR turnover, inconsistent outbound calling cadences, and soaring cost-per-acquisition (CPA).',
      solution: 'Dedicated high-performance sales floor with continuous objection handling training, dialed outbound cadences, and real-time conversion dashboards.',
      impact: 'Immediate pipeline expansion, lower acquisition costs, and predictable monthly recurring revenue (MRR) acceleration.',
    },
    offerings: [
      { num: '01', title: 'Inbound Lead Qualification (SDR)', desc: 'Instant response protocols for incoming demo requests and web inquiries to qualify intent and book executive discovery meetings.' },
      { num: '02', title: 'Outbound Prospecting & Account Calling (BDR)', desc: 'Disciplined multi-touch phone, email, and social cadences targeting verified decision-makers across your TAM.' },
      { num: '03', title: 'Inside Sales & Deal Closing', desc: 'Pre-screened account executives managing consultative sales cycles, overcoming objections, and securing closed-won contracts.' },
      { num: '04', title: 'Pipeline & CRM Hygiene Governance', desc: 'Real-time pipeline tracking, deal stage verification, and CRM data enrichment across Salesforce, HubSpot, and Zoho.' },
      { num: '05', title: 'Win-Back & Contract Renewal Desk', desc: 'Strategic outreach to dormant accounts and expiring contracts to minimize churn and reactivate high-margin revenue.' },
      { num: '06', title: 'Omnichannel Sales Cadences', desc: 'Integrated telephony, live web chat sales conversion, and automated sequence workflows tailored to high-ticket B2B deals.' },
    ],
    slas: [
      { metric: '< 5 Mins', label: 'Inbound Speed-to-Lead', detail: 'Rapid routing for incoming high-intent buyer inquiries.' },
      { metric: '100%', label: 'QA Recorded & Calibrated', detail: 'Every interaction analyzed for script adherence and closing technique.' },
      { metric: 'Bi-Weekly', label: 'Revenue Calibration Review', detail: 'Executive conversion reviews and pacing adjustments.' },
    ],
    faqs: [
      {
        q: 'What is your average speed-to-lead for incoming inbound inquiries?',
        a: 'Our inbound SDR team responds to incoming demo requests, web leads, and form fills within under 5 minutes during operational hours, maintaining contact rates above 78% before buyer intent cools.',
      },
      {
        q: 'Do your sales development reps (SDRs/BDRs) operate directly in our CRM?',
        a: 'Yes. Our sales representatives work natively inside your Salesforce, HubSpot, or Zoho CRM environment under strict role-based access. All call recordings, stage updates, meeting notes, and deal ownership fields are logged in real time.',
      },
      {
        q: 'How do you train agents on our product nuances and objection handling?',
        a: 'Before going live, all dedicated sales reps undergo an intensive 5-to-10 day product certification covering your value proposition, ideal customer profile (ICP), competitor battle cards, and rigorous mock call objection handling simulations.',
      },
      {
        q: 'How do you audit sales interaction quality and adherence to scripts?',
        a: '100% of outbound and inbound sales interactions are digitally recorded and audited by our dedicated QA team. We run weekly scoring calibration sessions to evaluate talk-to-listen ratios, objection handling, and pitch compliance.',
      },
      {
        q: 'Can we scale our sales floor capacity up or down for seasonal campaigns?',
        a: 'Yes. Our dual-shore delivery model is built for operational elasticity. You can expand your SDR pod ahead of peak quarters or scale back capacity during quieter cycles with flexible 30-day notice terms.',
      },
      {
        q: 'What specific deliverables do we receive from the ₹99 Sales Strategy Session?',
        a: 'You will meet 1-on-1 with a Senior Revenue Operations Director. We analyze your current pipeline velocity, identify drop-off bottlenecks across your sales funnel, review your lead qualification criteria, and provide a tailored outbound execution roadmap.',
      },
    ],
  },
  {
    slug: 'bpo-backoffice',
    aliases: ['backoffice', 'back-office', 'operations'],
    category: 'bpo-operations',
    categoryName: 'BPO & Customer Operations',
    title: 'Back Office Operations',
    shortTitle: 'Back Office BPO',
    eyebrow: 'BPO Services · Data Operations & Admin',
    image: '/assets/img/svc-backoffice-opt.webp',
    tagline: 'Precision data operations, workflow orchestration, and high-volume transaction processing.',
    overview:
      'Eliminate operational friction and administrative bottlenecks with our specialized back office delivery teams. We manage complex data workflows, KYC verification, order processing, and administrative support with dual-shore execution, institutional-grade data security, and near-zero error tolerances.',
    stats: [
      { metric: '99.8%', label: 'Data Accuracy Benchmark' },
      { metric: '24/7/365', label: 'Continuous Floor Execution' },
      { metric: '40–60%', label: 'Operational Cost Reduction' },
    ],
    challengeVsSolution: {
      challenge: 'Manual processing delays, high error rates in transactional records, fragmented compliance documentation, and expensive internal overhead.',
      solution: 'Structured operational units operating with automated validation rules, double-entry verification checkpoints, and strict SLA controls.',
      impact: 'Rapid turnaround times, flawless audit compliance, and scalable capacity that grows without linear hiring costs.',
    },
    offerings: [
      { num: '01', title: 'High-Volume Transaction Processing', desc: 'Rapid, error-free processing of invoices, billing orders, claims, and administrative records under strict SLAs.' },
      { num: '02', title: 'KYC, Identity & Compliance Verification', desc: 'Rigorous customer identification, document validation, credential checks, and fraud screening for regulated sectors.' },
      { num: '03', title: 'Catalog, Inventory & Master Data Management', desc: 'Continuous catalog updating, multi-channel product uploads, data taxonomy tagging, and deduplication.' },
      { num: '04', title: 'Document Digitization & OCR Workflows', desc: 'Automated document indexing, metadata tagging, archival management, and cloud storage compliance.' },
      { num: '05', title: 'Account Reconciliation & Clerical Support', desc: 'Systematic cross-checking of ledger entries, merchant payouts, statements, and operational dispute handling.' },
      { num: '06', title: 'Workflow Automation & Scripting', desc: 'Implementation of smart automation macros and robotic workflow triggers to eliminate repetitive manual entry.' },
    ],
    slas: [
      { metric: '99.8%', label: 'Accuracy SLA', detail: 'Dual-check QA governance on all transactional workflows.' },
      { metric: 'Same-Day', label: 'Turnaround Guarantee', detail: 'Transactions processed within agreed daily cutoff windows.' },
      { metric: 'ISO / AES', label: 'Data Security Protocols', detail: 'Strict zero-leakage access controls and clean-desk operational floors.' },
    ],
    faqs: [
      {
        q: 'What daily transaction volumes and turnaround times can your back-office floor handle?',
        a: 'Our back-office delivery units process from 500 to over 50,000 transactions daily across billing orders, claims, invoices, and catalog listings, operating under guaranteed same-day or next-business-day SLA cutoffs.',
      },
      {
        q: 'How do you ensure 99.8%+ accuracy in transactional data processing?',
        a: 'We implement a dual-check QA governance model combining automated algorithmic validation rules (format checks, duplicate detection) with mandatory double-entry verification by senior quality analysts.',
      },
      {
        q: 'What data privacy and security controls protect our customer records?',
        a: 'Our operational floors operate under strict clean-desk policies, ISO/IEC compliance, and AES-256 encrypted endpoints. Agents work in sandboxed environments with no external USB access, screen recording, or unauthorized data transmission.',
      },
      {
        q: 'Can your team automate repetitive data workflows with custom scripts or RPA?',
        a: 'Yes. In addition to manual processing, our automation specialists develop custom robotic process automation (RPA) macros and API connectors that eliminate repetitive keystrokes, reducing processing cycle times by 40–60%.',
      },
      {
        q: 'How do we transition and hand over our existing back-office SOPs?',
        a: 'We execute a structured 3-stage handover: shadow training on your existing Standard Operating Procedures (SOPs), parallel run execution with dual sign-off, and final SLA baseline certification before taking over production floor responsibility.',
      },
      {
        q: 'What is covered during the ₹99 Back Office Discovery Consultation?',
        a: 'A Senior Operations Architect evaluates your current transaction volumes, error rates, manual backlogs, and workflow bottlenecks, delivering a quantified cost-reduction and turnaround optimization plan.',
      },
    ],
  },
  {
    slug: 'bpo-customer-service',
    aliases: ['customer-services', 'customer-service', 'customer-care', 'bpo-customer-ops', 'bpo-operations', '24-7-support'],
    category: 'bpo-operations',
    categoryName: 'BPO & Customer Operations',
    title: 'Customer Services & Support',
    shortTitle: 'Customer Services',
    eyebrow: 'BPO Services · Omnichannel 24/7 Support',
    image: '/assets/img/svc-customercare-opt.webp',
    tagline: 'World-class 24/7 omnichannel customer care, technical resolution desks, and client retention.',
    overview:
      'Comprehensive contact center operations designed to manage customer interactions across the entire lifecycle. We handle inbound and outbound pre-sales engagement alongside responsive post-sales support, Tier-1/Tier-2 helpdesks, and empathetic client retention workflows across voice, chat, email, and social channels.',
    stats: [
      { metric: '> 92%', label: 'First Contact Resolution (FCR)' },
      { metric: '< 25 Sec', label: 'Average Voice Speed-to-Answer' },
      { metric: '4.8 / 5', label: 'Average CSAT Benchmark' },
    ],
    challengeVsSolution: {
      challenge: 'Long wait times, robotic responses, high customer churn, and costly overnight shift staffing.',
      solution: 'Dedicated multi-shift operational floors with domain-trained agents, omnichannel ticketing integrations, and daily calibrated QA scoring.',
      impact: 'Industry-leading CSAT/NPS scores, enhanced customer retention, and seamless 24/7 global customer care.',
    },
    offerings: [
      { num: '01', title: '24/7 Omnichannel Voice & Chat Support', desc: 'Rapid, empathetic live response across phone, web live chat, mobile app ticketing, and WhatsApp Business.' },
      { num: '02', title: 'Tier-1 & Tier-2 Technical Helpdesk', desc: 'Structured troubleshooting, bug triage, account recovery, and SaaS application support guided by detailed SOPs.' },
      { num: '03', title: 'Proactive Customer Success & Retention', desc: 'Scheduled milestone check-ins, VIP client escalation desks, and proactive outreach to at-risk accounts.' },
      { num: '04', title: 'Social Media & Reputation Response', desc: 'Live monitoring and professional resolution across Google Reviews, Trustpilot, LinkedIn, and social media channels.' },
      { num: '05', title: 'Multilingual & Global Shift Delivery', desc: 'Round-the-clock shift structures covering North American, European, and Asia-Pacific working hours seamlessly.' },
      { num: '06', title: 'Voice Analytics & Continuous QA Coaching', desc: '100% call and interaction recording with weekly scoring calibration to continually elevate agent performance.' },
    ],
    slas: [
      { metric: '< 25 Sec', label: 'Voice Response SLA', detail: 'Rapid agent connection with under 2% abandonment rates.' },
      { metric: '> 90%', label: 'CSAT Benchmark Guarantee', detail: 'Maintained through calibrated coaching and weekly QA audits.' },
      { metric: '24/7/365', label: 'Floor Availability', detail: 'Guaranteed continuity with redundant dual-shore infrastructure.' },
    ],
    faqs: [
      {
        q: 'Do your support agents provide 24/7/365 coverage across US, UK, and APAC time zones?',
        a: 'Yes. We operate dedicated 24/7/365 rotational shifts covering Eastern, Pacific, GMT, and Asia-Pacific working hours seamlessly, ensuring zero coverage gaps on weekends, holidays, or overnight shifts.',
      },
      {
        q: 'Which customer support platforms and ticketing systems do you integrate with?',
        a: 'Our agents work natively inside Zendesk, Freshdesk, Salesforce Service Cloud, Intercom, Gorgias, Zoho Desk, and omnichannel WhatsApp Business APIs, adhering to your established tagging and escalation workflows.',
      },
      {
        q: 'How do you handle Tier-1 vs. Tier-2 technical support escalations?',
        a: 'Tier-1 agents resolve standard inquiries, order tracking, and account resets using verified knowledge base SOPs. Complex technical bugs, billing disputes, or API errors are triaged and escalated to Tier-2 specialists or your engineering team with complete diagnostic logs.',
      },
      {
        q: 'What are your target First Contact Resolution (FCR) and CSAT benchmarks?',
        a: 'We maintain contractually governed targets of > 92% First Contact Resolution (FCR) and average Customer Satisfaction (CSAT) scores of 4.8 / 5.0, enforced through daily calibrated quality scoring.',
      },
      {
        q: 'Are your customer service agents dedicated exclusively to our brand?',
        a: 'We provide both dedicated team pods (agents exclusive to your brand, trained solely on your product voice) and shared support pools for lower-volume startups seeking cost-effective 24/7 coverage.',
      },
      {
        q: 'What insights will I gain from the ₹99 Customer Support Strategy Session?',
        a: 'We audit your historical ticket response times, average handle times (AHT), ticket deflection opportunities, and customer churn drivers, delivering a concrete blueprint to lower cost per ticket while boosting CSAT.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. CONSULTANCY SERVICES
  // ═══════════════════════════════════════════════════════════════════
  {
    slug: 'saas-digital-solutions',
    aliases: ['ai', 'ai-services', 'ai-solutions', 'saas', 'saas-services', 'it-services', 'it', 'software-development', 'software-it-solutions', 'applications', 'cloud'],
    category: 'software-development',
    categoryName: 'Software Development & IT Solutions',
    title: 'AI, SaaS & Digital Solutions',
    shortTitle: 'AI & SaaS Solutions',
    eyebrow: 'Consultancy · Enterprise AI, Cloud & SaaS Systems',
    image: '/assets/img/svc-saas-opt.webp',
    tagline: 'Enterprise AI engineering, custom LLM solutions, full-stack SaaS applications, and intelligent cloud automation built for scale.',
    overview:
      'We architect, build, and deploy enterprise AI solutions and scalable cloud-native digital ecosystems. From custom LLMs, autonomous agents, and AI workflow automation to modern SaaS platforms, REST/GraphQL API fabrics, and high-performance cloud infrastructure, we eliminate technical silos and automate complex operational overhead to drive sustainable enterprise velocity.',
    stats: [
      { metric: '99.95%', label: 'Target System Uptime' },
      { metric: '2-Week', label: 'Agile Delivery Sprints' },
      { metric: 'SOC-2 / PCI', label: 'Security & Compliance' },
    ],
    challengeVsSolution: {
      challenge: 'Manual operational processes, disjointed SaaS tools, legacy software debt, and difficulty deploying production-grade AI safely.',
      solution: 'Enterprise AI architectures combined with modern cloud microservices, fine-tuned agent workflows, and bi-directional API pipelines.',
      impact: 'Automated business operations, sub-second intelligence, and enterprise-grade software performance with measurable ROI.',
    },
    offerings: [
      { num: '01', title: 'Enterprise AI & Custom LLM Solutions', desc: 'Custom AI models, specialized LLM agents, Retrieval-Augmented Generation (RAG), and proprietary knowledge bases integrated directly into your business stack.' },
      { num: '02', title: 'Intelligent AI Workflow Automation & RPA', desc: 'End-to-end operational automation using intelligent bots to process multi-modal documents, extract data, and execute cross-platform tasks autonomously.' },
      { num: '03', title: 'Modern SaaS Applications & Dashboards', desc: 'Full-stack enterprise applications built with secure multi-tenant architectures, real-time analytics, and role-based permissions.' },
      { num: '04', title: 'Custom REST & GraphQL API Integration', desc: 'Bi-directional pipelines connecting AI agents, internal databases, CRMs, and external cloud infrastructure.' },
      { num: '05', title: 'Global Payment Gateways & Billing Automation', desc: 'Frictionless checkout integrations with Stripe, Razorpay, UPI, PayPal, and automated recurring billing engines.' },
      { num: '06', title: 'Cloud Hosting, MLOps & DevOps (AWS / Azure / GCP)', desc: 'Secure cloud hosting, GPU inference optimization, Docker containerization, CI/CD automated deployments, and continuous SLA monitoring.' },
    ],
    slas: [
      { metric: '99.95%', label: 'Infrastructure & AI Uptime', detail: 'High-availability multi-region cloud deployment.' },
      { metric: '< 2 Hrs', label: 'Critical Incident Response', detail: 'Dedicated Level-3 engineering escalation protocols.' },
      { metric: '100%', label: 'Code Review & Automated CI/CD', detail: 'Zero unreviewed code deployed to production environments.' },
    ],
    faqs: [
      {
        q: 'How do you deploy enterprise AI models and custom LLMs without data leakage?',
        a: 'We engineer secure enterprise AI architectures using private VPC deployments (AWS Bedrock, Azure OpenAI) with zero-data-retention agreements. Your proprietary corporate data and customer prompts are never used to train public foundation models.',
      },
      {
        q: 'Who owns the intellectual property (IP) and source code of custom software?',
        a: 'You retain 100% full intellectual property and source code ownership from day one. All repositories, Docker containers, database schemas, and documentation are transferred directly to your organization.',
      },
      {
        q: 'What technology stacks and cloud frameworks do your engineering pods use?',
        a: 'We specialize in Next.js (App Router, Server Components), React, TypeScript, Node.js, Python (FastAPI, LangChain, LlamaIndex), PostgreSQL, Redis, Docker, and enterprise cloud infrastructure on AWS, GCP, and Azure.',
      },
      {
        q: 'How are development sprints structured and tracked?',
        a: 'We operate in disciplined 2-week Agile sprints with sprint planning, bi-weekly live demo sessions, automated CI/CD staging environments, and real-time sprint burn-down tracking in Jira or Linear.',
      },
      {
        q: 'Do you provide ongoing DevOps, security patching, and Level-3 incident response?',
        a: 'Yes. We offer continuous SLA-backed maintenance contracts covering 24/7 infrastructure monitoring, automated database backups, security dependency patching, and sub-2-hour critical incident response guarantees.',
      },
      {
        q: 'What is evaluated during the ₹99 AI & SaaS Architecture Consultation?',
        a: 'A Principal Cloud & AI Architect reviews your technical stack, database design, API bottlenecks, and automation feasibility, providing a concrete system architecture diagram and development roadmap.',
      },
    ],
  },
  {
    slug: 'web-development',
    aliases: ['web-dev', 'website-development', 'full-stack-web', 'frontend-development', 'web-engineering', 'react-development', 'nextjs-development', 'web-saas', 'apis', 'api-integrations'],
    category: 'software-development',
    categoryName: 'Software Development & IT Solutions',
    title: 'Website Development',
    shortTitle: 'Web Development',
    eyebrow: 'Developer Service · Website For Your Business',
    image: '/assets/img/svc-saas-opt.webp',
    tagline: 'Mobile-ready business websites and API integrations built by dedicated developers. Plans starting @ ₹4,999, live in as little as 10 days.',
    overview:
      'Stop struggling with templates you outgrow and monthly fees to site builders. Plans start @ ₹4,999 for a 5-page business site, with Standard and Premium plans for brand-matched designs, lead automation, online payments, bookings, CRM and WhatsApp API integrations. Book a ₹99 consultation and we recommend the right plan, timeline and quote for your business.',
    stats: [
      { metric: '₹4,999', label: 'Plans Starting @' },
      { metric: '10 Days', label: 'Fastest Idea to Live Site' },
      { metric: '₹99', label: 'Expert Consultation' },
    ],
    challengeVsSolution: {
      challenge: 'Clunky templates you outgrow, expensive monthly subscription fees to site builders, broken mobile layouts, and slow loading times that lose customer inquiries.',
      solution: 'Custom engineered by real developers, with plans that grow with you: from a 5-page site to payments, bookings and CRM integrations, with zero monthly fees to us.',
      impact: 'A professional, lightning-fast digital storefront that builds trust when customers Google you before calling.',
    },
    offerings: [
      { num: '01', title: 'Up to 5 Custom Pages', desc: 'Home, About, Services, Gallery, and Contact pages custom structured for your business.' },
      { num: '02', title: 'Mobile-Friendly Design', desc: 'Looks sharp, responsive, and pixel-perfect on every smartphone, tablet, and desktop.' },
      { num: '03', title: 'WhatsApp Chat & Click-to-Call', desc: 'Floating WhatsApp lead button plus one-tap click-to-call for immediate customer enquiries.' },
      { num: '04', title: 'Lead Enquiry Form', desc: 'Custom contact and inquiry capture form delivering leads straight to your email inbox.' },
      { num: '05', title: 'Google Maps Location', desc: 'Interactive Google Maps embed so local customers find your storefront or clinic easily.' },
      { num: '06', title: 'Basic SEO Setup', desc: 'Meta tags, sitemap, and search engine submission so your business is indexed on Google Search.' },
      { num: '07', title: 'SSL Security Padlock', desc: 'Secure HTTPS protocol setup providing instant browser trust and data protection.' },
      { num: '08', title: 'Social Media Links', desc: 'Direct links connecting your website to Instagram, Facebook, LinkedIn, and YouTube.' },
      { num: '09', title: 'APIs & Integrations', desc: 'Razorpay payments, WhatsApp Business alerts, appointment booking, Google Sheets and CRM (Zoho / HubSpot) connections, scoped during your consultation.' },
      { num: '10', title: 'Revisions & Free Support', desc: 'Revision rounds before launch and free developer support after launch, based on your plan.' },
    ],
    slas: [
      { metric: 'From 10 Days', label: 'Committed Launch Timeline', detail: 'Your exact launch date is confirmed on the consultation and counted from receiving your content.' },
      { metric: '100%', label: 'Mobile-Responsive QA', detail: 'Pixel-perfect rendering across iOS, Android, and desktop viewports.' },
      { metric: 'Free', label: 'Post-Launch Developer Support', detail: 'Free fixes and updates after your site goes live, with the support period set by your plan.' },
    ],
    faqs: [
      {
        q: 'Why should we choose a developer-built website over DIY site builders?',
        a: 'With DIY site builders, you get generic templates you quickly outgrow, bloated code, slow speeds, and ongoing monthly subscription fees forever. We give you custom code, 100% ownership, zero monthly platform fees, and dedicated developer support.',
      },
      {
        q: 'How fast can our website go live?',
        a: 'Simple sites can go live in as little as 10 days. Larger sites with stores or integrations take longer. Your exact timeline (ETA) is confirmed on your ₹99 consultation, counted from when you share your content.',
      },
      {
        q: 'Are there any monthly fees or hidden renewal charges to Reddington Global?',
        a: 'No. There are no monthly fees to us. You only pay for your domain and hosting (which we help configure under your own direct account so you have 100% control and ownership).',
      },
      {
        q: 'Can customers easily reach me on WhatsApp from the website?',
        a: 'Yes. Every website includes an integrated floating WhatsApp chat button and one-tap click-to-call, allowing visitors to contact you with a single tap on their smartphone.',
      },
      {
        q: 'How do you handle revisions and content changes?',
        a: 'Every plan includes revision rounds on a live preview link before launch, plus free developer support after launch for small fixes. The number of revisions and support period depend on your plan, confirmed on your consultation.',
      },
      {
        q: 'What is included in the Basic Website plan (starting @ ₹4,999)?',
        a: 'You get a complete, mobile-ready website live in 10 days: up to 5 pages (Home, About, Services, Gallery, Contact), WhatsApp chat button & one-tap call, lead enquiry form, Google Maps, basic SEO setup, SSL security certificate, social media links, revisions, and free post-launch support. No monthly fees to us. Your final quote is confirmed on the consultation.',
      },
      {
        q: 'What is the difference between the Basic, Standard and Premium plans?',
        a: 'Basic (starting @ ₹4,999) is a 5-page starter site. Standard (starting @ ₹9,999) adds more pages, custom brand design, a blog you can edit, lead automation and an API integration. Premium (starting @ ₹19,999) adds an online store or larger site, payments, bookings, CRM integrations and an admin panel. Prices are starting points plus GST; your exact plan and quote are confirmed on your ₹99 consultation.',
      },
      {
        q: 'Which API integrations can you add to my website?',
        a: 'Common integrations include Razorpay payment gateway, WhatsApp Business API lead alerts, appointment booking, Google Sheets, email marketing tools, and CRMs such as Zoho and HubSpot. Which integrations you need, and their cost, are scoped during your consultation.',
      },
    ],
  },
  {
    slug: 'bookkeeping-accountancy',
    aliases: ['bookkeeping', 'accounting', 'accounting-finance', 'bookkeeping-accounting', 'reconciliation', 'tax-support', 'reporting'],
    category: 'accounting-finance',
    categoryName: 'Bookkeeping & Accounting',
    title: 'Bookkeeping & Accountancy',
    shortTitle: 'Bookkeeping & Accounts',
    eyebrow: 'Consultancy · Financial Governance & Tax',
    image: '/assets/img/svc-accounting-opt.webp',
    tagline: 'Audit-ready financial bookkeeping, statutory tax compliance, and executive reporting.',
    overview:
      'Maintain pristine financial transparency and rigorous statutory tax compliance. Our chartered consultants and accountancy specialists handle day-to-day data entry, general ledgers, statutory tax filings (GST & TDS India), and monthly executive financial reporting packs to keep your enterprise audit-ready at all times.',
    stats: [
      { metric: '100%', label: 'Statutory Filing Accuracy' },
      { metric: 'Punctual', label: 'Monthly Books Closing' },
      { metric: '100%', label: 'On-Time Statutory Compliance' },
    ],
    challengeVsSolution: {
      challenge: 'Disorganized receipts, delayed monthly statements, surprise tax liabilities, and painful year-end audit scrambles.',
      solution: 'Structured bookkeeping cadences, continuous bank reconciliations, and proactive statutory tax filings handled by domain experts.',
      impact: 'Clear leadership visibility into unit economics, total compliance peace of mind, and painless external financial audits.',
    },
    offerings: [
      { num: '01', title: 'Daily Data Entry & Financial Ledger Management', desc: 'Categorization of sales, purchases, bank feeds, expenses, and asset registers with zero reconciliation backlog.' },
      { num: '02', title: 'Statutory Tax Filing & Corporate Returns', desc: 'Timely preparation and electronic submission of statutory corporate income tax filings and advance tax computation.' },
      { num: '03', title: 'GST Compliance (India) & E-Invoicing', desc: 'Filing of GSTR-1, GSTR-3B, annual GSTR-9 returns, Input Tax Credit (ITC) reconciliation, and compliant e-way billing.' },
      { num: '04', title: 'Payroll & TDS Compliance (India) · Form 16', desc: 'Salary tax withholdings, monthly TDS deposits, quarterly filing of Form 24Q/26Q, and Form 16/16A certificate generation.' },
      { num: '05', title: 'Regulatory Compliance & Audit Defense', desc: 'Full preparation of audit files, schedule verifications, and professional representation before statutory auditors.' },
      { num: '06', title: 'Monthly Management Accounts (MIS)', desc: 'Punctual month-end reporting: P&L statements, balance sheets, cash flow models, and burn rate forecasts.' },
    ],
    slas: [
      { metric: 'Punctual', label: 'Books Closing SLA', detail: 'Complete management accounts delivered on schedule each month.' },
      { metric: '100%', label: 'Statutory Deadlines Met', detail: 'Consistent on-time filing across GST, TDS, and corporate tax.' },
      { metric: 'Dual-Key', label: 'Financial Security Controls', detail: 'Multi-layer approval workflows for all sensitive ledger reconciliations.' },
    ],
    faqs: [
      {
        q: 'Which accounting software and ERP platforms do your chartered accountants support?',
        a: 'Our accounting teams are certified across Tally Prime, QuickBooks Online, Zoho Books, Xero, and enterprise ERPs like SAP Business One and NetSuite, working natively in your existing chart of accounts.',
      },
      {
        q: 'Do you provide end-to-end Payroll & Compensation alongside Bookkeeping?',
        a: 'Yes. Reddington Global provides a dedicated Payroll & Compensation Service (/services/payroll-compensation) covering attendance sync, accurate wage calculations, statutory tax deductions (PF/ESIC/PT/TDS), and final net salary balance sheets with plans starting @ ₹4,999/month.',
      },
      {
        q: 'How do you ensure zero statutory compliance penalties for GST and TDS in India?',
        a: 'We maintain automated statutory filing calendars with dual-entry verification. We handle monthly GSTR-1, GSTR-3B, quarterly TDS Form 24Q/26Q filings, and Input Tax Credit (ITC) reconciliation with GSTR-2B ahead of cutoff dates.',
      },
      {
        q: 'What is your monthly books closure schedule and turnaround for MIS reports?',
        a: 'We close monthly financial ledgers punctually within agreed timelines (typically by the 5th or 7th of the following month), delivering executive MIS packages including P&L, Balance Sheet, Cash Flow, and Burn Rate models.',
      },
      {
        q: 'How are our sensitive financial records and banking credentials safeguarded?',
        a: 'We utilize dual-key access controls and read-only banking feeds for transaction reconciliation. We operate on a verified data and balance computation basis, and all client financial records are strictly protected in AES-256 encrypted vaults.',
      },
      {
        q: 'Do you assist during external audits and statutory tax authority assessments?',
        a: 'Yes. We prepare complete audit defense documentation, verify reconciliation schedules, compile sample vouchers, and liaise directly with your statutory auditors or tax authorities to resolve queries smoothly.',
      },
      {
        q: 'What is analyzed during the ₹99 Financial & Bookkeeping Consultation?',
        a: 'A Senior Chartered Accountant reviews your current general ledger health, un-reconciled bank balances, statutory compliance status (GST/TDS), and delivers actionable recommendations to streamline your financial operations.',
      },
    ],
  },
  {
    slug: 'payroll-compensation',
    aliases: ['payroll', 'payroll-services', 'payroll-compliance'],
    category: 'accounting-finance',
    categoryName: 'Bookkeeping & Accounting',
    title: 'Payroll & Compensation Management',
    shortTitle: 'Payroll & Compensation',
    eyebrow: 'Payroll Services · Plans Starting @ ₹4,999/month',
    tagline: 'Simplify your payroll, power your workforce. Accurate payroll data, wage calculations, tax deductions, and net salary balance statements.',
    overview:
      'We specialize in providing verified payroll data, accurate wage calculations, statutory tax deductions, and final net salary balance statements. From workforce compensation structures to monthly PF, ESIC, Professional Tax (PT), and TDS withholding, our payroll desk provides clean, audit-ready payroll sheets and balance reports so your finance team can execute flawless payouts without compliance penalties.',
    stats: [
      { metric: '₹4,999', label: 'Plans Starting @ (per month)' },
      { metric: '100%', label: 'Calculation Accuracy' },
      { metric: 'Zero', label: 'Statutory Penalties' },
    ],
    challengeVsSolution: {
      challenge: 'Manual wage calculation errors, complex statutory tax withholdings (PF/ESIC/PT/TDS), overtime disputes, and mismatched month-end salary balance numbers.',
      solution: 'Precision payroll data processing, automated wage & allowance computation, calibrated statutory deductions, and audit-ready net pay balance statements.',
      impact: 'Flawless payroll calculations, pristine balance records, zero labor law penalties, and peace of mind for founders and HR managers.',
    },
    offerings: [
      { num: '01', title: 'Workforce Compensation', desc: 'Efficient compensation management: pay structures, allowances and incentives for every employee.' },
      { num: '02', title: 'Wage Calculation', desc: 'Accurate wages and payroll calculations, including attendance, overtime and leave deductions.' },
      { num: '03', title: 'Tax Deduction', desc: 'Proper monthly TDS deduction and processing under the Old or New tax regime.' },
      { num: '04', title: 'Statutory Compliance', desc: 'Payroll aligned with statutory requirements: Provident Fund (PF), ESIC and Professional Tax (PT).' },
    ],
    slas: [
      { metric: '100%', label: 'Calculation Accuracy SLA', detail: 'Zero-error wage calculations with multi-layer chartered accountant verification.' },
      { metric: 'Punctual', label: 'Monthly Balance Cutoff', detail: 'Final payroll data and balance statements delivered punctually ahead of pay date.' },
      { metric: 'AES-256', label: 'Data Encryption Vault', detail: 'Strict confidentiality and encryption on all employee salary and tax records.' },
    ],
    faqs: [
      {
        q: 'What is included in the Payroll Package?',
        a: 'The Payroll Package (starting @ ₹4,999/month + GST, for teams of up to 10 employees) covers workforce compensation, wage calculation, tax deduction and statutory compliance. It includes wage calculations, overtime/leave tracking, PF/ESIC/PT deductions, TDS withholding, employee payslips, and a final net salary balance statement ready for banking payout.',
      },
      {
        q: 'What exactly does Reddington Global provide for payroll?',
        a: 'We provide complete payroll data, wage calculations, statutory tax deductions, and final salary balance statements. We calculate all gross-to-net earnings, deductions, and tax withholdings with 100% accuracy and provide your finance team with audit-ready payout balance sheets.',
      },
      {
        q: 'How does statutory compliance (PF, ESIC, PT, TDS) work under this service?',
        a: 'We calculate exact statutory deduction amounts, prepare electronic return challans (ECRs) for PF/ESIC, compute state-specific Professional Tax (PT), and generate quarterly TDS statements (Form 24Q) and annual Form 16 certificates.',
      },
      {
        q: 'How is the price for the Payroll service decided?',
        a: 'The Payroll Package starts @ ₹4,999/month + GST for teams of up to 10 employees. Book a ₹99 consultation: we review your headcount, pay structure and compliance needs, then confirm your plan, start date and final quote.',
      },
      {
        q: 'How do we share monthly employee attendance and timesheet data?',
        a: 'You can share monthly attendance, biometric logs, or leave summaries simply via WhatsApp, email, or your preferred HRMS format. Our payroll desk processes your data and delivers final balance statements within 24 to 48 hours.',
      },
      {
        q: 'How do employees receive their monthly payslips?',
        a: 'We generate password-protected digital payslips for each employee showing complete wage calculations, statutory deductions, tax withholdings, and net salary balances on payday.',
      },
    ],
  },
  {
    slug: 'performance-management-consultancy',
    aliases: ['performance-management', 'performance'],
    category: 'bpo-operations',
    categoryName: 'BPO & Customer Operations',
    title: 'Performance Management Consultancy',
    shortTitle: 'Performance Management',
    eyebrow: 'Consultancy · Floor Efficiency & QA Systems',
    image: '/assets/img/svc-performance-opt.webp',
    tagline: 'Targeted advisory solutions built to streamline day-to-day operations and improve floor efficiency.',
    overview:
      'We implement robust performance management systems, optimize contact center workflows to maximize sales output, and deliver structured Quality Assurance (QA) frameworks to ensure interaction standards remain consistent. From agent telemetry to closing ratio optimization, we elevate floor throughput and eliminate operational bottlenecks.',
    stats: [
      { metric: '+32%', label: 'Average Floor Productivity Lift' },
      { metric: '100%', label: 'Calibrated QA Interaction Auditing' },
      { metric: '< 14 Days', label: 'Rapid Workflow Deployment' },
    ],
    challengeVsSolution: {
      challenge: 'Declining floor productivity, inconsistent agent talk tracks, uncalibrated QA scores, and lack of visibility into daily operational metrics.',
      solution: 'Custom performance management frameworks, real-time KPI dashboards, structured coaching cadences, and dialed workflow redesign.',
      impact: 'Measurable rise in conversion rates, lower agent turnover, and predictable institutional output across all teams.',
    },
    offerings: [
      { num: '01', title: 'Robust Performance Management Systems', desc: 'Implementation of structured KPI tracking, milestone scorecards, and objective employee evaluation systems.' },
      { num: '02', title: 'Contact Center Workflow Optimization', desc: 'In-depth audit and redesign of operational routing, call queues, and floor cadences to maximize sales output.' },
      { num: '03', title: 'Structured Quality Assurance (QA) Frameworks', desc: 'Institutional interaction scoring matrices, speech calibration rubrics, and compliance adherence standards.' },
      { num: '04', title: 'Real-Time Floor Telemetry & Leaderboards', desc: 'Live productivity monitors, activity tracking, and transparent performance leaderboards that motivate teams.' },
      { num: '05', title: 'Script Adherence & Coaching Cadences', desc: 'Weekly calibrated coaching, objection handling workshops, and tactical deal clinic sessions.' },
      { num: '06', title: 'SLA Audit Defense & Bottleneck Elimination', desc: 'Diagnostic analysis to isolate operational friction points and establish contract-grade SLA adherence.' },
    ],
    slas: [
      { metric: 'Weekly', label: 'Calibration Scoring Reviews', detail: 'Executive quality calibration sessions to maintain zero scoring drift.' },
      { metric: '+25% Min', label: 'Target Output Improvement', detail: 'Documented performance elevation achieved within 60 days of deployment.' },
      { metric: '100%', label: 'Actionable Reporting', detail: 'Daily and weekly telemetry dashboards delivered to client leadership.' },
    ],
    faqs: [
      {
        q: 'How does your consultancy achieve the documented +25% productivity lift?',
        a: 'We perform deep-dive diagnostic audits on floor telemetry, eliminate idle time in call queues, redesign scripting into high-converting talk tracks, and establish daily calibrated coaching rituals that raise bottom-quartile agent performance.',
      },
      {
        q: 'What interaction Quality Assurance (QA) scoring frameworks do you implement?',
        a: 'We replace subjective grading with objective, weighted scorecards measuring greeting etiquette, compliance disclosures, discovery questioning, objection handling, closing velocity, and talk-to-listen ratios.',
      },
      {
        q: 'Can you integrate your telemetry monitors with our existing contact center dialers?',
        a: 'Yes. We integrate with major cloud contact center dialers and telephony platforms including Vicidial, Genesys, Five9, Talkdesk, Ameyo, and Twilio to track real-time occupancy, hold times, and agent status.',
      },
      {
        q: 'How do you coach underperforming agents without increasing floor attrition?',
        a: 'We implement constructive deal clinics and micro-coaching sessions focused on one behavioral shift per week, paired with transparent peer leaderboards and recognition incentives that build team morale.',
      },
      {
        q: 'What is the typical timeframe from initial floor audit to full operational transformation?',
        a: 'Initial diagnostic audits and baseline scoring are completed in 7 days. Workflow redesign and QA calibration launch in week 2, with measurable output improvements documented between 30 and 60 days.',
      },
      {
        q: 'What operational metrics are evaluated during the ₹99 Performance Audit?',
        a: 'We examine your current agent occupancy, average handle times (AHT), QA audit frequency, conversion pacing, and supervisory-to-agent ratios, delivering a targeted roadmap for immediate floor throughput gains.',
      },
    ],
  },
  {
    slug: 'digital-marketing',
    aliases: ['marketing', 'performance-marketing', 'digital-marketing-services'],
    category: 'software-development',
    categoryName: 'Software Development & IT Solutions',
    title: 'Digital Marketing & Growth',
    shortTitle: 'Digital Marketing',
    eyebrow: 'Consultancy · Paid Media & Performance SEO',
    image: '/assets/img/svc-marketing-opt.webp',
    tagline: 'High-ROI paid advertising, data-driven lead generation, search ranking, and conversion funnels.',
    overview:
      'Drive predictable commercial growth through data-calibrated digital marketing. We build, manage, and optimize enterprise campaigns across Meta Ads, Google Ads, and LinkedIn Ads, paired with strategic on-page SEO and high-converting landing pages engineered to turn traffic into qualified pipeline.',
    stats: [
      { metric: '4.2x', label: 'Average ROAS on Paid Media' },
      { metric: '-38%', label: 'Reduction in Cost Per Lead (CPL)' },
      { metric: '100%', label: 'Attributed Conversion Tracking' },
    ],
    challengeVsSolution: {
      challenge: 'Wasted ad budget, inaccurate conversion reporting, low click-to-lead conversion rates, and stagnant organic search visibility.',
      solution: 'Precision audience targeting, continuous creative A/B testing, unified GTM/GA4 conversion tracking, and high-intent keyword capture.',
      impact: 'Predictable stream of commercial inbound leads, transparent CPA metrics, and compounding digital brand authority.',
    },
    offerings: [
      { num: '01', title: 'Meta Ads Management (Facebook & Instagram)', desc: 'Hyper-targeted lead generation, retargeting sequences, dynamic creative optimization, and custom audience funnels.' },
      { num: '02', title: 'Google Ads & Search Intent Capture', desc: 'High-intent search campaigns, Performance Max (PMax), remarketing display networks, and call-only ads.' },
      { num: '03', title: 'LinkedIn B2B Account-Based Marketing (ABM)', desc: 'Targeted account marketing aimed at verified corporate titles, company sizes, and executive procurement teams.' },
      { num: '04', title: 'Conversion Rate Optimization (CRO)', desc: 'High-speed landing page design, heat-mapping analysis, copywriting, and form friction reduction to maximize conversions.' },
      { num: '05', title: 'Enterprise Technical & On-Page SEO', desc: 'Keyword strategy, Schema markup, site architecture, and authoritative content pipelines that rank on page one.' },
      { num: '06', title: 'Advanced Tracking, GTM & Attribution Dashboards', desc: 'End-to-end Google Tag Manager, GA4 event modeling, Meta Conversions API (CAPI), and live client ROI dashboards.' },
    ],
    slas: [
      { metric: 'Daily', label: 'Bid & Budget Optimization', detail: 'Active bid management to maintain lowest cost-per-lead.' },
      { metric: '100%', label: 'Attribution Tracking', detail: 'Every lead tracked back to its original ad, keyword, and campaign.' },
      { metric: 'Weekly', label: 'Executive Performance Briefing', detail: 'Transparent ROI, spend, and conversion reports.' },
    ],
    faqs: [
      {
        q: 'What minimum ad budget is recommended to achieve profitable ROAS with your team?',
        a: 'While we work with diverse budgets, we typically recommend a minimum monthly media spend of ₹50,000 to ₹1,50,000 ($1,000–$3,000) across Meta or Google Ads to allow machine-learning algorithms to exit the learning phase and optimize conversion efficiency.',
      },
      {
        q: 'How do you ensure accurate tracking with Meta Conversions API (CAPI) and GA4?',
        a: 'We implement server-side tracking via Google Tag Manager (GTM) Server Container and Meta CAPI, bypassing ad-blockers and iOS privacy restrictions to recover up to 25% of un-attributed conversions with 100% event deduplication.',
      },
      {
        q: 'How do you determine the budget split between Google, Meta, and LinkedIn Ads?',
        a: 'We allocate media budget based on buyer intent: Google Search captures high-intent active problem-solvers, Meta Ads drives visual demand generation and retargeting, and LinkedIn ABM targets high-ticket enterprise B2B decision-makers.',
      },
      {
        q: 'Do you create high-converting landing pages and ad creatives in-house?',
        a: 'Yes. Our integrated team handles copy-writing, graphic design, short-form video hooks, and high-speed landing page development (Next.js/React) engineered with friction-free lead capture forms.',
      },
      {
        q: 'How frequently do we receive campaign performance briefings and ROI reports?',
        a: 'You receive access to a 24/7 live Looker Studio / GA4 dashboard, alongside weekly executive video briefings covering spend, cost-per-lead (CPL), ROAS, and upcoming A/B testing hypotheses.',
      },
      {
        q: 'What specific funnel bottlenecks are diagnosed in the ₹99 Marketing Audit?',
        a: 'A Senior Growth Strategist audits your current ad account structure, audience overlap, cost-per-acquisition trends, pixel health, and landing page conversion friction, providing immediate optimization quick-wins.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. RECRUITMENT & HIRING SERVICES
  // ═══════════════════════════════════════════════════════════════════
  {
    slug: 'recruitment-hiring',
    aliases: ['recruitment-staffing', 'recruitment', 'staffing', 'hiring', 'talent-acquisition', 'it-recruitment'],
    category: 'bpo-operations',
    categoryName: 'BPO & Customer Operations',
    title: 'Recruitment & Hiring Solutions',
    shortTitle: 'Recruitment & Hiring',
    eyebrow: 'Talent Solutions · IT, Digital Marketing & Corporate',
    image: '/assets/img/svc-recruitment-opt.webp',
    tagline: 'Strategic talent sourcing, technical recruitment, and workforce hiring across IT, digital marketing, and enterprise functions.',
    overview:
      'Comprehensive recruitment and talent hiring solutions engineered to source, evaluate, and place exceptional professionals across Information Technology, Digital Marketing, Corporate Operations, and specialized verticals. Rather than rigid placement constraints, we offer flexible, end-to-end hiring workflows—from permanent technical roles to agile contract staffing—ensuring your teams scale rapidly with vetted, high-performing talent.',
    stats: [
      { metric: '< 7 Days', label: 'Average Shortlist Delivery' },
      { metric: '95%', label: 'Placement Retention Rate' },
      { metric: '100%', label: 'Rigorous Multi-Tier Vetting' },
    ],
    challengeVsSolution: {
      challenge: 'Prolonged hiring cycles, candidate skill mismatches in specialized technical and marketing roles, high agency markups, and costly bad hires.',
      solution: 'Targeted talent mapping, rigorous domain and portfolio evaluations, structured interview panels, and proactive sourcing networks across IT, digital marketing, and business operations.',
      impact: 'Significantly reduced time-to-fill, lower recruitment overhead, and Day-One productive professionals aligned with your organizational culture.',
    },
    offerings: [
      { num: '01', title: 'IT & Technical Recruitment', desc: 'Sourcing full-stack developers, software engineers, DevOps specialists, cloud architects, and QA engineers.' },
      { num: '02', title: 'Digital Marketing & Growth Talent', desc: 'Placing proven media buyers, performance marketers, SEO strategists, content creators, and conversion specialists.' },
      { num: '03', title: 'Corporate & Operations Staffing', desc: 'Hiring business coordinators, account managers, operational leads, and executive administration.' },
      { num: '04', title: 'Executive & Specialized Search', desc: 'Targeted headhunting for department leads, practice heads, engineering directors, and senior specialists.' },
      { num: '05', title: 'Contract, Permanent & Project-Based Hiring', desc: 'Flexible staffing engagements tailored for project surges, seasonal demand, or permanent long-term expansion.' },
      { num: '06', title: 'Comprehensive Vetting & Screening', desc: 'Rigorous multi-stage technical evaluations, previous employment background checks, and portfolio audits.' },
    ],
    slas: [
      { metric: '< 48 Hrs', label: 'Screened Candidate Shortlist', detail: 'Curated shortlist of qualified candidates presented within 48 hours.' },
      { metric: '90-Day', label: 'Placement Replacement Guarantee', detail: 'Immediate zero-cost candidate replacement if a placement does not complete probation.' },
      { metric: '100%', label: 'Verified Credentials', detail: 'Rigorous pre-hire background, reference, and identity authentication.' },
    ],
    faqs: [
      {
        q: 'How quickly can we expect to review pre-screened candidate profiles?',
        a: 'For standard IT, digital marketing, and corporate roles, we deliver an initial curated shortlist of 3 to 5 thoroughly vetted candidates within 48 to 72 hours of receiving your requisition requirements.',
      },
      {
        q: 'What does your 90-day placement replacement guarantee include?',
        a: 'If a placed candidate voluntarily departs or does not meet contractual performance standards within their 90-day probationary period, we provide an immediate zero-cost candidate replacement with priority sourcing.',
      },
      {
        q: 'How do you vet technical developers and specialized marketing talent before presentation?',
        a: 'Candidates undergo a rigorous 3-tier evaluation: technical coding/portfolio assessment conducted by senior practitioners, previous employer reference checks, and a behavioral culture-fit interview.',
      },
      {
        q: 'Do you support contract staffing and staff augmentation alongside permanent placement?',
        a: 'Yes. We offer flexible engagement models including permanent full-time hiring, contract staffing for project surges, and dedicated offshore talent pods operating under your direct day-to-day management.',
      },
      {
        q: 'What background verification (BGV) and credential checks are performed?',
        a: 'We conduct comprehensive pre-onboarding checks including identity authentication (Aadhaar/PAN/Passport), educational degree validation, employment history verification, and court record checks.',
      },
      {
        q: 'What hiring roadmap is formulated during the ₹99 Talent Strategy Consultation?',
        a: 'A Senior Talent Acquisition Partner analyzes your upcoming hiring headcount, benchmarks current salary bands against market trends, reviews your job descriptions, and builds a rapid talent pipeline strategy.',
      },
    ],
  },
];

// Consultation-first pricing FAQs shared by every service
const PRICING_FAQS = [
  {
    q: 'How is my final price decided?',
    a: 'Every business has a different scope, so we do not sell fixed-price packages online. Plans show a starting price where available. Book a ₹99 consultation and our expert reviews your requirements, recommends the right plan, and confirms the scope, timeline (ETA) and final quote.',
  },
  {
    q: 'Is the ₹99 consultation fee adjusted against my project fee?',
    a: 'No. The ₹99 (GST included) is a prepaid fee for your 1-on-1 consultation, covering scope review, plan recommendation and timeline. Project pricing is quoted separately after the call, with no obligation to proceed.',
  },
];

SERVICES.forEach((s) => {
  s.faqs = [...(s.faqs || []), ...PRICING_FAQS];
});

export function getServiceBySlug(slug) {
  if (!slug) return null;
  const clean = decodeURIComponent(slug).toLowerCase().trim().replace(/[.,/]+$/, '');
  return SERVICES.find((s) => s.slug === clean || s.aliases?.includes(clean)) || null;
}

export function getServicesByCategory(category) {
  if (!category) return [];
  const clean = category.toLowerCase().trim();
  return SERVICES.filter(
    (s) =>
      s.category === clean ||
      (clean.includes('bpo') && (s.category === 'bpo' || s.category === 'bpo-operations')) ||
      (clean.includes('software') && s.category === 'software-development') ||
      (clean.includes('accounting') && s.category === 'accounting-finance') ||
      (clean.includes('consultancy') && (s.category === 'software-development' || s.category === 'accounting-finance')) ||
      s.categoryName?.toLowerCase().includes(clean)
  );
}
