import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import PublicShellWrapper from "@/components/PublicShellWrapper";


export const metadata: Metadata = {
  title: "VLOXIA Systems LLP | EV Charging, Solar Energy, Lithium Storage & Power Solutions",
  description:
    "VLOXIA Systems LLP delivers technology-led clean energy solutions across EV Charging, Solar Energy, Lithium Battery Storage and Power Solutions. Based in Delhi, serving residential, commercial and industrial clients across India.",
  keywords:
    "VLOXIA, EV Charging, Solar Energy, Lithium Battery, Power Solutions, Tata EZ Power, Delhi, clean energy, energy storage",
  openGraph: {
    title: "VLOXIA Systems LLP",
    description: "Powering Mobility. Harnessing Energy. Enabling a Sustainable Future.",
    type: "website",
    locale: "en_IN",
    siteName: "VLOXIA Systems LLP",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <PublicShellWrapper>{children}</PublicShellWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
