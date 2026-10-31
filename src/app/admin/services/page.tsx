"use client";

import React, { useState, useEffect } from "react";
import { Plus, CheckCircle2 } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "EV Charging",
    subtitle: "",
    description: "",
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setModalOpen(false);
      fetchServices();
    } catch (e) {
      alert("Failed to save service");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Services & Solutions CMS
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Update EV charging, solar energy, storage systems and power solutions content.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service Offering</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "EV Charging Infrastructure",
            cat: "EV Charging",
            desc: "AC Wallboxes (3.3-22 kW) & DC Fast Chargers (30-120 kW+) with smart RFID and cloud billing.",
          },
          {
            title: "Solar Rooftop & Ground-mount",
            cat: "Solar Energy",
            desc: "High-efficiency commercial and residential solar power systems with net metering integration.",
          },
          {
            title: "Lithium LiFePO4 Energy Storage",
            cat: "Energy Storage",
            desc: "5.12 kWh to MWh-scale modular lithium battery packs with smart BMS and 6000+ cycle life.",
          },
          {
            title: "Hybrid Power & Backup Management",
            cat: "Power Solutions",
            desc: "Hybrid inverters, critical load UPS, automatic transfer switches and intelligent load shifting.",
          },
          ...services,
        ].map((s, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div>
              <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 mb-2">
                {s.category || s.cat}
              </span>
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight">{s.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                {s.description || s.desc}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> Active on Website
              </span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 z-10 space-y-4">
            <h3 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-3">
              Add Service Offering
            </h3>
            <form onSubmit={handleCreate} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Turnkey Fleet Depot Charging"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Vertical Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50/50"
                >
                  <option value="EV Charging">EV Charging</option>
                  <option value="Solar Energy">Solar Energy</option>
                  <option value="Energy Storage">Energy Storage</option>
                  <option value="Power Solutions">Power Solutions</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Details of the engineering solution..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50/50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
