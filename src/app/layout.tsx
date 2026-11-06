import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import PublicShellWrapper from "../components/PublicShellWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vloxia.in"),
  title: {
    default: "VLOXIA SYSTEMS LLP | EV Charging, Solar Energy, Lithium Storage & Power Solutions",
    template: "%s | VLOXIA SYSTEMS LLP",
  },
  description:
    "VLOXIA Systems LLP is a technology-driven sustainable energy and power solutions company based in Rohini, Delhi. Authorized distributor for TATA EZ POWER AC & DC EV chargers, integrated lithium battery inverters, rooftop solar, and power management ecosystems across India.",
  keywords: [
    "VLOXIA Systems LLP",
    "EV charging solutions Delhi",
    "AC DC fast charger distributor India",
    "Tata EZ Power EV charger distributor",
    "Inverter with integrated lithium battery India",
    "Lithium energy storage Delhi NCR",
    "Commercial rooftop solar Delhi",
    "Solar plus storage solutions India",
    "Power backup systems Rohini",
    "Manu Bhatia Vloxia",
  ],
  authors: [{ name: "VLOXIA SYSTEMS LLP", url: "https://www.vloxia.in" }],
  creator: "VLOXIA SYSTEMS LLP",
  publisher: "VLOXIA SYSTEMS LLP",
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
  openGraph: {
    title: "VLOXIA SYSTEMS LLP | Intelligent Energy. Reliable Power. Sustainable Solutions.",
    description:
      "Powering Mobility. Harnessing Energy. Enabling a Sustainable Future. Multi-vertical clean energy platform: EV Charging, Solar Energy, Lithium Energy Storage, and Power Solutions.",
    url: "https://www.vloxia.in",
    siteName: "VLOXIA SYSTEMS LLP",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/vloxia-logo.png",
        width: 1200,
        height: 630,
        alt: "VLOXIA SYSTEMS LLP Corporate Identity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VLOXIA SYSTEMS LLP | Clean Energy & EV Infrastructure",
    description: "Powering Mobility. Harnessing Energy. Enabling a Sustainable Future.",
    images: ["/vloxia-logo.png"],
  },
  alternates: {
    canonical: "https://www.vloxia.in",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.vloxia.in/#organization",
      "name": "VLOXIA SYSTEMS LLP",
      "legalName": "VLOXIA Systems LLP",
      "url": "https://www.vloxia.in",
      "logo": "https://www.vloxia.in/vloxia-logo.png",
      "email": "vloxiasystems@gmail.com",
      "telephone": "+91-8178810456",
      "sameAs": ["https://www.linkedin.com/company/vloxia"],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-8178810456",
          "contactType": "sales",
          "name": "Manu Bhatia",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"],
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.vloxia.in/#localbusiness",
      "name": "VLOXIA SYSTEMS LLP",
      "image": "https://www.vloxia.in/vloxia-logo.png",
      "telephone": "+91-8178810456",
      "email": "vloxiasystems@gmail.com",
      "priceRange": "₹₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "A3/55, Sector 15",
        "addressLocality": "Rohini",
        "addressRegion": "Delhi",
        "postalCode": "110089",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.7297,
        "longitude": 77.1287,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00",
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-blue-600 selection:text-white min-h-screen">
        <CartProvider>
          <PublicShellWrapper>{children}</PublicShellWrapper>
        </CartProvider>
      </body>
    </html>
  );
}