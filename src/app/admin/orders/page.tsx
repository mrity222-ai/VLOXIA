"use client";

import React, { useState, useEffect } from "react";
import { Eye, CheckCircle2, Clock, XCircle, ShoppingBag, X } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setStatusUpdating(true);
    try {
      await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, fulfillmentStatus: newStatus }),
      });
      fetchOrders();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, fulfillmentStatus: newStatus });
      }
    } catch (e) {
      alert("Failed to update status");
    } finally {
      setStatusUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          E-Commerce Orders & Transactions
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Track and fulfill clean energy hardware purchases and Razorpay payments.
        </p>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Fulfillment</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs font-semibold">Loading customer orders...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <ShoppingBag className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                    <p className="text-xs font-semibold">No orders recorded yet.</p>
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-xs text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md">
                        {ord.orderNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs sm:text-sm font-bold text-gray-900">{ord.customerName}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">{ord.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-extrabold text-gray-900">
                      ₹{ord.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={ord.fulfillmentStatus}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        disabled={statusUpdating}
                        className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-blue-500"
                      >
                        <option value="PROCESSING">Processing</option>
                        <option value="DISPATCHED">Dispatched</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                      {new Date(ord.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Order Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ORDER DETAILS MODAL ── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 z-10 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-black text-gray-900 tracking-tight">
                  Order #{selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-200/80 space-y-1.5 text-xs text-gray-700">
              <div className="font-bold uppercase tracking-wider text-[10px] text-gray-400 mb-2">
                Customer Details
              </div>
              <div><strong className="text-gray-900">Name:</strong> {selectedOrder.customerName}</div>
              <div><strong className="text-gray-900">Phone:</strong> {selectedOrder.customerPhone}</div>
              {selectedOrder.customerEmail && <div><strong className="text-gray-900">Email:</strong> {selectedOrder.customerEmail}</div>}
              {selectedOrder.customerCity && <div><strong className="text-gray-900">City:</strong> {selectedOrder.customerCity}</div>}
            </div>

            <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-200/80 space-y-1.5 text-xs text-gray-700">
              <div className="font-bold uppercase tracking-wider text-[10px] text-gray-400 mb-2">
                Payment Details
              </div>
              <div><strong className="text-gray-900">Payment ID:</strong> {selectedOrder.razorpayPaymentId || "Mock / Test"}</div>
              <div><strong className="text-gray-900">Order Ref:</strong> {selectedOrder.razorpayOrderId || "Direct API"}</div>
              <div className="pt-2 text-sm font-black text-gray-900 border-t border-gray-200 mt-2">
                Grand Total: ₹{selectedOrder.totalAmount.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
