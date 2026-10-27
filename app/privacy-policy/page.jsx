import LegalPage from '../../components/LegalPage';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Reddington Global Consultancy Pvt Ltd collects, uses, stores and protects your personal data.',
  alternates: { canonical: 'https://www.reddingtonglobal.com/privacy-policy' },
};

const SECTIONS = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: [
      'This Privacy Policy explains how Reddington Global Consultancy Pvt Ltd ("Reddington Global", "we", "us") collects, uses and protects personal data when you visit www.reddingtonglobal.com, book a consultation, chat with our assistant, or contact us.',
      'Registered office: 750 Udyog Vihar Phase 5, Sector 19, Gurugram, Haryana 122016, India. We process personal data in line with applicable Indian law, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.',
    ],
  },
  {
    id: 'data-we-collect',
    title: 'Information we collect',
    body: [
      'Information you give us:',
      [
        'Contact details: name, email address, phone / WhatsApp number, company or business name.',
        'Billing details: GSTIN (optional) for tax invoices.',
        'Requirements: the service and plan you are interested in, business type or team size, and any message you write.',
        'Chat messages you send to our website assistant.',
        'Job applications and partnership enquiries submitted through our forms.',
      ],
      'Information collected automatically:',
      [
        'Campaign data: how you reached us, such as UTM parameters, Meta (fbclid) and Google (gclid) click IDs, landing page and referrer.',
        'Usage data from analytics and advertising tools (Google Analytics / Tag Manager and Meta Pixel), such as pages viewed and actions taken.',
        'Technical data such as browser type, device and IP address, processed by our hosting and analytics providers.',
      ],
      'Form drafts: to help us follow up if a booking is interrupted, our booking forms save the contact details you have typed (name, email, phone) once you enter a phone number or email, even if you do not complete payment.',
      'Payment card, UPI and bank details are entered directly on Razorpay’s secure checkout. We do not see or store them; we only receive the payment status and reference IDs.',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How we use your information',
    body: [
      [
        'To schedule and deliver your ₹99 consultation and call you to understand your requirements.',
        'To recommend a plan, timeline and quote, and to deliver services you engage us for.',
        'To process payments, issue GST tax invoices and send booking confirmations by email.',
        'To follow up on incomplete bookings and enquiries.',
        'To respond to chat messages and support requests.',
        'To measure and improve our website and advertising performance.',
        'To meet legal, tax and accounting obligations, and to prevent fraud or misuse.',
      ],
      'We do not sell your personal data.',
    ],
  },
  {
    id: 'sharing',
    title: 'Who we share it with',
    body: [
      'We share personal data only with service providers that help us run our business, and only as needed:',
      [
        'Razorpay: payment processing.',
        'Cloud hosting and database providers: to host this website and store booking records.',
        'Email service providers: to send invoices and confirmations.',
        'Google and Meta: analytics and advertising measurement.',
        'AI providers (such as Groq or xAI): messages you type into our website chat assistant are sent to these providers to generate replies. Please do not share sensitive personal information in the chat.',
        'Professional advisers and authorities, where required by law or to protect our legal rights.',
      ],
      'Some of these providers may process data outside India. Where they do, we rely on their contractual and security commitments to protect it.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies & tracking',
    body: [
      'We use cookies and similar technologies for analytics and advertising (Google and Meta), and to remember your preferences, such as light or dark theme. You can block or delete cookies in your browser settings; some features may not work as intended if you do.',
    ],
  },
  {
    id: 'retention',
    title: 'How long we keep data',
    body: [
      'We keep booking, invoice and payment records for as long as required by tax and accounting law. Enquiry and lead records are kept while they are useful for following up with you, and are deleted or anonymised when no longer needed or when you ask us to delete them, unless we must keep them by law.',
    ],
  },
  {
    id: 'security',
    title: 'How we protect it',
    body: [
      'We use reasonable technical and organisational measures, including encrypted connections (HTTPS), access controls and reputable infrastructure providers. Client engagements are covered by confidentiality obligations. No method of transmission or storage is completely secure, but we work to protect your data and will act promptly on any incident.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: [
      'Subject to applicable law, you can ask us to:',
      [
        'Access the personal data we hold about you.',
        'Correct or update inaccurate data.',
        'Delete your data, where we are not required to keep it.',
        'Withdraw consent to marketing communications at any time.',
      ],
      'To make a request, email sales@reddingtonglobal.com. We may need to verify your identity before acting on it.',
    ],
  },
  {
    id: 'children',
    title: 'Children',
    body: [
      'Our services are intended for businesses and individuals aged 18 or over. We do not knowingly collect personal data from children.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: [
      'We may update this Privacy Policy from time to time. The "Last updated" date above shows when it was last changed. Significant changes will be highlighted on this page.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact & grievances',
    body: [
      'For questions, requests or complaints about how we handle personal data, contact us at:',
      [
        'Email: sales@reddingtonglobal.com',
        'Phone / WhatsApp: +91 98182 24995',
        'Post: Reddington Global Consultancy Pvt Ltd, 750 Udyog Vihar Phase 5, Sector 19, Gurugram, Haryana 122016, India',
      ],
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      accent="Policy."
      intro="How we collect, use and protect your personal data."
      updated="27 October 2026"
      sections={SECTIONS}
    />
  );
}
