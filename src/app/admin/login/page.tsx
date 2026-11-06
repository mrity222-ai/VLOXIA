"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  KeyRound,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  Send,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@vloxia.in");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [requireOtp, setRequireOtp] = useState(false);
  const [step, setStep] = useState<"CREDENTIALS" | "OTP" | "FORGOT_PASSWORD">(
    "CREDENTIALS"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          otp: step === "OTP" ? otp : undefined,
          requireOtp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      if (data.step === "OTP_REQUIRED") {
        setStep("OTP");
        setSuccessMsg("Verification code dispatched via SMTP to your email.");
      } else if (data.success) {
        setSuccessMsg("Authenticated! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 600);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch reset link");
      }

      setSuccessMsg(
        data.simulated
          ? `Reset link generated (Simulation Mode): ${data.simulatedLink}`
          : `Password reset link dispatched via SMTP to ${email}! Please check your inbox and spam folder.`
      );
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while sending reset link.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-block p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
            <Image
              src="/vloxia-logo.png"
              alt="VLOXIA Systems LLP"
              width={140}
              height={45}
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
          <h1 className="text-2xl font-normal tracking-tight text-white">
            Enterprise Command Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            VLOXIA Energy Systems Management & CMS
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#131D33] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {step === "FORGOT_PASSWORD" ? (
            /* ── FORGOT PASSWORD VIEW ── */
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-blue-400" />
                  <span>Reset Admin Password via SMTP</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Enter your admin user ID / email address. We will send a secure 1-hour password reset link to your email.
                </p>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-300">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@vloxia.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 mt-4 active:scale-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isLoading ? "Dispatching Reset Link..." : "Send Password Reset Link"}
                </span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep("CREDENTIALS");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>
              </div>
            </form>
          ) : (
            /* ── NORMAL LOGIN / OTP VIEW ── */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {step === "CREDENTIALS" ? (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Admin Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@vloxia.in"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-slate-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setStep("FORGOT_PASSWORD");
                          setErrorMsg("");
                          setSuccessMsg("");
                        }}
                        className="text-[11px] text-blue-400 hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 select-none">
                      <input
                        type="checkbox"
                        checked={requireOtp}
                        onChange={(e) => setRequireOtp(e.target.checked)}
                        className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span>Enable SMTP 2-Factor OTP Verification</span>
                    </label>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Enter 6-Digit Email OTP
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      placeholder="123456"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-xs sm:text-sm placeholder:text-slate-500 tracking-widest text-center font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Check your inbox for the verification email sent via SMTP.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep("CREDENTIALS")}
                    className="text-xs text-blue-400 hover:underline pt-1 block"
                  >
                    ← Back to password login
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 mt-4 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating with Portal...</span>
                ) : step === "CREDENTIALS" ? (
                  <>
                    <span>Sign In to Admin</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Verify OTP & Launch Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="text-center text-[11px] text-slate-500">
          VLOXIA Systems LLP Security Perimeter • 256-bit Encrypted
        </div>
      </div>
    </div>
  );
}
