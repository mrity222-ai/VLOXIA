"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function PublicShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  // If this is any /admin route (/admin, /admin/login, /admin/products, etc.),
  // do NOT render the public Header, CartDrawer or Footer.
  if (isAdminRoute) {
    return <main>{children}</main>;
  }

  // Standard Public website: Header -> Cart Drawer -> Page Content -> Footer
  return (
    <>
      <Header />
      <CartDrawer />
      <main>{children}</main>
      <Footer />
    </>
  );
}
