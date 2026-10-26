import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Retrieves the live API key from process.env or falls back to reading .env.local
 * to ensure newly configured keys work even if the server was started earlier.
 */
function getLiveApiKey() {
  const envKey = (
    process.env.GROQ_API_KEY ||
    process.env.GROK_API_KEY ||
    process.env.XAI_API_KEY ||
    ''
  ).trim();
  if (envKey) return envKey;

  try {
    const envLocalPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, 'utf8');
      const match = content.match(/GROQ_API_KEY\s*=\s*([^\r\n]+)/);
      if (match && match[1]) return match[1].trim();
    }
  } catch (err) {
    // ignore
  }
  return '';
}

/**
 * Retrieves the preferred Groq model name, defaulting to fast conversational chat model.
 */
function getLiveModel() {
  const envModel = (process.env.GROQ_MODEL || process.env.GROK_MODEL || '').trim();
  if (envModel && !envModel.includes('grok')) return envModel;

  try {
    const envLocalPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, 'utf8');
      const match = content.match(/GROQ_MODEL\s*=\s*([^\r\n]+)/);
      if (match && match[1]) return match[1].trim();
    }
  } catch (err) {
    // ignore
  }
  return 'qwen/qwen3.8-27b';
}

/**
 * Builds the comprehensive, sales-agent focused system prompt for Argo.
 * Enforces strict project-only boundary rules with zero tolerance for outside questions.
 */
