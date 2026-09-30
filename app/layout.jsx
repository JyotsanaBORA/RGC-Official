import './globals.css';
import GoogleTracking from '../components/analytics/GoogleTracking';

export const metadata = {
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
      </head>
      <body>
        <GoogleTracking />
        {children}
      </body>
    </html>
  );
}
