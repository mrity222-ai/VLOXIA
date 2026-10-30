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
    <header >
      <div >
        <div >
          
          {/* Left: Tesla-style Minimal Clean Logo */}
          <div >
            <Link href="/" >
              <Image
                src="/vloxia-logo.png"
                alt="VLOXIA Systems LLP"
                width={140}
                height={42}
                
                priority
              />
            </Link>
          </div>

          {/* Center: Tesla-Style Centered Clean Navigation */}
          <nav >
            {navItems.map((item) =>
              item.isMegaMenu ? (
                <div
                  key={item.label}
                  
                  onMouseEnter={() => setMegaMenuOpen(true)}
                >
                  <button
                    onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                    
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      
                    />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setMegaMenuOpen(false)}
                  
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right: Tesla-Style Icon Buttons (Help, Language/Globe, Profile & Cart) */}
          <div >
            {/* Help / Contact Icon */}
            <Link
              href="/contact"
              title="Help & Contact"
              
            >
              <HelpCircle  />
            </Link>

            {/* Region / Globe Icon */}
            <button
              title="India (EN)"
              
            >
              <Globe  />
            </button>

            {/* User / Partner Account Icon */}
            <Link
              href="/partners#channel-partner"
              title="Channel Partner / Account"
              
            >
              <User  />
            </Link>

            {/* Cart Icon with Live Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              title="Shopping Cart"
              
              aria-label="View Cart"
            >
              <ShoppingCart  />
              {totalItems > 0 && (
                <span >
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div >
            <button
              onClick={() => setIsCartOpen(true)}
              
              aria-label="View Cart"
            >
              <ShoppingCart  />
              {totalItems > 0 && (
                <span >
                  {totalItems}
                </span>
              )}
            </button>

            <button
              
              onClick={toggleMobileMenu}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X  /> : <Menu  />}
            </button>
          </div>

        </div>
      </div>

      {/* ── INTERACTIVE TABBED MEGA MENU ── */}
      {megaMenuOpen && <MegaMenu onClose={() => setMegaMenuOpen(false)} />}
    </header>

    {mobileOpen && (
      <div >
        <button
          
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
        />
        <nav id="mobile-navigation"  aria-label="Mobile navigation">
          <div >
            {navItems.map((item) => item.isMegaMenu ? (
              <div  key={item.label}>
                <button
                  type="button"
                  
                  aria-expanded={mobileSolutionsOpen}
                  onClick={() => setMobileSolutionsOpen((open) => !open)}
                >
                  <span>{item.label}</span>
                  <ChevronDown  />
                </button>
                {mobileSolutionsOpen && (
                  <div >
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
                
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div >
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
