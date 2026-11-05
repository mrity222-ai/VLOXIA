"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, Trash2, Loader2, RefreshCw } from "lucide-react";

interface ImageUploadDropzoneProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: "products" | "banners" | "categories" | "partners" | "general";
  label?: string;
  helperText?: string;
  aspectRatio?: "banner" | "card" | "square" | "logo" | "auto";
  className?: string;
}

export default function ImageUploadDropzone({
  value = "",
  onChange,
  folder = "general",
  label,
  helperText,
  aspectRatio = "auto",
  className = "",
}: ImageUploadDropzoneProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image");
      }

      onChange(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const hasImage = Boolean(value && value.trim() !== "");

  // Determine height/aspect ratio classes based on prop
  const aspectClass =
    aspectRatio === "banner"
      ? "h-40 sm:h-48 w-full"
      : aspectRatio === "card"
      ? "aspect-4/5 w-44"
      : aspectRatio === "logo"
      ? "h-24 w-full"
      : aspectRatio === "square"
      ? "aspect-square w-32"
      : "h-36 w-full";

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}

      {hasImage ? (
        /* Image Preview Box with Replace & Remove actions */
        <div
          className={`relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center group ${aspectClass}`}
        >
          {aspectRatio === "logo" ? (
            /* Transparent checkerboard for logos */
            <div className="relative w-40 h-16 flex items-center justify-center p-2">
              <Image
                src={value}
                alt="Uploaded Logo"
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
          ) : (
            <Image
              src={value}
              alt="Uploaded Preview"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          )}

          {/* Hover Actions Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-900 font-semibold text-xs shadow-md hover:bg-slate-100 flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Image</span>
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={uploading}
              className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-semibold text-xs shadow-md hover:bg-red-700 flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>

          {/* Active Local File Path Indicator */}
          <div className="absolute bottom-2 left-2 bg-slate-950/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md truncate max-w-[85%] pointer-events-none">
            {value}
          </div>
        </div>
      ) : (
        /* Dropzone Box for Browsing / Drag-and-Drop */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center p-6 text-center ${
            dragOver
              ? "border-blue-500 bg-blue-50/70"
              : "border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-slate-50"
          } ${aspectClass}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-blue-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs font-semibold">Uploading photo...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-blue-600">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 hover:underline">
                  Click to browse from device
                </span>
                <span className="text-xs text-slate-400"> or drag &amp; drop</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Supports PNG, JPG, WEBP, SVG (Max 10MB)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
          // Reset input value so re-selecting same file triggers onChange
          e.target.value = "";
        }}
      />

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      {helperText && (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      )}
    </div>
  );
}
