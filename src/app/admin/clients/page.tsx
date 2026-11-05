"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImageUploadDropzone from "../../../components/admin/ImageUploadDropzone";
import {
  Plus,
  Trash2,
  Edit2,
  Globe,
  Building2,
  X,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface ClientLogoItem {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string | null;
  category: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientLogoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientLogoItem | null>(null);

  const [form, setForm] = useState({
    name: "",
    logoUrl: "/partners/tatapower.png",
    websiteUrl: "",
    category: "Tier-1 Rooftop Solar & EV",
    sortOrder: "1",
    isActive: true,
  });

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      if (data?.clients) setClients(data.clients);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const openAddModal = () => {
    setEditingClient(null);
    setForm({
      name: "",
      logoUrl: "/partners/tatapower.png",
      websiteUrl: "",
      category: "Tier-1 Rooftop Solar & EV",
      sortOrder: String(clients.length + 1),
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (c: ClientLogoItem) => {
    setEditingClient(c);
    setForm({
      name: c.name,
      logoUrl: c.logoUrl,
      websiteUrl: c.websiteUrl || "",
      category: c.category || "Technology Partner",
      sortOrder: String(c.sortOrder),
      isActive: c.isActive,
    });
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingClient) {
        await fetch(`/api/admin/clients/${editingClient.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/admin/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setModalOpen(false);
      fetchClients();
    } catch (e) {
      alert("Failed to save partner logo");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this partner logo?")) return;
    try {
      await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
      fetchClients();
    } catch (e) {
      alert("Failed to delete partner logo");
    }
  };

  const toggleActive = async (c: ClientLogoItem) => {
    try {
      await fetch(`/api/admin/clients/${c.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...c, isActive: !c.isActive }),
      });
      fetchClients();
    } catch (e) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Building2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Partners &amp; OEM Logos CMS</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage Tier-1 OEM Alliances &amp; Technology Partner logos displayed in the marquee ribbon on Homepage, About Us, and Partners pages.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Partner Logo</span>
        </button>
      </div>

      {/* Grid of Partner Logos */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading partner logos...</div>
      ) : clients.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <Building2 className="w-8 h-8 mx-auto text-slate-300 mb-2" />
          <p className="text-slate-500 font-medium">No partner logos configured.</p>
          <button
            onClick={openAddModal}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
          >
            Add First Partner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Logo Graphic Container */}
                <div className="relative w-full h-24 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-center p-3 mb-4 overflow-hidden">
                  <div className="relative w-40 h-12">
                    <Image
                      src={c.logoUrl}
                      alt={c.name}
                      fill
                      sizes="160px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{c.name}</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                    #{c.sortOrder}
                  </span>
                </div>

                <div className="text-[11px] text-blue-600 font-medium mt-1">
                  {c.category?.replace(/_/g, " ")}
                </div>

                {c.websiteUrl && (
                  <a
                    href={c.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 mt-2 truncate max-w-full"
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{c.websiteUrl.replace(/^https?:\/\//, "")}</span>
                  </a>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleActive(c)}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                >
                  {c.isActive ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Live in Ribbon</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(c)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-50"
                    title="Edit Partner"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    title="Remove Logo"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingClient ? "Edit Partner Brand Logo" : "Add Partner Brand Logo"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Company / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata Power Solaroof, Waaree, Delta"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <ImageUploadDropzone
                folder="partners"
                label="Partner Brand Logo (Upload from Local Device) *"
                aspectRatio="logo"
                value={form.logoUrl}
                onChange={(url) => setForm({ ...form, logoUrl: url })}
                helperText="Upload transparent PNG or SVG logo file from your computer for best display in the ribbon."
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Category or Specialization Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tier-1 Rooftop Solar & EV, Inverters & Switchgear"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Official Website Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={form.websiteUrl}
                    onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Sort Priority
                  </label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="partnerActive"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="partnerActive" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Display in Partner Ribbon on Homepage &amp; About Us
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                >
                  {editingClient ? "Save Changes" : "Add Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
