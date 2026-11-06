"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Mail,
  CreditCard,
  User,
  Lock,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Send,
  Save,
  RefreshCw,
  Server,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "smtp" | "razorpay">("profile");

  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // SMTP Settings State
  const [smtpSettings, setSmtpSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: "",
    smtpPass: "",
    smtpFrom: "",
    hasSmtpPass: false,
  });

  // Razorpay Settings State
  const [razorpaySettings, setRazorpaySettings] = useState({
    razorpayKeyId: "",
    razorpayKeySecret: "",
    razorpayWebhookSecret: "",
    hasRazorpayKeySecret: false,
  });

  // UI / Action states
  const [showSmtpPass, setShowSmtpPass] = useState(false);
  const [showRazorpaySecret, setShowRazorpaySecret] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);
  const [isTestingRazorpay, setIsTestingRazorpay] = useState(false);
  const [isSendingResetLink, setIsSendingResetLink] = useState(false);

  const [testEmailTarget, setTestEmailTarget] = useState("");

  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });

  const showToast = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback({ type: "", message: "" });
    }, 6000);
  };

  // Load initial settings and admin profile
  useEffect(() => {
    Promise.all([
      fetch("/api/admin/auth/me").then((res) => res.json()),
      fetch("/api/admin/settings").then((res) => res.json()),
    ])
      .then(([meData, settingsData]) => {
        if (meData?.admin) {
          setAdminProfile((prev) => ({
            ...prev,
            name: meData.admin.name || "",
            email: meData.admin.email || "",
          }));
          setTestEmailTarget(meData.admin.email || "");
        }

        if (settingsData?.settings) {
          const s = settingsData.settings;
          setSmtpSettings({
            smtpHost: s.smtpHost || "smtp.gmail.com",
            smtpPort: s.smtpPort || 587,
            smtpUser: s.smtpUser || "",
            smtpPass: s.hasSmtpPass ? "••••••••" : "",
            smtpFrom: s.smtpFrom || "",
            hasSmtpPass: s.hasSmtpPass,
          });

          setRazorpaySettings({
            razorpayKeyId: s.razorpayKeyId || "",
            razorpayKeySecret: s.hasRazorpayKeySecret ? "••••••••" : "",
            razorpayWebhookSecret: s.razorpayWebhookSecret || "",
            hasRazorpayKeySecret: s.hasRazorpayKeySecret,
          });
        }
      })
      .catch((err) => {
        showToast("error", "Failed to load current settings.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // 1. Save Profile / Credentials
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminProfile.newPassword && adminProfile.newPassword !== adminProfile.confirmPassword) {
      showToast("error", "New password and Confirm password do not match.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: adminProfile.name,
          email: adminProfile.email,
          currentPassword: adminProfile.currentPassword || undefined,
          newPassword: adminProfile.newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      setAdminProfile((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      showToast("success", data.message || "Profile updated successfully!");
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // 2. Send Reset Password Link to Admin Email
  const handleSendResetLink = async () => {
    if (!adminProfile.email) {
      showToast("error", "Admin email address is missing.");
      return;
    }

    setIsSendingResetLink(true);
    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminProfile.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send reset link");

      showToast(
        "success",
        data.simulated
          ? `Reset link generated (Simulation Mode): ${data.simulatedLink}`
          : `Password reset link sent to ${adminProfile.email}! Check inbox/spam.`
      );
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setIsSendingResetLink(false);
    }
  };

  // 3. Save SMTP Settings
  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          smtpHost: smtpSettings.smtpHost,
          smtpPort: smtpSettings.smtpPort,
          smtpUser: smtpSettings.smtpUser,
          smtpPass: smtpSettings.smtpPass,
          smtpFrom: smtpSettings.smtpFrom,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save SMTP settings");

      setSmtpSettings((prev) => ({
        ...prev,
        hasSmtpPass: Boolean(data.settings.hasSmtpPass),
        smtpPass: data.settings.hasSmtpPass ? "••••••••" : "",
      }));

      showToast("success", "SMTP configuration saved and applied dynamically!");
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // 4. Test SMTP Connection
  const handleTestSmtp = async () => {
    if (!testEmailTarget) {
      showToast("error", "Please specify a recipient email to send the test message.");
      return;
    }

    setIsTestingSmtp(true);
    try {
      const res = await fetch("/api/admin/settings/test-smtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          smtpHost: smtpSettings.smtpHost,
          smtpPort: smtpSettings.smtpPort,
          smtpUser: smtpSettings.smtpUser,
          smtpPass: smtpSettings.smtpPass,
          smtpFrom: smtpSettings.smtpFrom,
          testEmail: testEmailTarget,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "SMTP Test failed");

      showToast("success", data.message || "Test email sent successfully!");
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setIsTestingSmtp(false);
    }
  };

  // 5. Save Razorpay Keys
  const handleSaveRazorpay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpayKeyId: razorpaySettings.razorpayKeyId,
          razorpayKeySecret: razorpaySettings.razorpayKeySecret,
          razorpayWebhookSecret: razorpaySettings.razorpayWebhookSecret,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save Razorpay keys");

      setRazorpaySettings((prev) => ({
        ...prev,
        hasRazorpayKeySecret: Boolean(data.settings.hasRazorpayKeySecret),
        razorpayKeySecret: data.settings.hasRazorpayKeySecret ? "••••••••" : "",
      }));

      showToast("success", "Razorpay credentials saved and applied dynamically!");
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // 6. Test Razorpay Credentials
  const handleTestRazorpay = async () => {
    setIsTestingRazorpay(true);
    try {
      const res = await fetch("/api/admin/settings/test-razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpayKeyId: razorpaySettings.razorpayKeyId,
          razorpayKeySecret: razorpaySettings.razorpayKeySecret,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Razorpay verification failed");

      showToast("success", data.message || "Razorpay API credentials verified successfully!");
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setIsTestingRazorpay(false);
    }
  };

  const isRazorpayLive = razorpaySettings.razorpayKeyId.startsWith("rzp_live");

  return (
    <div className="space-y-8 max-w-5xl">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-950 flex items-center gap-3">
            <Settings className="w-7 h-7 text-blue-600" />
            <span>Platform Settings & API Keys</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Configure SMTP Mail Server, Razorpay Payment Gateway, and Administrative Login Credentials
          </p>
        </div>

        {/* Global Live Status Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dynamic DB Config Active</span>
          </div>
        </div>
      </div>

      {/* ── TOAST ALERT ── */}
      {feedback.message && (
        <div
          className={`p-4 rounded-2xl flex items-start gap-3 text-xs sm:text-sm transition-all shadow-sm ${
            feedback.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 font-medium">{feedback.message}</div>
        </div>
      )}

      {/* ── TABS NAVIGATION ── */}
      <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto pb-px">
        {[
          { id: "profile", label: "Admin Profile & Password", icon: User },
          { id: "smtp", label: "SMTP Mail Server", icon: Mail },
          { id: "razorpay", label: "Razorpay Gateway", icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-t-2xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap border-b-2 ${
                isActive
                  ? "border-blue-600 text-blue-600 bg-blue-50/50"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── TAB 1: ADMIN PROFILE & PASSWORD ── */}
      {activeTab === "profile" && (
        <div className="space-y-8">
          <form
            onSubmit={handleSaveProfile}
            className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Admin User ID & Name</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Update your login email address and primary display identity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={adminProfile.name}
                  onChange={(e) =>
                    setAdminProfile({ ...adminProfile, name: e.target.value })
                  }
                  placeholder="e.g. VLOXIA Super Admin"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  User ID / Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={adminProfile.email}
                  onChange={(e) =>
                    setAdminProfile({ ...adminProfile, email: e.target.value })
                  }
                  placeholder="admin@vloxia.in"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  This email is used to log in to the admin panel and receive security OTPs.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Change Password</span>
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Leave blank if you do not wish to change your existing password.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? "text" : "password"}
                      value={adminProfile.currentPassword}
                      onChange={(e) =>
                        setAdminProfile({
                          ...adminProfile,
                          currentPassword: e.target.value,
                        })
                      }
                      placeholder="••••••••••••"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={adminProfile.newPassword}
                      onChange={(e) =>
                        setAdminProfile({
                          ...adminProfile,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Min 6 characters"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={adminProfile.confirmPassword}
                    onChange={(e) =>
                      setAdminProfile({
                        ...adminProfile,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Repeat new password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving Updates..." : "Save Profile & Password"}</span>
              </button>
            </div>
          </form>

          {/* Quick Action: Send Password Reset Link to Email */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-400/30">
                  Self-Service Password Recovery
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-blue-400" />
                  <span>Send Password Reset Link to Admin Email</span>
                </h3>
                <p className="text-xs text-slate-400 max-w-xl">
                  Dispatches a secure 1-hour password reset link via your configured SMTP mail server to{" "}
                  <strong className="text-white">{adminProfile.email || "admin@vloxia.in"}</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSendResetLink}
                disabled={isSendingResetLink}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-all active:scale-95 disabled:opacity-50 shadow-md shadow-blue-600/30"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSendingResetLink ? "Dispatching Link..." : "Send Reset Link to Email"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: SMTP MAIL SERVER CONFIGURATION ── */}
      {activeTab === "smtp" && (
        <div className="space-y-8">
          <form
            onSubmit={handleSaveSmtp}
            className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>SMTP Outgoing Mail Server Configuration</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Required for dispatching 2FA Login OTPs, Password Reset Links, and Customer Purchase Receipts.
                </p>
              </div>

              <div className="text-xs">
                {smtpSettings.hasSmtpPass ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Credentials Configured</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Password Required</span>
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  SMTP Host
                </label>
                <input
                  type="text"
                  required
                  value={smtpSettings.smtpHost}
                  onChange={(e) =>
                    setSmtpSettings({ ...smtpSettings, smtpHost: e.target.value })
                  }
                  placeholder="smtp.gmail.com or mail.vloxia.in"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  SMTP Port
                </label>
                <select
                  value={smtpSettings.smtpPort}
                  onChange={(e) =>
                    setSmtpSettings({
                      ...smtpSettings,
                      smtpPort: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value={587}>587 (TLS - Standard / Gmail / cPanel)</option>
                  <option value={465}>465 (SSL - Secure)</option>
                  <option value={25}>25 (Standard unencrypted)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  SMTP Username / Email ID
                </label>
                <input
                  type="text"
                  required
                  value={smtpSettings.smtpUser}
                  onChange={(e) =>
                    setSmtpSettings({ ...smtpSettings, smtpUser: e.target.value })
                  }
                  placeholder="e.g. admin@vloxia.in or yourgmail@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  SMTP Password / App Password
                </label>
                <div className="relative">
                  <input
                    type={showSmtpPass ? "text" : "password"}
                    required={!smtpSettings.hasSmtpPass}
                    value={smtpSettings.smtpPass}
                    onChange={(e) =>
                      setSmtpSettings({ ...smtpSettings, smtpPass: e.target.value })
                    }
                    placeholder="Enter email account password or 16-character App Password"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSmtpPass(!showSmtpPass)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showSmtpPass ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Sender From Header (Display Name)
              </label>
              <input
                type="text"
                value={smtpSettings.smtpFrom}
                onChange={(e) =>
                  setSmtpSettings({ ...smtpSettings, smtpFrom: e.target.value })
                }
                placeholder='"VLOXIA Security" <admin@vloxia.in>'
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Format: &quot;Company Name&quot; &lt;email@domain.com&gt;
              </p>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving Settings..." : "Save SMTP Settings"}</span>
              </button>
            </div>
          </form>

          {/* Test SMTP Connection Box */}
          <div className="bg-[#F8FAFD] rounded-3xl border border-blue-100 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Test Outgoing SMTP Email Connection
                </h3>
                <p className="text-xs text-gray-500">
                  Send a live verification test email to verify host, port, username, and password credentials.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <input
                type="email"
                value={testEmailTarget}
                onChange={(e) => setTestEmailTarget(e.target.value)}
                placeholder="Enter email to receive test message"
                className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm bg-white text-slate-900 focus:outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={handleTestSmtp}
                disabled={isTestingSmtp}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  {isTestingSmtp ? "Sending Test Mail..." : "Send Test Email"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: RAZORPAY PAYMENT GATEWAY ── */}
      {activeTab === "razorpay" && (
        <div className="space-y-8">
          <form
            onSubmit={handleSaveRazorpay}
            className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span>Razorpay Payment Gateway API Keys</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Connect your live or test Razorpay account to collect credit card, UPI, and NetBanking payments.
                </p>
              </div>

              {/* Mode Badge */}
              <div className="flex items-center gap-2">
                {razorpaySettings.razorpayKeyId ? (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isRazorpayLive
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-blue-100 text-blue-800 border border-blue-300"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isRazorpayLive ? "bg-emerald-500" : "bg-blue-500"
                      }`}
                    />
                    <span>{isRazorpayLive ? "LIVE Production" : "TEST Sandbox"}</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                    Not Configured
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Razorpay Key ID
                </label>
                <input
                  type="text"
                  required
                  value={razorpaySettings.razorpayKeyId}
                  onChange={(e) =>
                    setRazorpaySettings({
                      ...razorpaySettings,
                      razorpayKeyId: e.target.value,
                    })
                  }
                  placeholder="rzp_live_... or rzp_test_..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-blue-500"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Starts with <code className="text-blue-600 font-bold">rzp_live_</code> for production or <code className="text-blue-600 font-bold">rzp_test_</code> for sandbox testing.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Razorpay Key Secret
                </label>
                <div className="relative">
                  <input
                    type={showRazorpaySecret ? "text" : "password"}
                    required={!razorpaySettings.hasRazorpayKeySecret}
                    value={razorpaySettings.razorpayKeySecret}
                    onChange={(e) =>
                      setRazorpaySettings({
                        ...razorpaySettings,
                        razorpayKeySecret: e.target.value,
                      })
                    }
                    placeholder="Enter your Razorpay Key Secret"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRazorpaySecret(!showRazorpaySecret)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showRazorpaySecret ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Kept securely encrypted and never revealed publicly.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Webhook Secret (Optional)
              </label>
              <input
                type="text"
                value={razorpaySettings.razorpayWebhookSecret}
                onChange={(e) =>
                  setRazorpaySettings({
                    ...razorpaySettings,
                    razorpayWebhookSecret: e.target.value,
                  })
                }
                placeholder="Optional: Secret configured under Razorpay Dashboard > Webhooks"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-blue-500"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Webhook endpoint URL to configure in Razorpay: <code className="text-slate-800 font-bold bg-slate-100 px-1.5 py-0.5 rounded">https://vloxia.in/api/razorpay/webhook</code>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleTestRazorpay}
                disabled={isTestingRazorpay || !razorpaySettings.razorpayKeyId}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>
                  {isTestingRazorpay ? "Testing Connection..." : "Test Razorpay Credentials"}
                </span>
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>
                  {isSaving ? "Saving Credentials..." : "Save Razorpay Keys"}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
