import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DJ Vish - Professional DJ Services in Fremont, CA | Bollywood, Hip-Hop, EDM",
  description: "DJ Vish is a professional DJ based in Fremont, CA, specializing in Bollywood, Tollywood, Hip-Hop, and EDM. Book now for weddings, parties, and corporate events.",
  authors: [{ name: "DJ Vish" }],
  generator: "Next.js",
  keywords: ["DJ Fremont", "Bollywood DJ", "Wedding DJ Bay Area", "Indian DJ California", "Party DJ", "Corporate Event DJ", "Tollywood DJ", "EDM DJ", "Hip-Hop DJ", "Multicultural DJ"],
  creator: "DJ Vish",
  publisher: "DJ Vish",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://djvish.com",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  verification: {
    google: "your-google-verification-code",
  },
  openGraph: {
    title: "DJ Vish - Professional DJ Services in Fremont, CA",
    description: "Premier Bay Area DJ specializing in multicultural events. Bollywood, Tollywood, Hip-Hop & EDM. Book for weddings, parties & corporate events.",
    url: "https://djvish.com",
    siteName: "DJ Vish",
    locale: "en_US",
    images: [
      {
        url: "https://djvish.com/images/dj-vish-profile.png",
        width: 1200,
        height: 630,
        alt: "DJ Vish - Professional DJ Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@djvish_official",
    title: "DJ Vish - Professional DJ Services in Fremont, CA",
    description: "Premier Bay Area DJ specializing in multicultural events. Book now for your special occasion!",
    images: ["https://djvish.com/images/dj-vish-profile.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Analytics 4 - Deferred for better performance */}
        <script
          defer
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: 'DJ Vish - Professional DJ Services',
                page_location: window.location.href,
              });
            `,
          }}
        />
        
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "DJ Vish",
              "description": "Professional DJ services specializing in Bollywood, Tollywood, Hip-Hop, and EDM for weddings, parties, and corporate events in the Bay Area.",
              "url": "https://djvish.com",
              "telephone": "+1-408-555-1234",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Fremont",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 37.5485,
                "longitude": -121.9886
              },
              "openingHours": "Mo-Su 09:00-23:00",
              "priceRange": "$$",
              "currenciesAccepted": "USD",
              "paymentAccepted": "Cash, Credit Card, Check",
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Fremont"
                },
                {
                  "@type": "City", 
                  "name": "San Jose"
                },
                {
                  "@type": "City",
                  "name": "Oakland"
                },
                {
                  "@type": "City",
                  "name": "San Francisco"
                }
              ],
              "serviceType": [
                "Wedding DJ",
                "Party DJ", 
                "Corporate Event DJ",
                "Bollywood DJ",
                "Multicultural DJ"
              ],
              "image": [
                "https://djvish.com/images/dj-vish-profile.png",
                "https://djvish.com/images/dj-vish-action.png"
              ],
              "sameAs": [
                "https://www.instagram.com/djvish_official",
                "https://www.facebook.com/djvishofficial",
                "https://www.yelp.com/biz/dj-vish-fremont"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
