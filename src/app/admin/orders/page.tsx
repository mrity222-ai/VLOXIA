"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, CheckCircle2, Clock, XCircle, ShoppingBag, X, Truck, ExternalLink, Save } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  // Edit shipment state in modal
  const [editStatus, setEditStatus] = useState("PROCESSING");
  const [editTracking, setEditTracking] = useState("");
  const [editCourier, setEditCourier] = useState("");

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

  const openOrderModal = (ord: any) => {
    setSelectedOrder(ord);
    setEditStatus(ord.fulfillmentStatus || "PROCESSING");
    setEditTracking(ord.trackingNumber || "");
    setEditCourier(ord.notes || "");
  };

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
        setEditStatus(newStatus);
      }
    } catch (e) {
      alert("Failed to update status");
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleSaveShipmentDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setStatusUpdating(true);

    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedOrder.id,
          fulfillmentStatus: editStatus,
          trackingNumber: editTracking,
          notes: editCourier,
        }),
      });

      if (!res.ok) throw new Error("Failed to update shipment");

      alert("Shipment tracking details saved successfully! Live customer tracking page updated.");
      fetchOrders();
      setSelectedOrder({
        ...selectedOrder,
        fulfillmentStatus: editStatus,
        trackingNumber: editTracking,
        notes: editCourier,
      });
    } catch (err: any) {
      alert(err.message || "Failed to save shipment details");
    } finally {
      setStatusUpdating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-normal text-slate-950 tracking-tight">
          E-Commerce Orders & Transactions
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Track, fulfill clean energy hardware purchases and assign live courier tracking AWB numbers.
        </p>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Fulfillment</th>
                <th className="py-3.5 px-4">Tracking AWB</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span>Loading customer orders...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <ShoppingBag className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p>No orders recorded yet.</p>
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-slate-900">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-xs">
                        {ord.orderNumber}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{ord.customerName}</div>
                      <div className="text-[11px] text-slate-500">{ord.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">
                      ₹{ord.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={ord.fulfillmentStatus}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        disabled={statusUpdating}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="PROCESSING">Processing</option>
                        <option value="DISPATCHED">Dispatched</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4">
                      {ord.trackingNumber ? (
                        <span className="font-mono text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">
                          {ord.trackingNumber}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Not assigned</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-xs">
                      {new Date(ord.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <button
                        type="button"
                        onClick={() => openOrderModal(ord)}
                        title="View & Edit Shipment Details"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
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

      {/* ── ORDER DETAILS & SHIPMENT TRACKING MODAL ── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Order #{selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl text-xs sm:text-sm text-slate-700">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Customer & Delivery Information
              </div>
              <div><strong className="text-slate-900">Name:</strong> {selectedOrder.customerName}</div>
              <div><strong className="text-slate-900">Phone:</strong> {selectedOrder.customerPhone}</div>
              {selectedOrder.customerEmail && (
                <div><strong className="text-slate-900">Email:</strong> {selectedOrder.customerEmail}</div>
              )}
              {selectedOrder.customerCity && (
                <div><strong className="text-slate-900">City / Destination:</strong> {selectedOrder.customerCity}</div>
              )}
            </div>

            {/* Shipment Tracking Assignment Form */}
            <form onSubmit={handleSaveShipmentDetails} className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-4">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Assign Live Shipment & Tracking</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Fulfillment Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="PROCESSING">Processing</option>
                    <option value="DISPATCHED">Dispatched</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Logistics Courier Name</label>
                  <input
                    type="text"
                    value={editCourier}
                    onChange={(e) => setEditCourier(e.target.value)}
                    placeholder="e.g. Blue Dart / Delhivery"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Tracking ID / AWB Number</label>
                <input
                  type="text"
                  value={editTracking}
                  onChange={(e) => setEditTracking(e.target.value)}
                  placeholder="e.g. BLUEDART_918237918"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-mono font-bold text-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <p className="text-[10px] text-slate-500">
                  This tracking ID immediately reflects live on the customer&apos;s tracking screen!
                </p>
              </div>

              <button
                type="submit"
                disabled={statusUpdating}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{statusUpdating ? "Saving..." : "Save & Update Live Tracking"}</span>
              </button>
            </form>

            {/* Quick Actions & Live Link */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <Link
                href={`/shop/orders/${selectedOrder.orderNumber}`}
                target="_blank"
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>View Live Customer Tracking Screen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
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
