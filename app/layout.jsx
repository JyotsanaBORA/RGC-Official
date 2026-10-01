import './globals.css';
import GoogleTracking from '../components/analytics/GoogleTracking';

export const metadata = {
  metadataBase: new URL('https://www.reddingtonglobal.com'),
  title: 'Reddington Global — Consulting That Moves Business Forward',
  description:
    'Reddington Global delivers recruitment & staffing, Immergix BPO, performance management consultancy, payroll, SaaS solutions, and bookkeeping services for businesses worldwide.',
  keywords: 'BPO, recruitment, staffing, Immergix, performance management consultancy, payroll, SaaS, bookkeeping, compliance, India, USA',
  openGraph: {
    title: 'Reddington Global Consultancy',
    description: 'Premium BPO & Staffing Solutions — India & USA',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Reddington Global',
  alternateName: ['RG Consultancy', 'Immergix BPO'],
  url: 'https://www.reddingtonglobal.com',
  logo: 'https://www.reddingtonglobal.com/assets/img/rgc-logo-opt.png',
  description:
    'Reddington Global delivers recruitment & staffing, Immergix BPO, performance management consultancy, payroll, SaaS solutions, and bookkeeping services for businesses worldwide.',
  telephone: '+919818224495',
  email: 'sales@reddingtonglobal.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '750 Udyog Vihar Phase 5, Sector 19',
    addressLocality: 'Gurugram',
    addressRegion: 'Haryana',
    postalCode: '122016',
    addressCountry: 'IN',
  },
  sameAs: ['https://www.linkedin.com/company/immergixthefuture/'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#D49F2D" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/assets/img/rgc-logo-opt.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <GoogleTracking />
        {children}
      </body>
    </html>
  );
}
