import LegalPage from '../../components/LegalPage';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms governing use of the Reddington Global website, ₹99 consultation bookings and services.',
  alternates: { canonical: 'https://www.reddingtonglobal.com/terms-and-conditions' },
};

const SECTIONS = [
  {
    id: 'acceptance',
    title: 'Acceptance of these terms',
    body: [
      'These Terms & Conditions govern your use of www.reddingtonglobal.com and any consultation booked through it, operated by Reddington Global Consultancy Pvt Ltd ("Reddington Global", "we", "us"), 750 Udyog Vihar Phase 5, Sector 19, Gurugram, Haryana 122016, India.',
      'By using this website or booking a consultation, you agree to these terms and to our Privacy Policy. If you do not agree, please do not use the website.',
    ],
  },
  {
    id: 'services-pricing',
    title: 'Services, plans & pricing',
    body: [
      'We offer services across BPO operations, software and web development, bookkeeping, payroll, digital marketing, performance management and recruitment.',
      [
        'Plans shown on this website are indicative. "Starting @" prices are starting points only, and "Custom quote" plans are priced after a consultation.',
        'Prices shown for plans are exclusive of GST unless stated otherwise.',
        'Your final scope, deliverables, timeline (ETA) and price are confirmed in a written proposal or quotation after your consultation. Website content does not form a binding offer for any plan.',
        'Work on a project begins only after you accept the proposal and any agreed advance payment is received.',
      ],
    ],
  },
  {
    id: 'consultation',
    title: 'The ₹99 consultation',
    body: [
      [
        'The consultation fee is ₹99, inclusive of GST, and is paid in advance when you book.',
        'The fee covers a 1-on-1 consultation in which we review your requirements and recommend a plan, timeline and quote.',
        'The fee is for the consultation only. It is not adjusted against, deducted from or credited towards any project or plan fee.',
        'We aim to call you within 24 hours of booking, on the phone number you provide. Please make sure your contact details are correct.',
        'There is no obligation to proceed with any paid service after the consultation.',
      ],
    ],
  },
  {
    id: 'payments',
    title: 'Payments & invoices',
    body: [
      'Online payments are processed securely by Razorpay. By paying, you also agree to Razorpay’s applicable terms. A GST tax invoice is issued for every successful payment and emailed to the address you provide; add your GSTIN at booking if you need it on the invoice.',
      'Payment terms for projects and ongoing services (such as monthly plans) are set out in your proposal or service agreement.',
    ],
  },
  {
    id: 'refunds',
    title: 'Cancellations & refunds',
    body: [
      [
        'If we are unable to deliver your booked consultation, we will offer to reschedule it or refund the ₹99 fee in full.',
        'If a payment is debited but the booking fails, the amount is refunded automatically, typically within 5 to 7 business days, depending on your bank.',
        'Once a consultation has been delivered, the fee is non-refundable.',
        'Cancellation and refund terms for projects and ongoing services are set out in your proposal or service agreement.',
      ],
      'For refund requests, email sales@reddingtonglobal.com with your order ID.',
    ],
  },
  {
    id: 'client-responsibilities',
    title: 'Your responsibilities',
    body: [
      [
        'Provide accurate and complete information when booking and during an engagement.',
        'Provide content, data, access and approvals we reasonably need, on time. Delays in providing these may extend agreed timelines.',
        'Make sure you have the rights to any content, logos, images or data you share with us.',
        'Domain names, hosting and third-party subscriptions are registered in your name and billed to your account unless agreed otherwise in writing.',
      ],
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    body: [
      'All content on this website, including text, graphics, logos and design, belongs to Reddington Global or its licensors and may not be copied or reused without our written permission.',
      'Ownership of work we deliver for you is set out in your proposal or service agreement. Unless agreed otherwise, ownership of final deliverables passes to you once all fees for them are paid in full.',
    ],
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality',
    body: [
      'We treat information you share with us during consultations and engagements as confidential, and will sign a mutual non-disclosure agreement (NDA) on request. Our use of personal data is described in our Privacy Policy.',
    ],
  },
  {
    id: 'website-use',
    title: 'Acceptable use of the website',
    body: [
      'You agree not to misuse this website, including by attempting to gain unauthorised access, interfering with its operation, submitting false bookings, or using it for any unlawful purpose.',
      'Our website chat assistant uses AI to answer questions. Its replies are for general information only and may contain errors; they are not a binding offer, quotation or professional advice. Confirmed terms are provided only in writing by our team.',
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: [
      'The website and its content are provided "as is" for general information. To the extent permitted by law, we are not liable for any indirect, incidental or consequential loss arising from your use of the website.',
      'For the consultation, our total liability is limited to the fee you paid for it. Liability for projects and ongoing services is governed by your proposal or service agreement.',
    ],
  },
  {
    id: 'third-party',
    title: 'Third-party links & services',
    body: [
      'This website may link to or rely on third-party services, such as Razorpay, WhatsApp and social media platforms. We are not responsible for their content, availability or policies.',
    ],
  },
  {
    id: 'law',
    title: 'Governing law & disputes',
    body: [
      'These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts at Gurugram, Haryana.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: [
      'We may update these terms from time to time. The version published on this page, with its "Last updated" date, applies to your use of the website and to bookings made after that date.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: [
      [
        'Email: sales@reddingtonglobal.com',
        'Phone / WhatsApp: +91 98182 24995',
        'Post: Reddington Global Consultancy Pvt Ltd, 750 Udyog Vihar Phase 5, Sector 19, Gurugram, Haryana 122016, India',
      ],
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms &"
      accent="Conditions."
      intro="The terms for using our website and booking a consultation."
      updated="27 October 2026"
      sections={SECTIONS}
    />
  );
}
