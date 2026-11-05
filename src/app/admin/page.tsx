import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Inbox,
  ArrowUpRight,
  DollarSign,
  Plus,
  Building2,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [productCount, orderCount, inquiryCount, partnerCount, recentInquiries, recentOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.inquiry.count(),
      prisma.clientLogo.count(),
      prisma.inquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.order.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    ]);

  const totalRevenue = await prisma.order.aggregate({
    _sum: { totalAmount: true },
  });

  const cards = [
    {
      name: "Total Gross Revenue",
      value: `₹${(totalRevenue._sum.totalAmount || 0).toLocaleString("en-IN")}`,
      sub: "Processed via Razorpay",
      icon: DollarSign,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      name: "E-Commerce Orders",
      value: orderCount.toString(),
      sub: "Total hardware purchases",
      icon: ShoppingBag,
      iconColor: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      name: "Leads & Inquiries",
      value: inquiryCount.toString(),
      sub: "Forms & B2B requests",
      icon: Inbox,
      iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      name: "Products in Catalog",
      value: productCount.toString(),
      sub: `${partnerCount} active partners & SKUs`,
      icon: Package,
      iconColor: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── TOP STATS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.name}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {c.name}
                </span>
                <div className={`p-2.5 rounded-xl border ${c.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-normal text-slate-950 tracking-tight">
                  {c.value}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">{c.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── RECENT INQUIRIES & ORDERS SPLIT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Recent Leads & Inquiries
                </h2>
                <p className="text-xs text-slate-500">Website contact and quotation submissions</p>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentInquiries.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No leads recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-start justify-between gap-3 border border-slate-100"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {inq.fullName}
                        </span>
                        {inq.solution && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-semibold truncate">
                            {inq.solution}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {inq.phone} • {inq.city || "Pan India"}
                      </div>
                      {inq.message && (
                        <p className="text-xs text-slate-600 mt-1.5 line-clamp-1 italic">
                          &quot;{inq.message}&quot;
                        </p>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0 ${
                        inq.status === "RESOLVED"
                          ? "bg-emerald-100 text-emerald-700"
                          : inq.status === "CONTACTED"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Recent E-Commerce Orders
                </h2>
                <p className="text-xs text-slate-500">Marketplace hardware transactions</p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No marketplace orders received yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between gap-3 border border-slate-100"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 font-mono">
                        {ord.orderNumber}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5 truncate">{ord.customerName}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(ord.createdAt).toLocaleDateString("en-IN")}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-slate-900">
                        ₹{ord.totalAmount.toLocaleString("en-IN")}
                      </div>
                      <span
                        className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          ord.fulfillmentStatus === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-700"
                            : ord.fulfillmentStatus === "SHIPPED"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {ord.fulfillmentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── QUICK CMS SHORTCUTS ── */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">
            Need to update product catalogue or client logos?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Add new EV chargers, modify pricing, upload client partner logos without developer intervention.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/clients"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-4 h-4" />
            <span>Manage Partners</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
