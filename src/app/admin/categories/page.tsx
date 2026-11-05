"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImageUploadDropzone from "@/components/admin/ImageUploadDropzone";
import {
  Plus,
  Edit2,
  Trash2,
  Layers,
  ArrowRight,
  X,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    imageUrl:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80",
    description: "",
    sortOrder: "1",
    isActive: true,
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data?.categories) setCategories(data.categories);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setForm({
      name: "",
      slug: "",
      imageUrl:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80",
      description: "",
      sortOrder: String(categories.length + 1),
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (c: CategoryItem) => {
    setEditingCategory(c);
    setForm({
      name: c.name,
      slug: c.slug,
      imageUrl: c.imageUrl,
      description: c.description || "",
      sortOrder: String(c.sortOrder),
      isActive: c.isActive,
    });
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      name: val,
      slug: !editingCategory
        ? val.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        : prev.slug,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await fetch(`/api/admin/categories/${editingCategory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setModalOpen(false);
      fetchCategories();
    } catch (e) {
      alert("Failed to save category");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      fetchCategories();
    } catch (e) {
      alert("Failed to delete category");
    }
  };

  const toggleActive = async (c: CategoryItem) => {
    try {
      await fetch(`/api/admin/categories/${c.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...c, isActive: !c.isActive }),
      });
      fetchCategories();
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
              <Layers className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Categories CMS</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage &quot;Shop Our Top Categories&quot; on the Shop page (Image 2 style: rounded photo cards with centered white titles).
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Visual Photo Cards Grid matching Image 2 */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 font-medium">No categories found.</p>
          <button
            onClick={openAddModal}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
          >
            Create First Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all"
            >
              {/* Category Photo Card (Image 2 Visual Style) */}
              <div className="relative aspect-4/5 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Centered White Bold Category Name */}
                <div className="absolute inset-0 flex items-center justify-center p-3 text-center">
                  <h3 className="text-white font-bold text-sm sm:text-base tracking-tight drop-shadow-md">
                    {cat.name}
                  </h3>
                </div>

                {/* Top Badge: Sort Order & Active */}
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider text-white ${
                      cat.isActive ? "bg-emerald-600/90" : "bg-slate-700/90"
                    }`}
                  >
                    #{cat.sortOrder}
                  </span>
                </div>
              </div>

              {/* Bottom Quick Info & Actions */}
              <div className="p-3 bg-white flex flex-col justify-between flex-1 space-y-2 border-t border-slate-100">
                <div className="text-[11px] text-slate-400 font-mono truncate">
                  slug: /{cat.slug}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => toggleActive(cat)}
                    className="text-[11px] font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
                  >
                    {cat.isActive ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{cat.isActive ? "Live" : "Hidden"}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-1 rounded-md text-slate-500 hover:text-blue-600 hover:bg-slate-50"
                      title="Edit Category"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-slate-50"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <p className="text-xs text-slate-500">
                  Displays as visual photo card in &quot;Shop Our Top Categories&quot; row.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. EV Fast Chargers, Solar Panels"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Category Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="e.g. ev-charging, power-solar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <ImageUploadDropzone
                folder="categories"
                label="Card Photo Image (Upload from Local Device) *"
                aspectRatio="card"
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
                helperText="Upload a photo from your computer. It will fill the category card background."
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short vertical overview..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="catActive"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="catActive" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Display in &quot;Shop Our Top Categories&quot; on Shop page
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
                >
                  {editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
