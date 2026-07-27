import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const baseUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://aerazoaz.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'AERAZOAZ | Research-Based Digital Intelligence for Freelancers',
  description: 'Research-backed digital intelligence platform for freelancers worldwide. Unbiased data, reports, guides, tools, and market updates.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'AERAZOAZ | Research-Based Digital Intelligence for Freelancers',
    description: 'Research-backed digital intelligence platform for freelancers worldwide. Unbiased data, reports, guides, tools, and market updates.',
    url: baseUrl,
    siteName: 'AERAZOAZ',
    images: [
      {
        url: '/favicon.svg',
        width: 1200,
        height: 630,
        alt: 'AERAZOAZ Data Desk',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AERAZOAZ | Research-Based Digital Intelligence for Freelancers',
    description: 'Research-backed digital intelligence platform for freelancers worldwide. Unbiased data, reports, guides, tools, and market updates.',
    site: '@aerazoaz',
    creator: '@aerazoaz',
    images: ['/favicon.svg'],
  },
  other: {
    'google-site-verification': 'googleaea8cd071f32473d',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/clf6qkc.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..900;1,8..60,300..900&family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-black antialiased selection:bg-black selection:text-white">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D6H6PW3S03"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D6H6PW3S03');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