function buildSystemPrompt(currentPage = '') {
  return `
You are Argo, the executive mascot and Senior Solutions Consultant / Sales Advisor for Reddington Global (RGC — Reddington Global Consultancy Pvt Ltd).
You are an energetic, warm, consultative, and articulate business sales advisor. You help founders, executives, and managers scale operations, reduce overhead, and deploy high-performing solutions.

═════════════════════════════════════════════════════════════════════════════
CRITICAL MANDATE: STRICT PROJECT-ONLY BOUNDARY (ZERO OUTSIDE ANSWERS)
═════════════════════════════════════════════════════════════════════════════
1. YOU ONLY ANSWER QUESTIONS RELATED TO REDDINGTON GLOBAL (RGC), ITS SERVICES, SOLUTIONS, PACKAGES, OPERATIONS, TEAM, PRICING, AND CONTACT CHANNELS.
2. STRICTLY PROHIBITED TOPICS (YOU MUST POLITELY REFUSE & DEFLECT):
   • General trivia, history, geography, celebrity gossip, movies, sports, weather, jokes, riddles, poems, recipes.
   • General coding help, computer science homework, writing generic algorithms, debugging non-RGC code (e.g. "write a python function to sort an array", "how does a binary tree work in C++").
   • Politics, religion, medical advice, personal advice, legal advice outside RGC compliance frameworks.
   • Third-party competitor reviews or generic tech support for consumer gadgets.
3. MANDATORY DEFLECTION FOR OUT-OF-SCOPE QUERIES:
   When an off-topic or outside question is asked, politely decline in 1 short sentence and immediately redirect back to Reddington Global's services.
   Example: "I specialize exclusively in Reddington Global's BPO, Web Development, and Bookkeeping & Payroll services. Which of our solutions can I assist you with today?"

═════════════════════════════════════════════════════════════════════════════
COMPANY & DIRECT SALES CHANNELS
═════════════════════════════════════════════════════════════════════════════
• Company: Reddington Global Consultancy Pvt Ltd (RGC)
• Official Website: https://www.reddingtonglobal.com
• Phone / WhatsApp Direct: +91 98182 24995 (Direct WhatsApp link: https://wa.me/919818224995)
• Official Sales Email: sales@reddingtonglobal.com
• Headquarters: 750 Udyog Vihar Phase 5, Sector 19, Gurugram, Haryana 122016, India
• Delivery Model: Dual-shore delivery (India & USA) ensuring 24/7 continuous operations, strict SLA governance, and cost optimization.

═════════════════════════════════════════════════════════════════════════════
CORE PRACTICES & TRANSPARENT PRICING
═════════════════════════════════════════════════════════════════════════════
1. BOOKKEEPING & ACCOUNTING:
   • Starting at: ₹4,999/month (up to 50 transactions).
   • Scope: Audit-ready general ledgers, bank & credit card reconciliations, monthly P&L and Balance Sheet statements, statutory GST return filings (GSTR-1, GSTR-3B) and TDS compliance.
   • Software supported: Tally Prime, Zoho Books, QuickBooks, Excel.
   • URL: https://www.reddingtonglobal.com/services/bookkeeping-accountancy

2. PAYROLL SERVICES SPECIAL PACKAGE:
   • Starter Package: ₹4,999 + GST (For up to 10 employees).
   • Scope: Verified payroll data, accurate wage and overtime calculations, statutory tax deductions (PF, ESIC, Professional Tax, TDS withholding), and clean net salary balance statements for bank payout.
   • STRICT PAYROLL RULE: Show ONLY this ₹4,999 package for payroll up to 10 employees. We provide payroll data and balance calculations only (client executes bank payouts).
   • URL: https://www.reddingtonglobal.com/services/payroll-compensation

3. WEBSITE DEVELOPMENT SPECIAL PACKAGE:
   • Basic Bundle: ₹4,999 + GST.
   • Timeline: Live in 7 days guaranteed.
   • Deliverables: Up to 5 pages (Home, About, Services, Gallery, Contact), mobile-responsive design, one-tap WhatsApp chat button & click-to-call, lead enquiry form routed to client inbox, Google Maps + basic SEO, SSL security, 30 days free post-launch support.
   • Custom enterprise portals & full-stack web applications also available.
   • URL: https://www.reddingtonglobal.com/services/web-development

4. BPO & CUSTOMER OPERATIONS:
   • 24/7 dual-shore customer care (voice, chat, email helpdesk), inbound SDR speed-to-lead (<5 mins), outbound telecalling & pipeline generation, KYC/AML processing, QA governance.
   • URL: https://www.reddingtonglobal.com/services/bpo-customer-service
   • BPO Partnerships for call center owners & campaigns: https://www.reddingtonglobal.com/bpo-partnerships

5. STRATEGIC DISCOVERY CONSULTATION:
   • 1-on-1 Practice Director Strategy Session: ₹99 (30-minute deep dive with Senior Practice Director, fully deductible upon formal contract engagement).
   • URL: https://www.reddingtonglobal.com/contact

${currentPage ? `\n═════════════════════════════════════════════════════════════════════════════\nVISITOR CONTEXT: The user is currently browsing the page: ${currentPage}\n═════════════════════════════════════════════════════` : ''}

═════════════════════════════════════════════════════
SALES AGENT CONVERSATION RULES (CRITICAL)
═════════════════════════════════════════════════════
1. SHORT & CONCISE (2 TO 3 SENTENCES MAXIMUM):
   • Keep responses strictly under 40 to 60 words. No walls of text. Fast to read on mobile.
2. CONSULTATIVE SALES FOCUS:
   • Immediately acknowledge what the user needs.
   • Mention the starting package price (e.g., ₹4,999) or relevant solution with the service link.
   • Conclude with ONE helpful qualifying question (e.g. transaction volume, employee count, or launch timeline) to encourage user response.
3. CLEAR CALL TO ACTION:
   • Provide the relevant service link or offer direct WhatsApp support (+91 98182 24995).
`;
}

