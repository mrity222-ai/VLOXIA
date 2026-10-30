"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  HelpCircle,
  Globe,
  User,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import MegaMenu from "@/components/MegaMenu";

const mobileSolutionLinks = [
  { label: "EV Charging", href: "/solutions/ev-charging" },
  { label: "Solar Energy", href: "/solutions/solar-energy" },
  { label: "Energy Storage", href: "/solutions/energy-storage" },
  { label: "Power Solutions", href: "/solutions/power-solutions" },
];

const navItems = [
  {
    label: "Solutions",
    href: "#",
    isMegaMenu: true,
  },
  {
    label: "Industries",
    href: "/industries",
  },
  {
    label: "Partners",
    href: "/partners",
  },
  { label: "Approach", href: "/approach" },
  { label: "About", href: "/about" },
  { label: "Marketplace", href: "/shop" },
];

export default function Header() {
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-14 lg:h-16">
          
          {/* Left: Tesla-style Minimal Clean Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="inline-flex items-center group">
              <Image
                src="/vloxia-logo.png"
                alt="VLOXIA Systems LLP"
                width={140}
                height={42}
                className="h-8 lg:h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
                priority
              />
            </Link>
          </div>

          {/* Center: Tesla-Style Centered Clean Navigation */}
          <nav className="desktop-nav hidden lg:flex items-center justify-center space-x-1">
            {navItems.map((item) =>
              item.isMegaMenu ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setMegaMenuOpen(true)}
                >
                  <button
                    onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                    className={`flex items-center gap-1 px-3.5 py-1.5 text-[14px] font-medium rounded-md transition-all duration-150 ${
                      megaMenuOpen
                        ? "bg-black/[0.08] text-[#2563eb]"
                        : "text-[#171a20] hover:bg-black/[0.05]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 text-[#5c5e62] transition-transform duration-200 ${
                        megaMenuOpen ? "rotate-180 text-[#2563eb]" : ""
                      }`}
                    />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setMegaMenuOpen(false)}
                  className="px-3.5 py-1.5 text-[14px] font-medium text-[#171a20] hover:bg-black/[0.05] rounded-md transition-all duration-150"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right: Tesla-Style Icon Buttons (Help, Language/Globe, Profile & Cart) */}
          <div className="desktop-header-controls hidden lg:flex items-center space-x-1">
            {/* Help / Contact Icon */}
            <Link
              href="/contact"
              title="Help & Contact"
              className="p-2 text-[#171a20] hover:bg-black/[0.05] rounded-full transition-colors"
            >
              <HelpCircle className="w-5 h-5 stroke-[1.6]" />
            </Link>

            {/* Region / Globe Icon */}
            <button
              title="India (EN)"
              className="p-2 text-[#171a20] hover:bg-black/[0.05] rounded-full transition-colors"
            >
              <Globe className="w-5 h-5 stroke-[1.6]" />
            </button>

            {/* User / Partner Account Icon */}
            <Link
              href="/partners#channel-partner"
              title="Channel Partner / Account"
              className="p-2 text-[#171a20] hover:bg-black/[0.05] rounded-full transition-colors"
            >
              <User className="w-5 h-5 stroke-[1.6]" />
            </Link>

            {/* Cart Icon with Live Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              title="Shopping Cart"
              className="relative p-2 text-[#171a20] hover:bg-black/[0.05] rounded-full transition-colors ml-1"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.6]" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#2563eb] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="mobile-header-controls flex items-center gap-1 lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#171a20] hover:bg-black/[0.05] rounded-full transition-colors"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.6]" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#2563eb] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="p-2 text-[#171a20] hover:bg-black/[0.05] rounded-md transition-colors"
              onClick={toggleMobileMenu}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="w-6 h-6 stroke-[1.8]" /> : <Menu className="w-6 h-6 stroke-[1.8]" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── INTERACTIVE TABBED MEGA MENU ── */}
      {megaMenuOpen && <MegaMenu onClose={() => setMegaMenuOpen(false)} />}
    </header>

    {mobileOpen && (
      <div className="mobile-menu-overlay">
        <button
          className="mobile-menu-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
        />
        <nav id="mobile-navigation" className="mobile-menu-panel" aria-label="Mobile navigation">
          <div className="mobile-menu-links">
            {navItems.map((item) => item.isMegaMenu ? (
              <div className="mobile-menu-group" key={item.label}>
                <button
                  type="button"
                  className="mobile-menu-trigger"
                  aria-expanded={mobileSolutionsOpen}
                  onClick={() => setMobileSolutionsOpen((open) => !open)}
                >
                  <span>{item.label}</span>
                  <ChevronDown className={mobileSolutionsOpen ? "is-rotated" : ""} />
                </button>
                {mobileSolutionsOpen && (
                  <div className="mobile-submenu">
                    {mobileSolutionLinks.map((solution) => (
                      <Link key={solution.href} href={solution.href} onClick={closeMobileMenu}>
                        {solution.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                className="mobile-menu-link"
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mobile-menu-footer">
            <Link href="/contact" onClick={closeMobileMenu}>
              <HelpCircle /> Help & Contact
            </Link>
            <Link href="/partners#channel-partner" onClick={closeMobileMenu}>
              <User /> Partner Account
            </Link>
          </div>
        </nav>
      </div>
    )}
    </>
  );
}
