"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Inbox,
  Wrench,
  Building2,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products & Catalog", href: "/admin/products", icon: Package },
  { name: "Orders & Payments", href: "/admin/orders", icon: ShoppingBag },
  { name: "Inquiries & Leads", href: "/admin/inquiries", icon: Inbox },
  { name: "Services CMS", href: "/admin/services", icon: Wrench },
  { name: "Partners & Clients", href: "/admin/clients", icon: Building2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    if (pathname === "/admin/login") return;

    fetch("/api/admin/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data?.admin) setAdminUser(data.admin);
      })
      .catch(() => router.push("/admin/login"));
  }, [pathname, router]);

  // If on /admin/login, don't show the dashboard shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans antialiased">
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-[#0B1220] border-r border-slate-800 flex-col justify-between p-4 z-30 shadow-xl select-none">
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 px-2">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="bg-white rounded-lg px-2 py-1 shadow-xs border border-white/20">
                <Image
                  src="/vloxia-logo.png"
                  alt="VLOXIA"
                  width={90}
                  height={28}
                  className="h-6 w-auto object-contain"
                  priority
                />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded">
                Admin
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1.5">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/30 font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-850/80"
                  }`}
                >
                  <item.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Storefront Link & Admin Profile */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 shadow-inner">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm">
                {adminUser?.name ? adminUser.name.charAt(0) : "A"}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-100 truncate">
                  {adminUser?.name || "VLOXIA Administrator"}
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold tracking-wide flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                  Super Admin
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-[#0B1220] p-4 flex flex-col justify-between z-10 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-white">VLOXIA Panel</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="mt-4 space-y-1.5">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-blue-600 text-white font-bold"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl transition-colors border border-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200/80 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-tight">
              {navigation.find((n) => n.href === pathname)?.name || "Enterprise Command Center"}
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SMTP & DB Active</span>
            </div>

            <Link
              href="/shop"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200/80 text-gray-700 text-xs font-semibold transition-colors"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
            </Link>
          </div>
        </header>

        {/* Canvas */}
        <main className="p-4 sm:p-8 flex-1 bg-[#f8fafc]">{children}</main>
      </div>
    </div>
  );
}