function sanitizeAdvisoryLanguage(text) {
  if (!text) return '';
  return text
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
    .replace(/\bmap\s+this\s+exact\s+roi\b/gi, 'map a tailored strategic roadmap')
    .replace(/\bmap\s+(?:an?|the|your)\s+exact\s+roi\b/gi, 'map a tailored operational roadmap')
    .replace(/\bexact\s+roi\b/gi, 'tailored strategic roadmap')
    .replace(/\bguaranteed\s+roi\b/gi, 'strategic value')
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

/**
 * Comprehensive NLP fallback reply engine.
 * Accurately extracts intents with regex variations, synonyms, and whitespace tolerance.
 */
function getFallbackReply(messages, lastUserMsg) {
  const allText = messages.map((m) => m.content?.toLowerCase() || '').join(' ');
  const userText = (lastUserMsg || '').toLowerCase().trim();
  const normalized = userText.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');
  const cleanMsg = normalized.replace(/[^a-z0-9]/g, '');

  // 1. Direct Contact / Phone / WhatsApp / Talk to human
  if (/\b(contact|phone|call|whatsapp|wa\.me|email|number|speak with|talk to human|agent|sales team|office|address)\b/i.test(normalized)) {
    return "You can connect directly with our sales leadership on WhatsApp or phone at **+91 98182 24995** (https://wa.me/919818224995) or email sales@reddingtonglobal.com.\n\nWould you like our team to schedule a quick call with you today?";
  }

  // 2. Bookkeeping & Accounting Intent (handles 'book keeping', 'bookkeeping', 'ledger', 'gst', etc.)
  if (/\b(book[\s-]*keep(?:ing|er|s)?|account(?:ing|ant|s)?|ledger|audit|balance\s*sheet|p&l|profit\s*(?:and|&)\s*loss|financials?|reconcil(?:e|iation|ing)|tally|zoho(?:\s*books)?|quickbooks?|gst(?:r)?|tds|tax(?:es|ation)?)\b/i.test(normalized)) {
    return "Our Bookkeeping & Accounting service starts at **₹4,999/month** (up to 50 transactions), covering audit-ready ledgers, bank reconciliations, P&L reports, and GST/TDS filings: https://www.reddingtonglobal.com/services/bookkeeping-accountancy\n\nRoughly how many monthly transactions or invoices does your business process?";
  }

  // 3. Payroll & Compensation Intent (handles 'pay roll', 'payroll', 'salary', 'wages', 'pf', 'esic')
  if (/\b(pay[\s-]*roll|salenc|salaries|salary|wage|wages|payslip|pay\s*slip|compensation|pf\b|provident\s*fund|esic|pt\b|professional\s*tax|staff\s*payout|employee\s*pay)\b/i.test(normalized)) {
    return "Our Payroll Package is just **₹4,999/month** for up to 10 employees, covering accurate wage calculations, statutory tax deductions (PF/ESIC/PT/TDS), and net salary balance statements: https://www.reddingtonglobal.com/services/payroll-compensation\n\nHow many employees are currently on your payroll?";
  }

  // 4. Web Development & Engineering Intent (handles 'web site', 'website', 'web dev', 'landing page')
  if (/\b(web[\s-]*dev(?:elopment)?|web[\s-]*site|landing[\s-]*page|frontend|portal|next\.?js|react|ecommerce|e-commerce|wordpress|redesign|build\s+(?:a\s+)?site|software|app\s*dev)\b/i.test(normalized)) {
    return "Our All-Inclusive Website Package is just **₹4,999 + GST**—delivered live in 7 days with up to 5 pages, mobile-responsive layout, WhatsApp CTA, and lead form: https://www.reddingtonglobal.com/services/web-development\n\nWhat type of website or business are you looking to launch?";
  }

  // 5. BPO Partnerships / Seat Filling
  if (/\b(partner(?:ship|s)?|campaign(?:s)?|seat\s*fill(?:ing)?|center\s*owner|process\s*franchise)\b/i.test(normalized)) {
    return "We partner with qualified BPO centers to place verified enterprise voice & non-voice campaigns: https://www.reddingtonglobal.com/bpo-partnerships\n\nHow many active seats does your center operate?";
  }

  // 6. BPO & Customer Operations Intent
  if (/\b(bpo|customer\s*(?:care|service|support)|call\s*center|tele(?:calling|caller|marketing)|inbound|outbound|helpdesk|telecom|voice\s*support|chat\s*support|sdr|lead\s*gen(?:eration)?|back[\s-]*office|kyc)\b/i.test(normalized)) {
    return "We provide 24/7 dual-shore customer care and BPO operations (voice, chat, email helpdesk) with dedicated agents and strict SLA guarantees: https://www.reddingtonglobal.com/services/bpo-customer-service\n\nAre you looking for inbound customer care or outbound sales calling?";
  }

  // 7. Pricing & Packages Intent
  if (/\b(price|pricing|cost|how\s*much|fees?|charges?|rate\s*card|quote|packages?|4999|99|rates?)\b/i.test(normalized)) {
    return "Our core starter packages are just **₹4,999 + GST** (Website Development live in 7 days, or Payroll for up to 10 staff), and **₹99** for a 1-on-1 Practice Director Strategy Session: https://www.reddingtonglobal.com/contact\n\nWhich practice can I share more details on?";
  }

  // 8. Affirmative Responses ("yes", "sure", "ok", "interested", "proceed", "book")
  if (['yes', 'yeah', 'sure', 'ok', 'okay', 'yup', 'yep', 'interested', 'yesplease', 'proceed', 'book', 'start'].includes(cleanMsg)) {
    if (allText.includes('web') || allText.includes('site')) {
      return "Fantastic! You can book your ₹4,999 Website Package directly here: https://www.reddingtonglobal.com/services/web-development (or message us on WhatsApp: +91 98182 24995).\n\nDo you already have your domain or content ready?";
    }
    if (allText.includes('payroll') || allText.includes('salary')) {
      return "Excellent! You can reserve your ₹4,999 Payroll Package here: https://www.reddingtonglobal.com/services/payroll-compensation (or WhatsApp +91 98182 24995).\n\nWould you like our onboarding checklist?";
    }
    if (allText.includes('bookkeeping') || allText.includes('account')) {
      return "Great! You can schedule your Bookkeeping onboarding here: https://www.reddingtonglobal.com/services/bookkeeping-accountancy (or WhatsApp +91 98182 24995).\n\nWhich accounting platform do you prefer?";
    }
    return "Excellent! You can book your 1-on-1 Strategy Session (₹99) right here: https://www.reddingtonglobal.com/contact (or message WhatsApp: +91 98182 24995).\n\nWhat is your target launch date?";
  }

  // 9. Standard Warm Greetings
  if (/^(hi|hello|hey|good\s*(?:morning|afternoon|evening)|greetings|hola)\b/i.test(normalized)) {
    return "Hello! I am Argo, Senior Solutions Advisor at Reddington Global. We specialize in BPO Operations, ₹4,999 Website Development, and ₹4,999 Bookkeeping & Payroll solutions.\n\nWhich service can I help you explore today?";
  }

  // 10. Default Consultative Fallback
  return "I'd be delighted to help! At Reddington Global, we provide 24/7 BPO Operations, ₹4,999 Website Development, and ₹4,999 Bookkeeping & Payroll services: https://www.reddingtonglobal.com/contact (or WhatsApp +91 98182 24995).\n\nWhich of these areas are you looking to grow or streamline?";
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
          "I specialize exclusively in Reddington Global's BPO, Web Development, and Bookkeeping & Payroll services. Which of our services can I assist you with today?",
      });
    }

    const apiKey = getLiveApiKey();

    // If key not configured, return instant knowledge fallback
    if (!apiKey) {
      return NextResponse.json({
        message: sanitizeAdvisoryLanguage(getFallbackReply(messages, lastUserMsg)),
      });
    }

    // Determine provider & endpoint based on key prefix
    const isGroq = apiKey.startsWith('gsk_') || Boolean(process.env.GROQ_API_KEY);
    const apiEndpoint = isGroq
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://api.x.ai/v1/chat/completions';

    const preferredModel = getLiveModel();
    const candidateModels = isGroq
      ? [preferredModel, 'openai/gpt-oss-120b', 'openai/gpt-oss-20b'].filter(Boolean)
      : [preferredModel, 'grok-2-latest'].filter(Boolean);

    let lastError = null;

    // Attempt candidates
    for (const modelName of [...new Set(candidateModels)]) {
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
            max_tokens: 300,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(`AI model ${modelName} returned ${response.status}:`, errorText);
          lastError = `Status ${response.status}: ${errorText}`;
          continue; // try next candidate model
        }

        const data = await response.json();
        const rawReply = (data?.choices?.[0]?.message?.content || '').trim();

        if (rawReply) {
          const reply = rawReply
            .replace(/\r\n/g, '\n')
            .replace(/([.!?])\s+(\*\*[A-Z][^*]+\*\*)/g, '$1\n\n$2\n')
            .replace(/\s*[•●]\s*/g, '\n• ')
            .replace(/(\*\*[A-Z][^*]+\*\*)\s+(•|\*\*)/g, '$1\n$2')
            .trim();
          return NextResponse.json({ message: sanitizeAdvisoryLanguage(reply) });
        }
      } catch (err) {
        console.warn(`Error querying model ${modelName}:`, err);
        lastError = err?.message || String(err);
      }
    }

    // If all AI candidates failed or returned empty content, use intelligent NLP fallback
    console.warn('AI completions exhausted or failed, using NLP fallback. Last error:', lastError);
    return NextResponse.json({
      message: sanitizeAdvisoryLanguage(getFallbackReply(messages, lastUserMsg)),
    });
  } catch (err) {
    console.error('Chatbot API route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
