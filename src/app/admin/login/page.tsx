"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, KeyRound, ShieldAlert, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@vloxia.in");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [requireOtp, setRequireOtp] = useState(true);
  const [step, setStep] = useState<"CREDENTIALS" | "OTP">("CREDENTIALS");
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
        }, 800);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      {/* Ambient background glows */}
      <div  />
      <div  />

      <div >
        {/* Brand Header */}
        <div >
          <div >
            <Image
              src="/vloxia-logo.png"
              alt="VLOXIA Systems LLP"
              width={140}
              height={45}
              
              priority
            />
          </div>
          <h1 >Enterprise Command Portal</h1>
          <p >VLOXIA Energy Systems Management & CMS</p>
        </div>

        {/* Card */}
        <div >
          {errorMsg && (
            <div >
              <ShieldAlert  />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div >
              <CheckCircle2  />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} >
            {step === "CREDENTIALS" ? (
              <>
                <div>
                  <label >
                    Admin Email
                  </label>
                  <div >
                    <Mail  />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@vloxia.in"
                      
                    />
                  </div>
                </div>

                <div>
                  <div >
                    <label >
                      Password
                    </label>
                    <span >Default: Admin@Vloxia2026</span>
                  </div>
                  <div >
                    <Lock  />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••••••"
                      
                    />
                  </div>
                </div>

                <div >
                  <label >
                    <input
                      type="checkbox"
                      checked={requireOtp}
                      onChange={(e) => setRequireOtp(e.target.checked)}
                      
                    />
                    <span>SMTP 2-Factor OTP Verification</span>
                  </label>
                </div>
              </>
            ) : (
              <div>
                <label >
                  Enter 6-Digit Email OTP
                </label>
                <div >
                  <KeyRound  />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="123456"
                    
                  />
                </div>
                <p >
                  Check your inbox for the verification email sent via SMTP.
                </p>
                <button
                  type="button"
                  onClick={() => setStep("CREDENTIALS")}
                  
                >
                  ← Back to password login
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              
            >
              {isLoading ? (
                <span>Authenticating with Portal...</span>
              ) : step === "CREDENTIALS" ? (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight  />
                </>
              ) : (
                <>
                  <span>Verify OTP & Launch Dashboard</span>
                  <ArrowRight  />
                </>
              )}
            </button>
          </form>
        </div>

        <div >
          VLOXIA Systems LLP Security Perimeter • 256-bit Encrypted
        </div>
      </div>
    </div>
  );
}
