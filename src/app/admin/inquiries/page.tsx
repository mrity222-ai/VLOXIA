"use client";

import React, { useState, useEffect } from "react";
import { Inbox, Phone, Mail, MessageSquare, Download, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (data.inquiries) setInquiries(data.inquiries);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      fetchInquiries();
    } catch (e) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this lead?")) return;
    try {
      await fetch("/api/inquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchInquiries();
    } catch (e) {
      alert("Failed to delete lead");
    }
  };

  const exportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ["Full Name", "Phone", "Email", "Solution", "Type", "City", "Message", "Status", "Date"];
    const rows = inquiries.map((i) => [
      `"${i.fullName}"`,
      `"${i.phone}"`,
      `"${i.email || ""}"`,
      `"${i.solution || ""}"`,
      `"${i.type || ""}"`,
      `"${i.city || ""}"`,
      `"${(i.message || "").replace(/"/g, '""')}"`,
      `"${i.status}"`,
      `"${new Date(i.createdAt).toLocaleDateString()}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vloxia_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = inquiries.filter((inq) => {
    if (typeFilter === "all") return true;
    return inq.type === typeFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Customer Inquiries & Partner Leads
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track and respond to quotations, general enquiries and dealer requests.
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Download className="w-4 h-4 text-gray-500" />
          <span>Export CSV / Excel</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: "All Inquiries" },
          { id: "QUOTE", label: "Quotation Requests" },
          { id: "GENERAL", label: "General Contact" },
          { id: "PARTNER", label: "Channel Partners" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTypeFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              typeFilter === tab.id
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white text-gray-600 border border-gray-200/80 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Solution / Segment</th>
                <th className="px-6 py-4">Requirement / Message</th>
                <th className="px-6 py-4">Lead Status</th>
                <th className="px-6 py-4">Quick Connect</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs font-semibold">Loading leads...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <Inbox className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                    <p className="text-xs font-semibold">No inquiry records found.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-xs sm:text-sm font-bold text-gray-900">{inq.fullName}</div>
                      {inq.companyName && (
                        <div className="text-[11px] font-medium text-gray-500">{inq.companyName}</div>
                      )}
                      <div className="text-xs text-blue-600 font-mono mt-0.5">{inq.phone}</div>
                      <div className="text-[11px] text-gray-400">{inq.city || "Not specified"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700">
                        {inq.solution || inq.type}
                      </span>
                      {inq.customerType && (
                        <div className="text-[11px] text-gray-400 mt-1">{inq.customerType}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                        {inq.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-blue-500"
                      >
                        <option value="NEW">New</option>
                        <option value="IN_REVIEW">In Discussion</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="CLOSED">Won / Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          title="WhatsApp Chat"
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-200/60"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:${inq.phone}`}
                          title="Call"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200/60"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
