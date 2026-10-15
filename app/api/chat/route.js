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

Guidelines & Formatting:
- Keep answers concise, polite, and professional.
- Structure responses with clear spacing: separate section headers and bullet points with double linebreaks (\n\n).
- Each bullet point MUST be on its own separate line starting with "• ".
- Bold key terms and service names (e.g., **Service Name**).
- Never bundle multiple bullet points or sections into a single continuous run-on sentence.
- Recommend booking a ₹99 consultation or contacting sales@reddingtonglobal.com / +91 98182 24495 for customized proposals.
- If unsure about non-service company specifics, direct them to sales@reddingtonglobal.com.
`;

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
      const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.content?.toLowerCase() || '';
      if (lastUserMsg.includes('bpo') || lastUserMsg.includes('call') || lastUserMsg.includes('support') || lastUserMsg.includes('sales')) {
        return "Reddington Global provides complete BPO & Customer Operations: 24/7 customer support, back-office data operations, outbound/inbound sales development, and recruitment outsourcing. You can schedule an introductory consultation for ₹99 on our site or email sales@reddingtonglobal.com.";
      }
      if (lastUserMsg.includes('ai') || lastUserMsg.includes('software') || lastUserMsg.includes('saas') || lastUserMsg.includes('web') || lastUserMsg.includes('app')) {
        return "Our Software & IT Solutions vertical builds enterprise AI architectures, custom LLM solutions, full-stack Next.js/React SaaS platforms, and secure API integrations. Reach out at sales@reddingtonglobal.com or book a ₹99 consultation.";
      }
      if (lastUserMsg.includes('accounting') || lastUserMsg.includes('bookkeeping') || lastUserMsg.includes('tax') || lastUserMsg.includes('payroll') || lastUserMsg.includes('gst')) {
        return "Our Bookkeeping & Accounting team handles audit-ready ledgers, bank reconciliations, GST/TDS tax compliance, and payroll compensation management with strict SLA guarantees.";
      }
      if (lastUserMsg.includes('price') || lastUserMsg.includes('cost') || lastUserMsg.includes('book') || lastUserMsg.includes('consult')) {
        return "You can book an introductory strategy consultation directly on our website for ₹99, or contact our sales team at sales@reddingtonglobal.com / +91 98182 24495 for customized enterprise SLA pricing.";
      }
      return "Hello! I am Reddington Global's AI Assistant. We provide BPO & Customer Operations, Software Development & Enterprise AI Solutions, and Bookkeeping & Accounting. How can I help your business today?";
    };

    // If key not configured, return instant knowledge fallback
    if (!apiKey) {
      return NextResponse.json({
        message: getFallbackReply(),
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
          message: getFallbackReply(),
          notice: `AI API response ${response.status}`,
        });
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content || getFallbackReply();
      return NextResponse.json({ message: reply });
    } catch (grokErr) {
      console.warn('AI fetch failed, falling back:', grokErr);
      return NextResponse.json({ message: getFallbackReply() });
    }
  } catch (err) {
    console.error('Chatbot API route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
