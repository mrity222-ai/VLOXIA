import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Inbox,
  ArrowUpRight,
  DollarSign,
  TrendingUp,
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
      iconColor: "text-emerald-600 bg-emerald-50",
    },
    {
      name: "E-Commerce Orders",
      value: orderCount.toString(),
      sub: "Total hardware purchases",
      icon: ShoppingBag,
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      name: "Leads & Inquiries",
      value: inquiryCount.toString(),
      sub: "Forms & B2B requests",
      icon: Inbox,
      iconColor: "text-indigo-600 bg-indigo-50",
    },
    {
      name: "Products in Catalog",
      value: productCount.toString(),
      sub: `${partnerCount} active partners & SKUs`,
      icon: Package,
      iconColor: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── TOP STATS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((c) => (
          <div
            key={c.name}
            className="p-5 sm:p-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {c.name}
              </span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.iconColor}`}>
                <c.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {c.value}
              </div>
              <div className="text-xs text-gray-400 mt-1">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── RECENT INQUIRIES & ORDERS SPLIT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 tracking-tight">
                Recent Leads & Inquiries
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Website contact and quotation submissions</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="py-12 text-center text-xs font-semibold text-gray-400">
              No leads recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                        {inq.fullName}
                      </span>
                      {inq.solution && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                          {inq.solution}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {inq.phone} • {inq.city || "Pan India"}
                    </div>
                    {inq.message && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1 italic">
                        &quot;{inq.message}&quot;
                      </p>
                    )}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 shrink-0">
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 tracking-tight">
                Recent E-Commerce Orders
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Marketplace hardware transactions</p>
            </div>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-12 text-center text-xs font-semibold text-gray-400">
              No marketplace orders received yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentOrders.map((ord) => (
                <div key={ord.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-xs font-mono font-bold text-gray-900 truncate">
                      {ord.orderNumber}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{ord.customerName}</div>
                    <div className="text-[11px] text-gray-400">
                      {new Date(ord.createdAt).toLocaleDateString("en-IN")}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs sm:text-sm font-extrabold text-gray-900">
                      ₹{ord.totalAmount.toLocaleString("en-IN")}
                    </div>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {ord.fulfillmentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── QUICK CMS SHORTCUTS ── */}
      <div className="p-6 bg-gradient-to-r from-blue-900 via-slate-900 to-[#0B1220] text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-blue-950/20">
        <div>
          <h3 className="text-sm sm:text-base font-bold tracking-tight">
            Need to update product catalogue or client logos?
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Add new EV chargers, modify pricing, upload client partner logos without developer intervention.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            + Add Product
          </Link>
          <Link
            href="/admin/clients"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-colors"
          >
            Manage Partners
          </Link>
        </div>
      </div>
    </div>
  );
}
