import './globals.css';
import GoogleTracking from '../components/GoogleTracking';

export const metadata = {
  metadataBase: new URL('https://www.reddingtonglobal.com'),
  title: {
    default: 'Reddington Global — Consulting That Moves Business Forward',
    template: '%s | Reddington Global',
  },
  description:
    'Reddington Global delivers enterprise BPO services (Sales, Back Office, Customer Care), strategic consultancy (SaaS, Bookkeeping & Accountancy, IT Services), and performance Digital Marketing for businesses worldwide.',
  keywords:
    'BPO services, sales outsourcing, back office operations, customer services, SaaS solutions, bookkeeping, accountancy, IT services, digital marketing, consultancy, India, USA',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Reddington Global Consultancy',
    description: 'Enterprise BPO Services, Strategic Consultancy & Digital Marketing — India & USA',
    url: 'https://www.reddingtonglobal.com',
    siteName: 'Reddington Global',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/img/rgc-logo-opt.png',
        width: 1200,
        height: 630,
        alt: 'Reddington Global Consultancy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reddington Global Consultancy',
    description: 'Enterprise BPO Services, Strategic Consultancy & Digital Marketing — India & USA',
    images: ['/assets/img/rgc-logo-opt.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Reddington Global',
  alternateName: ['RG Consultancy', 'Reddington Global BPO'],
  url: 'https://www.reddingtonglobal.com',
  logo: 'https://www.reddingtonglobal.com/assets/img/rgc-logo-opt.png',
  description:
    'Reddington Global delivers enterprise BPO services (Sales, Back Office, Customer Care), strategic consultancy (SaaS, Bookkeeping & Accountancy, IT Services), and performance Digital Marketing for businesses worldwide.',
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
  sameAs: ['https://www.linkedin.com/company/reddingtonglobal/'],
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
