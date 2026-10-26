import { NextResponse } from 'next/server';
import { SERVICE_CATEGORIES, SERVICES } from '../../../lib/services-data';
import { SERVICE_PACKAGES } from '../../../lib/packages-data';

/**
 * Builds the comprehensive, project-grounded system prompt for Argo.
 * Enforces strict project-only boundary rules with zero tolerance for outside questions.
 */
function buildSystemPrompt(currentPage = '') {
  return `
You are Argo, the executive snow leopard mascot and Senior Solutions Consultant for Reddington Global (RGC — Reddington Global Consultancy Pvt Ltd).
You are an authoritative, warm, consultative, and articulate business solutions advisor. You understand enterprise operations, BPO scaling, software engineering, and corporate bookkeeping.

═════════════════════════════════════════════════════════════════════════════
CRITICAL MANDATE: STRICT PROJECT-ONLY BOUNDARY (ZERO OUTSIDE ANSWERS)
═════════════════════════════════════════════════════════════════════════════
1. YOU ONLY ANSWER QUESTIONS RELATED TO REDDINGTON GLOBAL (RGC), ITS SERVICES, SOLUTIONS, PACKAGES, OPERATIONS, TEAM, PRICING, AND CONTACT CHANNELS.
2. STRICTLY PROHIBITED TOPICS (YOU MUST POLITELY REFUSE & DEFLECT):
   • General trivia, history, geography, celebrity gossip, movies, sports, weather, jokes, riddles, poems, recipes.
   • General coding help, computer science homework, writing generic algorithms, debugging non-RGC code (e.g. "write a python function to sort an array", "how does a binary tree work in C++").
   • Politics, religion, medical advice, personal advice, legal advice outside RGC compliance frameworks.
   • Third-party competitor reviews or generic tech support for third-party consumer products (e.g. "how do I fix my iPhone", "what is Infosys stock price").
3. MANDATORY DEFLECTION FOR OUT-OF-SCOPE QUERIES:
   When an off-topic or outside question is asked, you MUST politely decline and immediately redirect back to Reddington Global's services.
   Example deflection response:
   "I specialize exclusively in Reddington Global's business operations, enterprise BPO, software development, and accounting consultancy. I'm unable to assist with general topics, but I'd be glad to discuss how our solutions can help scale your business—which of our services can I assist you with today?"
   Do NOT attempt to partially answer an outside question. Deflect cleanly and pivot immediately to RGC services.

═════════════════════════════════════════════════════════════════════════════
COMPANY & CONTACT INTELLIGENCE
═════════════════════════════════════════════════════════════════════════════
• Company: Reddington Global Consultancy Pvt Ltd (RGC)
• Website: https://www.reddingtonglobal.com
• Phone / WhatsApp: +91 98182 24995 (Direct WhatsApp link: https://wa.me/919818224995)
• Official Email: sales@reddingtonglobal.com
• Headquarters: 750 Udyog Vihar Phase 5, Sector 19, Gurugram, Haryana 122016, India
• Delivery Model: Dual-shore delivery (India & USA) ensuring 24/7 continuous operations, strict SLA governance, and cost optimization.

═════════════════════════════════════════════════════════════════════════════
PRICING & ENGAGEMENT PACKAGES
═════════════════════════════════════════════════════════════════════════════
1. WEBSITE DEVELOPMENT SPECIAL PACKAGE:
   • Basic Bundle: ₹4,999 + GST
   • Timeline: Live in 7 days guaranteed
   • Deliverables: Up to 5 pages (Home, About, Services, Gallery, Contact), mobile-responsive design, one-tap WhatsApp chat button & click-to-call, lead enquiry form routed to client inbox, Google Maps + basic SEO, SSL security, 2 rounds of revisions, 30 days free post-launch support.
   • URL: https://www.reddingtonglobal.com/services/web-development

2. STRATEGIC DISCOVERY CONSULTATION (ALL OTHER PRACTICES):
   • 1-on-1 Strategic Director Consultation: ₹99 (One-Time, scheduled within 24-48 hours)
   • Deliverables: 30-minute 1-on-1 deep dive with Senior Practice Director, operational bottleneck assessment, workflow audit, tailored implementation roadmap, and cost-optimization plan.
   • Deductible: The ₹99 introductory fee is fully deductible upon formal contract engagement.
   • URL: Dedicated service page or https://www.reddingtonglobal.com/contact

═════════════════════════════════════════════════════════════════════════════
DETAILED SERVICE DOSSIERS & PRACTICE VERTICALS
═════════════════════════════════════════════════════════════════════════════
1. BPO & Customer Operations (Floor Telemetry, 24/7 Omnichannel CX):
   • Customer Care & Omnichannel Support (/services/bpo-customer-service): 24/7 dual-shore shifts, voice/chat/email helpdesk, Zendesk & Freshdesk ticketing, AI agent copilot, SLA compliance, FCR optimization.
   • Sales & Revenue Operations (/services/bpo-sales): Inbound SDR speed-to-lead (<5 mins), outbound BDR multi-touch cadences, inside sales deal closing, CRM hygiene (Salesforce, HubSpot, Zoho), pipeline velocity acceleration.
   • Back-Office & KYC Operations (/services/bpo-backoffice): KYC/AML verification, document processing, catalog moderation, transaction audits.
   • Performance & QA Governance (/services/performance-management): Call recording audits, CSAT benchmarking, floor telemetry, bi-weekly calibration reviews.
   • Recruitment & Staffing (/services/recruitment-hiring): Executive search, bulk BPO hiring, tech vetting, contractor-to-hire.
   • BPO Partnerships & Campaigns (/bpo-partnerships): Connecting BPO call centers with high-volume verified enterprise campaigns, seat-filling, operational onboarding.

2. Software Development & IT Solutions (Cloud-Native Digital Ecosystems):
   • Web Development & Engineering (/services/web-development): Next.js 14, React, Tailwind CSS, SSR/SSG, fast load speeds, SEO-optimized structure, custom corporate portals, e-commerce, Basic Bundle (₹4,999 + GST, live in 7 days).
   • AI, SaaS & Digital Solutions (/services/saas-digital-solutions): Autonomous LLM agents, automated enterprise workflows, microservice API backends (Node.js/Python), cloud hosting (AWS/Vercel), custom SaaS architectures.
   • Digital Marketing & Performance Growth (/services/digital-marketing): Data-driven Meta & Google Ads, technical SEO audits, conversion rate optimization (CRO), multi-step funnel design.

3. Bookkeeping & Accounting (Audit-Ready Ledgers & Statutory Compliance):
   • Bookkeeping & Accountancy (/services/bookkeeping-accountancy): Daily ledger reconciliations, dual-shore accounting, software support across Tally, Zoho Books, QuickBooks, GSTR-1 & GSTR-3B return filings, TDS compliance, MIS financial reports.
   • Payroll & Compensation (/services/payroll-compensation): Biometric attendance integration, salary disbursements, PF & ESIC filings, statutory tax deductions, automated payslips for teams from 10 to 500+ employees.

${currentPage ? `\n═════════════════════════════════════════════════════════════════════════════\nVISITOR CONTEXT: The user is currently browsing the page: ${currentPage}\n═════════════════════════════════════════════════════════════════════════════` : ''}

═════════════════════════════════════════════════════════════════════════════
CONVERSATIONAL GUIDELINES (CONSULTATIVE DIALOGUE)
═════════════════════════════════════════════════════════════════════════════
1. NATURAL CONVERSATIONAL PACING:
   • Speak warmly, authoritatively, and concisely.
   • Do NOT cram everything into a rigid 2-line template.
   • Provide 2 to 4 structured, natural sentences or clean bullet points that directly address the user's situation.
2. CONSULTATIVE 3-STEP FLOW:
   • Step 1 (Acknowledge): Acknowledge the user's specific problem or situation with domain expertise.
   • Step 2 (Deliver Value): Provide concrete industry best practices from RGC's methodology.
   • Step 3 (Diagnostic Discovery): Ask ONE smart, diagnostic question to understand their scope (e.g. team size, current software, ticket volume, or target launch date).
   • Step 4 (Natural Next Step): Suggest the appropriate package (₹4,999 Web Development or ₹99 Director Strategy Session) or WhatsApp contact when the timing feels right.
3. COMPLIANCE & LEGAL SAFETY:
   • Never promise exact numeric returns, 100% cost elimination, or zero-error guarantees.
   • Frame benefits in terms of "audit readiness", "structured risk controls", "streamlined workflows", and "tailored efficiency".
4. SINGLE QUESTION RULE:
   • Ask only ONE clear follow-up question per message.
`;
}

