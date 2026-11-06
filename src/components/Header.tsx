"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import MegaMenu from "./MegaMenu";

const mobileSolutionLinks = [
  { label: "EV Charging", href: "/solutions/ev-charging" },
  { label: "Solar Energy", href: "/solutions/solar-energy" },
  { label: "Energy Storage", href: "/solutions/energy-storage" },
  { label: "Power Solutions", href: "/solutions/power-solutions" },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "#", isMegaMenu: true },
  { label: "Industries", href: "/industries" },
  { label: "Partners", href: "/partners" },
  { label: "Approach", href: "/approach" },
  { label: "Marketplace", href: "/shop" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileSolutionsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileSolutionsOpen(false);
  };

  const toggleMobileMenu = () => {
    const nextOpen = !mobileOpen;
    setMobileOpen(nextOpen);
    setMobileSolutionsOpen(false);
    if (nextOpen) setMegaMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 font-sans">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* ── Left: VLOXIA Logo ── */}
          <div className="shrink-0">
            <Link href="/" className="inline-block">
              <Image
                src="/vloxia-logo.png"
                alt="VLOXIA Systems LLP"
                width={210}
                height={62}
                className="h-11 sm:h-12 w-auto object-contain transition-all"
                priority
              />
            </Link>
          </div>

          {/* ── Center: Floating Pill Navigation Bar (Matches GreenAxis Style) ── */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-gray-200/60 shadow-2xs">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

              if (item.isMegaMenu) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                  >
                    <button
                      type="button"
                      onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                      className={`inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
                        megaMenuOpen || pathname?.startsWith("/solutions")
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-950 hover:bg-white/80"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setMegaMenuOpen(false)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right: Cart Trigger & Yellow Pill "Contact" Button ── */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full text-slate-700 hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all relative cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              href="/contact"
              className="btn-hover-effect glow-hover-blue bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-full text-xs tracking-tight shadow-md shadow-blue-500/20 active:scale-95"
            >
              Contact
            </Link>
          </div>

          {/* ── Mobile Right Hamburger ── */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-full text-slate-700 hover:bg-slate-100 relative"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* ── INTERACTIVE TABBED MEGA MENU ── */}
        {megaMenuOpen && <MegaMenu onClose={() => setMegaMenuOpen(false)} />}
      </header>

      {/* ── Mobile Drawer Menu ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
            onClick={closeMobileMenu}
          />
          <nav
            id="mobile-navigation"
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <Image
                  src="/vloxia-logo.png"
                  alt="VLOXIA"
                  width={170}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-2">
                {navItems.map((item) =>
                  item.isMegaMenu ? (
                    <div key={item.label} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => setMobileSolutionsOpen((open) => !open)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-50"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileSolutionsOpen && (
                        <div className="pl-4 space-y-1 border-l-2 border-slate-100 ml-4">
                          {mobileSolutionLinks.map((solution) => (
                            <Link
                              key={solution.href}
                              href={solution.href}
                              onClick={closeMobileMenu}
                              className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:text-blue-600"
                            >
                              {solution.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                        pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                          ? "bg-blue-600 text-white"
                          : "text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-full text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
