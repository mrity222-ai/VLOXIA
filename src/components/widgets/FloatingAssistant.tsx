"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  Send,
  Check,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

interface PublicWidgetsConfig {
  enableWhatsApp: boolean;
  enableAiBot: boolean;
  whatsappNumber: string;
  whatsappGreeting: string;
  aiBotWelcomeMsg: string;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  action?: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
}

// Comprehensive embedded website knowledge base for client-side instant AI matching
const KNOWLEDGE_BASE = [
  {
    keywords: ["ev", "charger", "charging", "wallbox", "tata", "fast charger", "dc charger", "ac charger"],
    response:
      "VLOXIA provides turnkey commercial & residential EV charging infrastructure:\n• Smart Home Wallbox 7.4 kW (₹38,500)\n• Commercial AC Dual Guns 22 kW\n• Ultra-Fast DC Chargers (30 kW – 120 kW+)\n• OCPP 2.0.1 compliant cloud billing CMS & Dynamic Load Balancing (DLB).",
    action: {
      label: "Explore EV Charging Solutions →",
      href: "/solutions/ev-charging",
    },
  },
  {
    keywords: ["solar", "rooftop", "epc", "panels", "inverter", "net metering", "discom", "captive"],
    response:
      "Our Solar Energy EPC division engineers industrial rooftop and ground-mount captive solar parks:\n• Tier-1 high-efficiency bifacial mono-PERC PV modules\n• 25-30 year linear power performance warranty\n• End-to-end CEIG approvals & DISCOM net-metering synchronization.",
    action: {
      label: "Explore Solar EPC Solutions →",
      href: "/solutions/solar-energy",
    },
  },
  {
    keywords: ["battery", "storage", "bess", "lifepo4", "lithium", "power backup", "ups"],
    response:
      "VLOXIA manufactures utility-grade modular LiFePO4 battery energy storage systems (BESS):\n• Compact Pack: 2.56 kWh (₹58,000)\n• Wall-Mount Pack: 5.12 kWh (₹1,15,000)\n• Industrial Modular Rack: 10.24 kWh – 1 MWh+\n• 10-year / 6,000 cycles warranty with sub-10ms UPS switchover.",
    action: {
      label: "Explore Energy Storage →",
      href: "/solutions/energy-storage",
    },
  },
  {
    keywords: ["price", "cost", "rates", "how much", "buy", "purchase", "order", "catalog", "store"],
    response:
      "Live pricing in our Hardware Marketplace:\n• Smart Home EV Wallbox 7.4 kW: ₹38,500\n• LiFePO4 Battery Pack 2.56 kWh: ₹58,000\n• Wall-Mount Battery 5.12 kWh: ₹1,15,000\nAll units ship with OEM warranty & online checkout via Razorpay.",
    action: {
      label: "View Hardware Marketplace →",
      href: "/shop",
    },
  },
  {
    keywords: ["partner", "dealer", "distributor", "contractor", "installer", "alliance"],
    response:
      "We invite regional electrical contractors, solar installers, and dealers to join the VLOXIA Channel Network. Benefits include:\n• Guaranteed OEM warehouse inventory\n• Tier-1 wholesale volume pricing\n• Single-line CAD engineering support\n• Qualified local turnkey leads in your city.",
    action: {
      label: "Apply as Channel Partner →",
      href: "/partners#partner-application",
    },
  },
  {
    keywords: ["contact", "phone", "number", "email", "office", "address", "location", "delhi", "call"],
    response:
      "You can connect directly with our central engineering desk:\n• Phone: +91 81788 104 56 (Mon–Sat 9AM–7PM)\n• Email: vloxiasystems@gmail.com\n• Corporate Office: A3/55, Sector 15, Rohini, Delhi 110089\n• Metro Access: Red Line (Rohini West) & Yellow Line (Samaypur Badli).",
    action: {
      label: "Open Contact Us Page →",
      href: "/contact#enquiry-form",
    },
  },
  {
    keywords: ["warranty", "guarantee", "sla", "support", "maintenance", "service"],
    response:
      "VLOXIA installations carry standard enterprise SLA warranties:\n• Solar PV Modules: 25–30 Years Linear Output Warranty\n• LiFePO4 Batteries: 10 Years / 6,000 Cycle Performance Warranty\n• EV Fast Chargers: 3–5 Years Comprehensive Commercial Warranty\n• Turnkey single-point OEM replacement guarantee.",
    action: {
      label: "Inquire About SLAs →",
      href: "/contact#enquiry-form",
    },
  },
];

