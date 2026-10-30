import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Inbox,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  DollarSign,
  AlertCircle,
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
      color: "text-blue-600 bg-blue-50",
    },
    {
      name: "E-Commerce Orders",
      value: orderCount.toString(),
      sub: "Total hardware purchases",
      icon: ShoppingBag,
      color: "text-blue-600 bg-blue-50",
    },
    {
      name: "Leads & Inquiries",
      value: inquiryCount.toString(),
      sub: "Forms & B2B requests",
      icon: Inbox,
      color: "text-blue-600 bg-blue-50",
    },
    {
      name: "Products in Catalog",
      value: productCount.toString(),
      sub: "Active clean energy SKUs",
      icon: Package,
      color: "text-blue-600 bg-blue-50",
    },
  ];

  return (
    <div >
      {/* ── TOP STATS ── */}
      <div >
        {cards.map((c) => (
          <div
            key={c.name}
            
          >
            <div >
              <span >
                {c.name}
              </span>
              <div >
                <c.icon  />
              </div>
            </div>
            <div>
              <div >{c.value}</div>
              <div >{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── RECENT INQUIRIES & ORDERS SPLIT ── */}
      <div >
        {/* Recent Inquiries */}
        <div >
          <div >
            <div>
              <h2 >Recent Leads & Inquiries</h2>
              <p >Website contact and quotation submissions</p>
            </div>
            <Link
              href="/admin/inquiries"
              
            >
              View All <ArrowUpRight  />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div >No leads recorded yet.</div>
          ) : (
            <div >
              {recentInquiries.map((inq) => (
                <div key={inq.id} >
                  <div >
                    <div >
                      <span >{inq.fullName}</span>
                      <span >
                        {inq.solution || inq.type}
                      </span>
                    </div>
                    <div >
                      {inq.phone} • {inq.city || "Pan India"}
                    </div>
                    <p >
                      &quot;{inq.message}&quot;
                    </p>
                  </div>
                  <span
                    
                  >
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div >
          <div >
            <div>
              <h2 >Recent E-Commerce Orders</h2>
              <p >Marketplace hardware transactions</p>
            </div>
            <Link
              href="/admin/orders"
              
            >
              View All <ArrowUpRight  />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div >
              No marketplace orders received yet.
            </div>
          ) : (
            <div >
              {recentOrders.map((ord) => (
                <div key={ord.id} >
                  <div>
                    <div >{ord.orderNumber}</div>
                    <div >{ord.customerName}</div>
                    <div >
                      {new Date(ord.createdAt).toLocaleDateString("en-IN")}
                    </div>
                  </div>
                  <div >
                    <div >
                      ₹{ord.totalAmount.toLocaleString("en-IN")}
                    </div>
                    <span >
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
      <div >
        <div>
          <h3 >Need to update product catalogue or client logos?</h3>
          <p >
            Add new EV chargers, modify pricing, upload client partner logos without developer help.
          </p>
        </div>
        <div >
          <Link
            href="/admin/products"
            
          >
            + Add Product
          </Link>
          <Link
            href="/admin/clients"
            
          >
            Manage Partners
          </Link>
        </div>
      </div>
    </div>
  );
}
