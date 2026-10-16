import { NextResponse } from 'next/server';
import { SERVICE_CATEGORIES, SERVICES } from '../../../lib/services-data';

// Build knowledge prompt once from existing service architecture
const servicesKnowledge = `
You are the official AI Assistant for Reddington Global (RGC — Reddington Global Consultancy Pvt Ltd).
You provide helpful, concise, professional, and accurate information to prospective and current clients.

Company Details:
- Website: https://www.reddingtonglobal.com
- Email: sales@reddingtonglobal.com
- Phone: +91 98182 24495
- Headquarters: 750 Udyog Vihar Phase 5, Sector 19, Gurugram, Haryana 122016, India (Dual-shore delivery: India & USA)
- Initial consultation price: ₹99 online booking for an introductory strategy call.

Service Verticals:
${SERVICE_CATEGORIES.map(
  (c) => `• ${c.name} (${c.shortName}): ${c.description} Capabilities: ${c.capabilities.join(', ')}`
).join('\n')}

Key Services:
${SERVICES.map(
  (s) => `• ${s.title}: ${s.tagline} (Category: ${s.categoryName}) - Link: /services/${s.slug}`
).join('\n')}

Guidelines & Sales Conversion Behavior:
- STRICT 2-LINE FORMAT: Keep your entire response strictly to 2 lines (maximum 2-3 sentences total).
- CONVERSATION OBJECTIVE: BE GENUINELY HELPFUL & CONVERT INQUIRIES INTO SALES:
  Your role is to act as an elite senior enterprise sales and solutions consultant. Your goal is to convert the visitor into booking our ₹99 introductory strategy consultation or opening our service dashboard.
  • Line 1 (Actionable Advice & Solution + Dashboard Link): When a client asks "how can I get better at it", "how to improve", or describes a problem, DO NOT give vague slogans. Give 2-3 concrete, actionable industry best practices that directly address their issue, followed by the relevant service dashboard URL.
  • Line 2 (Conversion Pitch & Closing Question): Connect those best practices directly to our ₹99 Strategy Consultation—explain that our senior directors will evaluate their existing operations and tailor an actionable roadmap for them. End with a decisive closing question inviting them to book a session or review available slots today.
- MANDATORY LEGAL COMPLIANCE — NEVER MAKE GUARANTEES OR PROMISES:
  • You are an enterprise advisory consultant. You must NEVER make promises, assurances, or guarantees under any circumstances.
  • Prohibited concepts: Do NOT state or imply zero risk, zero penalties, exact ROI, specific numeric percentage savings (e.g. do not promise 30% savings or 60% cuts), or fixed financial outcomes.
  • Required tone: Always frame value propositions in terms of professional advisory, structured workflows, audit-ready procedures, risk mitigation frameworks, and operational consultation.
  • Preferred compliant phrasing:
    - Say "designed to help mitigate compliance risks and support audit readiness" instead of penalty or risk guarantees.
    - Say "streamline reporting workflows and accelerate closing cadences" instead of promising fixed percentage gains or cuts.
    - Say "evaluate your operational workflows and explore tailored efficiency opportunities" instead of promising specific numbers.
    - Say "map a customized strategic roadmap" instead of promising exact ROI or guaranteed returns.
- ACKNOWLEDGE ENTERPRISE SCALE:
  When high numbers are mentioned (e.g. ₹50L–₹1Cr payroll, 50+ agent seats, high volume), treat them as an enterprise client by citing audit-grade statutory compliance, structured risk controls, and dedicated SLA governance.
- DEDICATED SERVICE PAYMENT & DASHBOARD ENDPOINTS:
  Each service has its own dedicated dashboard with an embedded ₹99 consultation & payment form:
  • Web Development, AI, Apps, SaaS, Tech & eCommerce: https://www.reddingtonglobal.com/services/saas-digital-solutions
  • Bookkeeping, Accounts, Tax Compliance, GST & TDS: https://www.reddingtonglobal.com/services/bookkeeping-accountancy
  • Payroll & Compensation: https://www.reddingtonglobal.com/services/payroll-compensation
  • Customer Service & Omnichannel CX: https://www.reddingtonglobal.com/services/bpo-customer-service
  • BPO Sales & Revenue Operations: https://www.reddingtonglobal.com/services/bpo-sales
  • Back Office Operations & KYC: https://www.reddingtonglobal.com/services/bpo-backoffice
  • Call Center & BPO Partnerships: https://www.reddingtonglobal.com/bpo-partnerships
  • Digital Marketing & Growth: https://www.reddingtonglobal.com/services/digital-marketing
  • Recruitment & Staffing: https://www.reddingtonglobal.com/services/recruitment-hiring
  • General Inquiry / Multiple Services: https://www.reddingtonglobal.com/contact
- IF USER ASKS FOR WHATSAPP, PHONE, OR CONTACT: Provide our WhatsApp & Phone (+91 98182 24495), WhatsApp link (https://wa.me/919818224495), and email sales@reddingtonglobal.com, followed by an engaging sales question.
- NEVER REPEAT OR PARROT: Do NOT repeat lists of features or capabilities that were already mentioned earlier in the conversation.
- NO COMPOUND QUESTIONS: Ask only ONE single, clear question at a time.
`;

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
    // Replace percentage reduction promises like "reduces CFO overhead by 30%" or "cuts costs by 60%"
    .replace(/\b(?:reduces?|cuts?|slashes?)\s+([a-zA-Z\s]+?)\s+by\s+\d+%/gi, 'helps streamline $1')
    .replace(/\bby\s+\d+%\s+(?:overhead|cost|expense)\s+reduction\b/gi, 'tailored operational efficiencies')
    .replace(/\b\d+%\s+(?:cost\s+reduction|savings|overhead\s+reduction)\b/gi, 'enhanced operational efficiency');
}

