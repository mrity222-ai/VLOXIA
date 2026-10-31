"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, Package, Images } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    category: "ev-charging",
    categoryLabel: "EV Charging",
    price: "",
    originalPrice: "",
    stockQuantity: "10",
    inStock: true,
    warranty: "3 Years Comprehensive Warranty",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
    badge: "",
    isPublished: true,
  });

  // Up to 5 product images state
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
    "",
    "",
    "",
    "",
  ]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.products) setProducts(data.products);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      tagline: "",
      category: "ev-charging",
      categoryLabel: "EV Charging",
      price: "",
      originalPrice: "",
      stockQuantity: "10",
      inStock: true,
      warranty: "3 Years Comprehensive Warranty",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
      badge: "",
      isPublished: true,
    });
    setImages([
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
      "",
      "",
      "",
      "",
    ]);
    setModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      tagline: p.tagline,
      category: p.category,
      categoryLabel: p.categoryLabel,
      price: p.price.toString(),
      originalPrice: p.originalPrice ? p.originalPrice.toString() : "",
      stockQuantity: p.stockQuantity.toString(),
      inStock: p.inStock,
      warranty: p.warranty,
      image: p.image,
      badge: p.badge || "",
      isPublished: p.isPublished,
    });

    // Populate images array from imagesJson or fallback to p.image
    let loadedImages: string[] = [];
    if (p.imagesJson) {
      try {
        const parsed = JSON.parse(p.imagesJson);
        if (Array.isArray(parsed)) {
          loadedImages = parsed.filter((item: any) => typeof item === "string");
        }
      } catch (err) {}
    }
    if (loadedImages.length === 0 && p.image) {
      loadedImages = [p.image];
    }
    const padded = [...loadedImages];
    while (padded.length < 5) padded.push("");
    setImages(padded.slice(0, 5));

    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanImages = images.filter((img) => img && img.trim() !== "");
      const primaryImage =
        cleanImages[0] ||
        form.image ||
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80";

      const payload = {
        ...form,
        image: primaryImage,
        images: cleanImages.length > 0 ? cleanImages : [primaryImage],
      };

      if (editingProduct) {
        // Edit
        await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create
        await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setModalOpen(false);
      fetchProducts();
    } catch (e) {
      alert("Failed to save product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (e) {
      alert("Failed to delete product");
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            E-Commerce Products & Catalogue
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage EV chargers, lithium battery packs, solar inverters and energy hardware.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 bg-[#f8fafc] transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "All Items" },
            { id: "ev-charging", label: "EV Chargers" },
            { id: "battery-storage", label: "Lithium Batteries" },
            { id: "power-solar", label: "Solar Inverters" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                categoryFilter === cat.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price (INR)</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs font-semibold">Loading catalog items...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <Package className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                    <p className="text-xs font-semibold">No products found matching filters.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        {/* THUMBNAIL CONTAINER WITH RELATIVE + FIXED DIMS PREVENTING OVERFLOW */}
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200/80 shadow-xs">
                          <Image
                            src={prod.image}
                            alt={prod.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-gray-900 truncate max-w-xs">
                            {prod.name}
                          </div>
                          <div className="text-[11px] text-gray-400 truncate max-w-xs mt-0.5">
                            {prod.tagline}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
                        {prod.categoryLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm font-extrabold text-gray-900">
                        ₹{prod.price.toLocaleString("en-IN")}
                      </div>
                      {prod.originalPrice && (
                        <div className="text-[11px] text-gray-400 line-through">
                          ₹{prod.originalPrice.toLocaleString("en-IN")}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {prod.inStock ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {prod.stockQuantity} in stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {prod.isPublished ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                          <XCircle className="w-4 h-4" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CREATE / EDIT PRODUCT MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="fixed inset-0" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 my-8 z-10 max-h-[92vh] overflow-y-auto">
            <h3 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-3">
              {editingProduct ? "Edit Product Details" : "Add New Clean Energy Hardware"}
            </h3>

            <form onSubmit={handleFormSubmit} className="mt-5 space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. VLOXIA Smart Home Wallbox 11 kW"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Short Tagline
                </label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="Compact fast charger with app scheduling..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      let label = "EV Charging";
                      if (val === "battery-storage") label = "Lithium Storage";
                      if (val === "power-solar") label = "Power & Solar";
                      setForm({ ...form, category: val, categoryLabel: label });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50/50"
                  >
                    <option value="ev-charging">EV Charging</option>
                    <option value="battery-storage">Lithium Storage</option>
                    <option value="power-solar">Power & Solar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="e.g. Best Seller / New"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="38500"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    MRP / Original (₹)
                  </label>
                  <input
                    type="number"
                    value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                    placeholder="45000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Stock Qty
                  </label>
                  <input
                    type="number"
                    value={form.stockQuantity}
                    onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50/50"
                  />
                </div>
              </div>

              {/* ── 5 PRODUCT IMAGES SECTION (MATCHES USER REQUEST) ── */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Images className="w-4 h-4 text-blue-600" />
                    <div>
                      <label className="block text-xs font-black text-gray-900 uppercase tracking-wider">
                        Product Images (Up to 5 Photos) *
                      </label>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Slot 1 is the main catalog cover photo. Slots 2–5 are additional gallery angles.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-full shrink-0">
                    {images.filter((img) => img && img.trim() !== "").length}/5 Images
                  </span>
                </div>

                {/* 5 Thumbnail Visual Preview Grid */}
                <div className="grid grid-cols-5 gap-2.5">
                  {images.map((imgUrl, idx) => {
                    const isFilled = imgUrl && imgUrl.trim() !== "";
                    return (
                      <div
                        key={idx}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all flex flex-col items-center justify-center group ${
                          idx === 0
                            ? "border-blue-500 bg-blue-50/40 shadow-xs"
                            : isFilled
                            ? "border-gray-200 bg-white shadow-xs"
                            : "border-dashed border-gray-300 bg-white/70"
                        }`}
                      >
                        {isFilled ? (
                          <>
                            <Image
                              src={imgUrl}
                              alt={`Slot ${idx + 1}`}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                            {/* Overlay remove button */}
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...images];
                                next[idx] = "";
                                setImages(next);
                              }}
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/75 hover:bg-rose-600 text-white flex items-center justify-center text-[10px] transition-colors shadow-xs"
                              title="Clear photo"
                            >
                              ✕
                            </button>
                          </>
                        ) : (
                          <div className="text-center p-1 pointer-events-none">
                            <span className="text-lg text-gray-300 font-light block leading-none">+</span>
                            <div className="text-[9px] font-bold text-gray-400 mt-1">Slot {idx + 1}</div>
                          </div>
                        )}

                        {/* Badge for slot */}
                        <div className="absolute bottom-1 left-1 pointer-events-none">
                          <span
                            className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-xs ${
                              idx === 0
                                ? "bg-blue-600 text-white"
                                : "bg-black/65 text-white"
                            }`}
                          >
                            {idx === 0 ? "Cover" : `#${idx + 1}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 5 Individual URL Inputs */}
                <div className="space-y-2 pt-2 border-t border-slate-200/80">
                  {images.map((imgUrl, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-18 shrink-0">
                        <span
                          className={`inline-block text-[10px] font-extrabold uppercase px-2 py-1.5 rounded-lg w-full text-center ${
                            idx === 0
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-gray-200/80 text-gray-700 font-bold"
                          }`}
                        >
                          {idx === 0 ? "Cover *" : `Slot ${idx + 1}`}
                        </span>
                      </div>

                      <div className="relative flex-1">
                        <input
                          type="url"
                          required={idx === 0}
                          value={imgUrl}
                          onChange={(e) => {
                            const next = [...images];
                            next[idx] = e.target.value;
                            setImages(next);
                          }}
                          placeholder={
                            idx === 0
                              ? "https://... (Main cover image URL - Required)"
                              : `https://... (Additional gallery photo ${idx + 1} - Optional)`
                          }
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-blue-500 bg-white"
                        />
                      </div>

                      {imgUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...images];
                            next[idx] = "";
                            setImages(next);
                          }}
                          className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-xs font-bold"
                          title="Clear this photo"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Warranty Term
                </label>
                <input
                  type="text"
                  value={form.warranty}
                  onChange={(e) => setForm({ ...form, warranty: e.target.value })}
                  placeholder="e.g. 5 Years Replacement Warranty"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50/50"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.inStock}
                    onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>Mark as In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>Publish on Storefront</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
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
                  {editingProduct ? "Update Product" : "Save & Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