function sanitizeAdvisoryLanguage(text) {
  if (!text) return '';
  return text
    // Replace eliminate risk / penalty guarantees
    .replace(/\beliminat(?:es?|ing|ed)?\s+(?:any\s+)?(?:penalty\s+risks?|penalties|all\s+penalties|compliance\s+risks?)/gi, 'helps mitigate compliance risks')
    .replace(/\beliminat(?:es?|ing|ed)?\s+([a-zA-Z\s]+?)\s+risks?\b/gi, 'helps mitigate $1 risk')
    .replace(/\bzero[- ]penalty(?:\s+guarantee)?\b/gi, 'audit-ready compliance')
    .replace(/\bzero[- ]error(?:\s+guarantee)?\b/gi, 'rigorous QA standards')
    .replace(/\bzero[- ]risk\b/gi, 'structured risk controls')
    .replace(/\brisk[- ]free\b/gi, 'structured')
    .replace(/\bguarantee(?:s|d)?\s+you\b/gi, 'support you with')
    .replace(/\bguarantees?\b/gi, 'supports')
    .replace(/\bguaranteed\b/gi, 'structured')
    .replace(/\bpromises?\b/gi, 'aims')
    .replace(/\bpromised\b/gi, 'targeted')
    // Replace exact ROI / guaranteed returns
    .replace(/\bmap\s+this\s+exact\s+roi\b/gi, 'map a tailored strategic roadmap')
    .replace(/\bmap\s+(?:an?|the|your)\s+exact\s+roi\b/gi, 'map a tailored operational roadmap')
    .replace(/\bexact\s+roi\b/gi, 'tailored strategic roadmap')
    .replace(/\bguaranteed\s+roi\b/gi, 'strategic value')
    // Replace percentage reduction promises
    .replace(/\b(?:reduces?|cuts?|slashes?)\s+([a-zA-Z\s]+?)\s+by\s+\d+%/gi, 'helps streamline $1')
    .replace(/\bby\s+\d+%\s+(?:overhead|cost|expense)\s+reduction\b/gi, 'tailored operational efficiencies')
    .replace(/\b\d+%\s+(?:cost\s+reduction|savings|overhead\s+reduction)\b/gi, 'enhanced operational efficiency');
}