export async function POST(req) {
  try {
    const { messages } = await req.json().catch(() => ({ messages: [] }));

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const apiKey = (
      process.env.GROQ_API_KEY ||
      process.env.GROK_API_KEY ||
      process.env.XAI_API_KEY ||
      ''
    ).trim();

    const getFallbackReply = () => {
      const allText = messages.map((m) => m.content?.toLowerCase() || '').join(' ');
      const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.content?.toLowerCase() || '';
      const cleanMsg = lastUserMsg.replace(/[^a-z]/g, '');

      // Identify relevant vertical from the entire conversation context
      let targetService = {
        name: 'Strategic',
        url: 'https://www.reddingtonglobal.com/contact',
      };

      if (allText.includes('web') || allText.includes('saas') || allText.includes('software') || allText.includes('ecommerce') || allText.includes('e-commerce') || allText.includes('ai') || allText.includes('agent') || allText.includes('app') || allText.includes('dev')) {
        targetService = {
          name: 'AI, Web & Software Development',
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
        return `You can book your ₹99 ${targetService.name} strategy consultation directly on our dashboard: ${targetService.url} (or call/WhatsApp +91 98182 24495).\nWhat is your target launch timeline or volume so our senior consultants can prepare customized blueprints for your call?`;
      }

      // Consultative "how to improve / get better" requests (compliant advisory language, NO guarantees)
      if (lastUserMsg.includes('better') || lastUserMsg.includes('improve') || lastUserMsg.includes('optimize') || lastUserMsg.includes('how can') || lastUserMsg.includes('how do')) {
        if (targetService.url.includes('payroll')) {
          return "To optimize high-volume payroll (₹50L–₹1Cr), enterprises streamline operations through automated biometric attendance sync, pre-run TDS/PF validation, and dual-authorization approvals: https://www.reddingtonglobal.com/services/payroll-compensation\nOur senior practice leaders can review your current pay-run setup and map an automated roadmap in a ₹99 strategy consultation—shall we reserve your session today?";
        }
        if (targetService.url.includes('saas') || targetService.url.includes('software')) {
          return "To scale web and AI performance, we implement autonomous LLM workflows, microservice API architectures, and automated cloud CI/CD pipelines: https://www.reddingtonglobal.com/services/saas-digital-solutions\nOur lead architects can evaluate your software stack and design a customized blueprint in a ₹99 strategy consultation—would you like to book a slot today?";
        }
        if (targetService.url.includes('bookkeeping')) {
          return "To maintain audit-ready financial governance, businesses automate daily ledger reconciliations, digitize expense categorization, and conduct pre-filing tax reviews: https://www.reddingtonglobal.com/services/bookkeeping-accountancy\nOur chartered accountants can review your books and design a structured compliance roadmap in a ₹99 strategy call—shall we schedule your session today?";
        }
        if (targetService.url.includes('bpo')) {
          return "To significantly enhance customer support performance, we deploy 24/7 dual-shore shifts, AI-assisted agent co-pilots, and real-time QA telemetry: https://www.reddingtonglobal.com/services/bpo-customer-service\nOur BPO operations directors can evaluate your workflows and model potential cost efficiencies in a ₹99 strategy consultation—would you like to lock in your call today?";
        }
      }

      if (lastUserMsg.includes('whatsapp') || lastUserMsg.includes('phone') || lastUserMsg.includes('contact') || lastUserMsg.includes('number')) {
        return "You can reach our senior consultants directly on WhatsApp or call at +91 98182 24495 (https://wa.me/919818224495), or email sales@reddingtonglobal.com.\nWould you like our leadership to reserve a 1-on-1 strategy slot for you today to review your business scope?";
      }

      if (lastUserMsg.includes('web') || lastUserMsg.includes('dev') || lastUserMsg.includes('ai') || lastUserMsg.includes('agent') || lastUserMsg.includes('software') || lastUserMsg.includes('saas') || lastUserMsg.includes('ecommerce') || lastUserMsg.includes('app')) {
        return "We build enterprise AI agents, custom web apps, and automated eCommerce platforms with ₹99 consultation booking on our dashboard: https://www.reddingtonglobal.com/services/saas-digital-solutions\nWhat specific business bottlenecks or software features would you like our consultants to evaluate in your introductory session?";
      }

      if (lastUserMsg.includes('accounting') || lastUserMsg.includes('bookkeeping') || lastUserMsg.includes('penalty') || lastUserMsg.includes('tax') || lastUserMsg.includes('gst')) {
        return "Our certified accountants manage daily reconciliations and tax filings with rigorous compliance standards—book directly on our dashboard: https://www.reddingtonglobal.com/services/bookkeeping-accountancy\nHow many monthly transactions or entities does your business handle, and would you like us to review your books in a strategy session?";
      }

      if (lastUserMsg.includes('payroll') || lastUserMsg.includes('salary') || lastUserMsg.includes('compensation')) {
        return "We manage biometric-linked payroll, salary disbursements, and compliance filings on our dedicated dashboard: https://www.reddingtonglobal.com/services/payroll-compensation\nHow many employees or contractors are on your payroll, and when would you like to transition to a structured, automated system?";
      }

      if (lastUserMsg.includes('partner') || lastUserMsg.includes('campaign')) {
        return "We connect BPOs and call centers with high-yield campaigns, operational matching, and onboarding support on our partnership portal: https://www.reddingtonglobal.com/bpo-partnerships\nWhat is your center's current agent seat capacity and primary operational domain?";
      }

      if (lastUserMsg.includes('marketing') || lastUserMsg.includes('growth') || lastUserMsg.includes('seo')) {
        return "Our growth team runs data-driven performance marketing, SEO, and paid acquisition campaigns on our dedicated dashboard: https://www.reddingtonglobal.com/services/digital-marketing\nWhat customer acquisition channels are you currently prioritizing for growth?";
      }

      if (lastUserMsg.includes('bpo') || lastUserMsg.includes('cut') || lastUserMsg.includes('call') || lastUserMsg.includes('support') || lastUserMsg.includes('sales')) {
        return "Our dual-shore BPO delivery helps optimize operational costs with 24/7 dedicated customer care and sales operations: https://www.reddingtonglobal.com/services/bpo-sales\nWhat is your current monthly ticket or call volume, and would you like us to evaluate potential operational efficiencies during a ₹99 strategy call?";
      }

      if (lastUserMsg.includes('price') || lastUserMsg.includes('cost') || lastUserMsg.includes('book') || lastUserMsg.includes('consult') || lastUserMsg.includes('99')) {
        return `You can book your 30-minute introductory strategy session for ₹99 on our ${targetService.name} dashboard: ${targetService.url}\nWhat are the primary operational challenges or goals you want our consultants to evaluate during your session?`;
      }

      return "Hello! I am Reddington Global's Enterprise Solutions Advisor for BPO, Software & AI, and Bookkeeping services.\nWhich service area or operational challenge can I help scale for your business today?";
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
            { role: 'system', content: servicesKnowledge },
            ...messages.slice(-8),
          ],
          temperature: 0.3,
          max_tokens: 500,
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