export default function FloatingAssistant() {
  const [config, setConfig] = useState<PublicWidgetsConfig>({
    enableWhatsApp: true,
    enableAiBot: true,
    whatsappNumber: "+918178810456",
    whatsappGreeting: "Hi VLOXIA Team, I would like to inquire about clean energy solutions.",
    aiBotWelcomeMsg: "Hello! I am VLOXIA's AI Energy Assistant. How can I assist you with Solar, EV Charging, or Batteries today?",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Interactive Lead Capture state (matching user's reference image)
  const [leadEmail, setLeadEmail] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load public widget settings from database
  useEffect(() => {
    fetch("/api/settings/public", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.widgets) {
          setConfig({
            enableWhatsApp: data.widgets.enableWhatsApp ?? true,
            enableAiBot: data.widgets.enableAiBot ?? true,
            whatsappNumber: data.widgets.whatsappNumber || "+918178810456",
            whatsappGreeting:
              data.widgets.whatsappGreeting ||
              "Hi VLOXIA Team, I would like to inquire about clean energy solutions.",
            aiBotWelcomeMsg:
              data.widgets.aiBotWelcomeMsg ||
              "Hello! I am VLOXIA's AI Energy Assistant. How can I assist you with Solar, EV Charging, or Batteries today?",
          });
        }
      })
      .catch(() => {});
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen, leadSubmitted]);

  // Clean phone number for WhatsApp
  const cleanPhone = (config.whatsappNumber || "918178810456").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    config.whatsappGreeting
  )}`;

  // Handle lead submission (Enter your E-mail + Name + Checkmark)
  const handleLeadSubmit = async () => {
    if (!leadEmail.trim() || !leadName.trim() || leadSubmitting || leadSubmitted) return;

    setLeadSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName.trim(),
          email: leadEmail.trim(),
          phone: "",
          subject: "AI Assistant Live Chat Contact Request",
          message: "Visitor submitted contact info via AI Assistant popup.",
          category: "GENERAL",
        }),
      });

      setLeadSubmitted(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: "lead-ack-" + Date.now(),
            sender: "bot",
            text: `Thank you, ${leadName}! One of our engineering agents will contact you at ${leadEmail} within the next couple of minutes.`,
          },
        ]);
      }, 400);
    } catch (err) {
      console.error("Lead submission error:", err);
      setLeadSubmitted(true);
    } finally {
      setLeadSubmitting(false);
    }
  };

  // Intelligent client-side response matching
  const handleUserQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text: queryText.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const lower = queryText.toLowerCase();

    // Natural typing delay simulation (450ms)
    setTimeout(() => {
      let matched = KNOWLEDGE_BASE.find((k) =>
        k.keywords.some((kw) => lower.includes(kw))
      );

      let botMsg: ChatMessage;

      if (matched) {
        botMsg = {
          id: "b-" + Date.now(),
          sender: "bot",
          text: matched.response,
          action: matched.action,
        };
      } else {
        botMsg = {
          id: "b-" + Date.now(),
          sender: "bot",
          text:
            "I'd love to help you with that! For specific capacity calculations or custom site engineering, our technical desk can prepare a single-line feasibility report directly.",
          action: {
            label: "Chat with Engineering on WhatsApp →",
            href: whatsappUrl,
            isExternal: true,
          },
        };
      }

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  // If both widgets are disabled by admin, render nothing
  if (!config.enableWhatsApp && !config.enableAiBot) {
    return null;
  }

  return (
    <>
      {/* ── 1. FLOATING ACTION DOCK (BOTTOM-RIGHT WITH 3D HIGHLIGHTED BUTTONS) ── */}
      <div className="fixed bottom-6 right-5 sm:right-7 z-50 flex flex-col items-end gap-3.5 select-none">
        
        {/* Floating WhatsApp Button with 3D Highlight Depth */}
        {config.enableWhatsApp && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat with VLOXIA on WhatsApp"
            className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#2be673] via-[#25D366] to-[#128c46] border-t-2 border-white/60 border-x border-emerald-400/40 border-b-2 border-[#095228] shadow-[0_6px_16px_rgba(0,0,0,0.35),0_2px_4px_rgba(37,211,102,0.4),inset_0_1px_1px_rgba(255,255,255,0.7)] text-white hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
          >
            {/* Tooltip Pill */}
            <span className="pointer-events-none absolute right-16 bg-slate-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md hidden sm:inline-block">
              Chat on WhatsApp
            </span>

            {/* WhatsApp SVG Icon with drop shadow */}
            <svg className="w-6 h-6 fill-current drop-shadow-sm" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.053-.949.006-.499-.074-1.221-.365-2.051-1.077-.991-.851-1.637-2.008-1.745-2.155-.108-.147-.569-.757-.569-1.442 0-.686.357-1.025.484-1.165.127-.14.278-.175.371-.175.093 0 .185.001.266.005.085.004.198-.032.309.234.115.275.394.96.429 1.03.035.07.058.152.012.245-.046.094-.069.153-.139.234-.07.082-.147.182-.21.245-.07.07-.143.147-.061.288.081.14.36 1.027 1.353 1.905.772.684 1.423.896 1.624.996.202.1.32.083.438-.052.119-.136.509-.592.645-.795.136-.203.272-.169.458-.101.186.068 1.18.557 1.383.659.203.101.339.152.389.237.051.085.051.492-.093.897z" />
            </svg>

            {/* Pulsing indicator */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
            </span>
          </a>
        )}

        {/* Floating AI Bot Assistant Button with 3D Highlight Depth */}
        {config.enableAiBot && (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            title="VLOXIA AI Assistant"
            className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#3385ff] via-[#0066FF] to-[#0047cc] border-t-2 border-white/60 border-x border-blue-400/40 border-b-2 border-[#002f8a] shadow-[0_6px_16px_rgba(0,0,0,0.35),0_2px_4px_rgba(0,102,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.7)] text-white hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white transition-transform duration-200" />
            ) : (
              <>
                {/* VLOXIA "V" Brand Monogram Logo */}
                <svg
                  className="w-6 h-6 sm:w-6.5 sm:h-6.5 transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path d="M4 5L14 24L24 5H18.5L14 15.5L9.5 5H4Z" fill="white" />
                  <path d="M12.5 13L14 16.5L15.5 13H12.5Z" fill="#38BDF8" />
                </svg>

                {/* Pulsing active indicator */}
                <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
                </span>

                {/* Tooltip Pill */}
                <span className="pointer-events-none absolute right-16 bg-slate-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md hidden sm:inline-block">
                  Ask VLOXIA AI
                </span>
              </>
            )}
          </button>
        )}
      </div>

      {/* ── 2. INTERACTIVE AI ASSISTANT CHAT MODAL (1:1 PIXEL-MATCHED TO REFERENCE) ── */}
      {config.enableAiBot && isOpen && (
        <div className="fixed bottom-24 right-5 sm:right-7 z-50 w-[92vw] sm:w-[390px] h-[550px] max-h-[82vh] rounded-3xl bg-white shadow-2xl shadow-slate-900/15 border border-slate-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="px-5 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                <svg className="w-4 h-4" viewBox="0 0 28 28" fill="none">
                  <path d="M4 5L14 24L24 5H18.5L14 15.5L9.5 5H4Z" fill="white" />
                  <path d="M12.5 13L14 16.5L15.5 13H12.5Z" fill="#38BDF8" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>VLOXIA Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[10px] text-slate-400 font-medium">Online · Engineering Desk</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-white text-xs sm:text-[13px]">
            
            {/* Top-Right Bubble: "Contact an Agent" (Matches Reference Screenshot) */}
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-tr-xs border border-gray-200 bg-white text-slate-700 font-medium px-4 py-2 shadow-2xs">
                Contact an Agent
              </div>
            </div>

            {/* Bot Message Bubble (Matches Reference Screenshot) */}
            <div className="flex flex-col items-start max-w-[92%]">
              <div className="rounded-3xl rounded-tl-xs bg-[#f2f4f7] text-slate-800 p-4 leading-relaxed shadow-2xs space-y-2.5">
                <p>
                  I&apos;m sorry I couldn&apos;t help you today. One of our agents will contact you within the next couple of minutes.
                </p>
                <p>
                  Please send us your email and name.
                </p>
                <p>
                  In the meantime, tell us how we can help you.
                </p>
              </div>
            </div>

            {/* Interactive Lead Capture Card 1: Enter your E-mail here */}
            <div className="bg-[#f2f4f7] rounded-2xl p-3.5 max-w-[85%] ml-auto flex flex-col items-end gap-1.5 shadow-2xs">
              <label className="text-[11px] sm:text-xs font-semibold text-slate-700">
                Enter your E-mail here:
              </label>
              <div className="w-full">
                <input
                  type="email"
                  value={leadEmail}
                  disabled={leadSubmitted}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-full border border-blue-400 bg-white px-4 py-2 text-xs text-blue-600 placeholder:text-blue-300 focus:outline-none focus:border-blue-600 shadow-2xs disabled:bg-blue-50/50"
                />
              </div>
            </div>

            {/* Interactive Lead Capture Card 2: Enter your Name here + Checkmark button */}
            <div className="bg-[#f2f4f7] rounded-2xl p-3.5 max-w-[85%] ml-auto flex flex-col items-end gap-1.5 shadow-2xs">
              <label className="text-[11px] sm:text-xs font-semibold text-slate-700">
                Enter your Name here:
              </label>
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={leadName}
                  disabled={leadSubmitted}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Type here..."
                  className="flex-1 rounded-full border border-blue-200 focus:border-blue-500 bg-white px-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none shadow-2xs disabled:bg-slate-100"
                />
                <button
                  type="button"
                  onClick={handleLeadSubmit}
                  disabled={leadSubmitted || leadSubmitting || !leadEmail.trim() || !leadName.trim()}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    leadSubmitted
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-blue-400 text-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-40"
                  }`}
                  title={leadSubmitted ? "Submitted" : "Submit Contact Info"}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Additional Dynamic Messages (User Q&A Stream) */}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-2.5 leading-relaxed shadow-2xs whitespace-pre-line ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-xs"
                      : "bg-[#f2f4f7] text-slate-800 rounded-tl-xs"
                  }`}
                >
                  {m.text}
                </div>

                {/* Direct Action Link Button if provided */}
                {m.action && (
                  <div className="mt-2 pl-1">
                    {m.action.isExternal ? (
                      <a
                        href={m.action.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                      >
                        <span>{m.action.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        href={m.action.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                      >
                        <span>{m.action.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Simulated Typing Indicator (Three dots ••• matching reference) */}
            {isTyping && (
              <div className="bg-[#f2f4f7] rounded-2xl px-3.5 py-2 inline-flex items-center gap-1.5 w-fit shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Bar (Fully Rounded Pill + Paper Plane Send Icon) */}
          <div className="p-3.5 pt-2 bg-white border-t border-slate-100 flex flex-col gap-2 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUserQuery(input);
              }}
              className="rounded-full border border-gray-300 focus-within:border-blue-500 bg-white px-4 py-2.5 flex items-center justify-between shadow-xs transition-colors"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here"
                className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none pr-2"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="text-blue-600 hover:text-blue-700 disabled:opacity-30 transition-colors p-1 flex items-center justify-center cursor-pointer"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Sub-Footer (Matching Reference: Powered by VLOXIA AI · Disclaimer) */}
            <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 select-none">
              <span>Powered by <strong className="font-semibold text-slate-500">VLOXIA AI</strong></span>
              <span>·</span>
              <span className="hover:underline cursor-pointer">Disclaimer</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