/**
 * Checks if a user message is clearly outside Reddington Global's scope.
 */
function isOutOfScopeQuery(text) {
  if (!text) return false;
  const t = text.toLowerCase();

  const outsidePatterns = [
    /\b(who is the president|who is the prime minister|capital of|how far is|weather in|temperature in)\b/,
    /\b(recipe|how to cook|ingredients for|bake a cake)\b/,
    /\b(tell me a joke|write a poem|write a song|write a story|riddle me)\b/,
    /\b(write a python function to|write a script to reverse|solve this math|calculus|integral of)\b/,
    /\b(movie review|who won the match|world cup|football score|cricket score)\b/,
    /\b(symptoms of|treatment for|cure for|medical advice)\b/,
    /\b(fix my iphone|samsung phone|car repair|bike repair)\b/,
  ];

  return outsidePatterns.some((pattern) => pattern.test(t));
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const currentPage = typeof body.currentPage === 'string' ? body.currentPage : '';

    if (messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.content?.trim() || '';

    // 1. Immediate Deflection for clearly out-of-scope queries
    if (isOutOfScopeQuery(lastUserMsg)) {
      return NextResponse.json({
        message:
          "I specialize exclusively in Reddington Global's business operations, enterprise BPO, software development, and accounting consultancy. I'm unable to assist with general topics, but I'd be glad to discuss how our solutions can help scale your business—which of our services can I assist you with today?",
      });
    }

    const apiKey = (
      process.env.GROQ_API_KEY ||
      process.env.GROK_API_KEY ||
      process.env.XAI_API_KEY ||
      ''
    ).trim();

    const getFallbackReply = () => {
      const allText = messages.map((m) => m.content?.toLowerCase() || '').join(' ');
      const userText = lastUserMsg.toLowerCase();
      const cleanMsg = userText.replace(/[^a-z]/g, '');

      // Identify relevant vertical
      let targetService = {
        name: 'Strategic Business',
        url: 'https://www.reddingtonglobal.com/contact',
      };

      if (allText.includes('web development') || allText.includes('website') || allText.includes('frontend') || allText.includes('landing page') || allText.includes('next.js') || allText.includes('react web')) {
        targetService = {
          name: 'Web Development & Modern Engineering',
          url: 'https://www.reddingtonglobal.com/services/web-development',
        };
      } else if (allText.includes('web') || allText.includes('saas') || allText.includes('software') || allText.includes('ecommerce') || allText.includes('e-commerce') || allText.includes('ai') || allText.includes('agent') || allText.includes('app') || allText.includes('dev')) {
        targetService = {
          name: 'AI, SaaS & Digital Solutions',
          url: 'https://www.reddingtonglobal.com/services/saas-digital-solutions',
        };
      } else if (allText.includes('bookkeeping') || allText.includes('account') || allText.includes('tax') || allText.includes('gst') || allText.includes('tds') || allText.includes('ledger') || allText.includes('penalty')) {
        targetService = {
          name: 'Bookkeeping & Accounting',
          url: 'https://www.reddingtonglobal.com/services/bookkeeping-accountancy',
        };
      } else if (allText.includes('payroll') || allText.includes('salary') || allText.includes('compensation')) {
        targetService = {
          name: 'Payroll & Compensation',
          url: 'https://www.reddingtonglobal.com/services/payroll-compensation',
        };
      } else if (allText.includes('partner') || allText.includes('campaign')) {
        targetService = {
          name: 'BPO Partnerships',
          url: 'https://www.reddingtonglobal.com/bpo-partnerships',
        };
      } else if (allText.includes('marketing') || allText.includes('seo') || allText.includes('growth')) {
        targetService = {
          name: 'Digital Marketing & Growth',
          url: 'https://www.reddingtonglobal.com/services/digital-marketing',
        };
      } else if (allText.includes('recruitment') || allText.includes('hiring') || allText.includes('staff')) {
        targetService = {
          name: 'Recruitment & Hiring',
          url: 'https://www.reddingtonglobal.com/services/recruitment-hiring',
        };
      } else if (allText.includes('customer') || allText.includes('support') || allText.includes('cx') || allText.includes('helpdesk')) {
        targetService = {
          name: 'Customer Support',
          url: 'https://www.reddingtonglobal.com/services/bpo-customer-service',
        };
      } else if (allText.includes('bpo') || allText.includes('sales') || allText.includes('tele') || allText.includes('call') || allText.includes('revenue')) {
        targetService = {
          name: 'BPO Sales & Operations',
          url: 'https://www.reddingtonglobal.com/services/bpo-sales',
        };
      }

      // Direct handling for affirmative responses ("yes", "sure", "ok", "interested", "proceed", "book")
      if (['yes', 'yeah', 'sure', 'ok', 'okay', 'yup', 'yep', 'interested', 'yesplease', 'proceed', 'book'].includes(cleanMsg)) {
        if (targetService.url.includes('web-development')) {
          return `You can get started directly with our Basic Website Bundle (₹4,999 + GST, live in 7 days) on our dedicated dashboard: ${targetService.url} (or reach out on WhatsApp at +91 98182 24995).\nWhat is your business domain or target launch date?`;
        }
        return `You can book your 1-on-1 strategic consultation (₹99 introductory fee) directly on our dashboard: ${targetService.url} (or call/WhatsApp +91 98182 24995).\nWhat is your primary operational objective or timeline so our practice leaders can prepare customized blueprints for your call?`;
      }

      if (userText.includes('whatsapp') || userText.includes('phone') || userText.includes('contact') || userText.includes('number') || userText.includes('call')) {
        return "You can reach our senior team directly on WhatsApp or phone at +91 98182 24995 (https://wa.me/919818224995), or email sales@reddingtonglobal.com.\nWould you like our leadership to reserve a 1-on-1 discovery slot for your business today?";
      }

      if (userText.includes('web development') || userText.includes('website') || userText.includes('bundle') || userText.includes('4999')) {
        return "For businesses seeking a professional digital presence, we offer our Basic Website Development Bundle for ₹4,999 + GST: live in 7 days, up to 5 mobile-responsive pages, an integrated WhatsApp chat button, and Google Maps setup: https://www.reddingtonglobal.com/services/web-development\nWhat type of business website or brand are you planning to launch?";
      }

      if (userText.includes('accounting') || userText.includes('bookkeeping') || userText.includes('gst') || userText.includes('tds') || userText.includes('tax')) {
        return "Our dual-shore accounting practice manages day-to-day general ledgers, bank reconciliations, and statutory tax filings (GSTR-1, GSTR-3B, TDS) with audit-grade precision: https://www.reddingtonglobal.com/services/bookkeeping-accountancy\nWhich accounting software does your team currently use (e.g., Tally, Zoho Books, or QuickBooks)?";
      }

      if (userText.includes('payroll') || userText.includes('salary') || userText.includes('compensation')) {
        return "We manage end-to-end corporate payroll with biometric attendance sync, automated PF/ESIC deductions, and one-click salary disbursement: https://www.reddingtonglobal.com/services/payroll-compensation\nHow many employees or contractors are currently on your monthly pay-run?";
      }

      if (userText.includes('bpo') || userText.includes('support') || userText.includes('customer care') || userText.includes('helpdesk')) {
        return "Our 24/7 dual-shore BPO operations deliver omnichannel customer support across voice, live chat, and email with strict SLA and CSAT benchmarks: https://www.reddingtonglobal.com/services/bpo-customer-service\nWhat is your expected monthly ticket or interaction volume?";
      }

      if (userText.includes('partner') || userText.includes('campaign')) {
        return "We partner with BPO centers to provide verified enterprise campaigns, operational seat-filling, and onboarding support: https://www.reddingtonglobal.com/bpo-partnerships\nWhat is your center's current operational seat capacity?";
      }

      if (userText.includes('price') || userText.includes('cost') || userText.includes('99')) {
        return `We offer introductory 1-on-1 Strategic Director Consultations for ₹99 (or our complete Basic Website Bundle for ₹4,999 + GST): ${targetService.url}\nWhich specific service practice would you like our leadership to evaluate?`;
      }

      return "Hello! I am Argo, Reddington Global's Executive Solutions Advisor. We specialize in BPO Operations, Software & Web Engineering, and Bookkeeping & Payroll services.\nWhich service area or operational challenge can I help scale for your business today?";
    };

    // If key not configured, return instant knowledge fallback
    if (!apiKey) {
      return NextResponse.json({
        message: sanitizeAdvisoryLanguage(getFallbackReply()),
        notice: 'Set GROQ_API_KEY in .env.local for live AI responses.',
      });
    }

    // Determine provider & endpoint based on key prefix
    const isGroq = apiKey.startsWith('gsk_') || Boolean(process.env.GROQ_API_KEY);
    const apiEndpoint = isGroq
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://api.x.ai/v1/chat/completions';

    let modelName = (process.env.GROQ_MODEL || process.env.GROK_MODEL || '').trim();
    if (isGroq) {
      if (!modelName || modelName.includes('grok')) {
        modelName = 'openai/gpt-oss-120b';
      }
    } else {
      if (!modelName) {
        modelName = 'grok-2-latest';
      }
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            { role: 'system', content: buildSystemPrompt(currentPage) },
            ...messages.slice(-8),
          ],
          temperature: 0.35,
          max_tokens: 450,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn('AI API returned non-200, using services fallback:', response.status, errorText);
        return NextResponse.json({
          message: sanitizeAdvisoryLanguage(getFallbackReply()),
          notice: `AI API response ${response.status}`,
        });
      }

      const data = await response.json();
      const rawReply = data?.choices?.[0]?.message?.content || getFallbackReply();
      const reply = rawReply
        .replace(/\r\n/g, '\n')
        .replace(/([.!?])\s+(\*\*[A-Z][^*]+\*\*)/g, '$1\n\n$2\n')
        .replace(/\s*[•●]\s*/g, '\n• ')
        .replace(/(\*\*[A-Z][^*]+\*\*)\s+(•|\*\*)/g, '$1\n$2')
        .trim();
      return NextResponse.json({ message: sanitizeAdvisoryLanguage(reply) });
    } catch (grokErr) {
      console.warn('AI fetch failed, falling back:', grokErr);
      return NextResponse.json({ message: sanitizeAdvisoryLanguage(getFallbackReply()) });
    }
  } catch (err) {
    console.error('Chatbot API route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
