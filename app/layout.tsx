import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const dataFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-data",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Data-Driven Business Intelligence`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dataFont.variable}`}>
      {/* Adobe Fonts (Typekit) — Proxima Nova (headings), Acumin Pro (body) */}
      <link rel="stylesheet" href="https://use.typekit.net/gpe4qia.css" precedence="default" />

      {/* Google tag (gtag.js) */}
      <Script
        async
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
      <body className="bg-background text-foreground antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Newsletter />
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}