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
  Bell,
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
    <div className="admin-shell">
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="admin-sidebar">
        {/* Brand */}
        <div >
          <Link href="/admin" >
            <div >
              <Image
                src="/vloxia-logo.png"
                alt="VLOXIA"
                width={100}
                height={32}
                
              />
            </div>
            <span >
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav >
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                
              >
                <item.icon  />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Storefront Link & Admin Profile */}
        <div >
          <Link
            href="/"
            target="_blank"
            
          >
            <span>Live Website</span>
            <ExternalLink  />
          </Link>

          <div >
            <div >
              <div >
                {adminUser?.name ? adminUser.name.charAt(0) : "A"}
              </div>
              <div >
                <div >
                  {adminUser?.name || "Admin"}
                </div>
                <div >Super Admin</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              
            >
              <LogOut  />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MOBILE DRAWER ── */}
      {sidebarOpen && (
        <div >
          <div
            
            onClick={() => setSidebarOpen(false)}
          />
          <div >
            <div >
              <span >VLOXIA PANEL</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X  />
              </button>
            </div>
            <nav >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  
                >
                  <item.icon  />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            <button
              onClick={handleLogout}
              
            >
              <LogOut  />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <div className="admin-main">
        {/* Top Navbar */}
        <header className="admin-topbar">
          <div >
            <button
              onClick={() => setSidebarOpen(true)}
              
            >
              <Menu  />
            </button>
            <h1 >
              {navigation.find((n) => n.href === pathname)?.name || "Admin Center"}
            </h1>
          </div>

          <div >
            <div >
              <ShieldCheck  />
              <span>SMTP & DB Active</span>
            </div>

            <Link
              href="/shop"
              target="_blank"
              
            >
              <span>View Store</span>
              <ExternalLink  />
            </Link>
          </div>
        </header>

        {/* Canvas */}
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
