"use client";

import React from "react";
import { MessageSquare, CheckCircle2, ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { AuditRecord } from "@/lib/audit-data";

interface ReportWhatsAppCtaProps {
  record: AuditRecord;
}

const TWS_SUPPORT_PHONE = "917275895385";
const TWS_DISPLAY_PHONE = "+91 7275895385";

export function ReportWhatsAppCta({ record }: ReportWhatsAppCtaProps) {
  const handleConnectWhatsApp = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const shortUrl = `${origin}/r/${record.id}`;

    const text =
      `Hi Team TWS! I reviewed our digital audit report for *${record.business.name}* (Score: ${record.totalScore}/100, Ref: ${record.id}).\n\n` +
      `*Our Audit Report:* ${shortUrl}\n\n` +
      `We would like to discuss implementing the recommended growth sprint to fix our digital gaps. Please let us know your availability for a quick walkthrough.`;

    window.open(
      `https://wa.me/${TWS_SUPPORT_PHONE}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950 text-white p-7 sm:p-10 shadow-2xl border border-emerald-500/30 space-y-7">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-emerald-500/20" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 flex-1 text-center lg:text-left">
          {/* Status pill with TWS contact badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>TWS Direct Helpline · {TWS_DISPLAY_PHONE}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
            Ready to turn these audit gaps into daily customer footfall?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            Team TWS deploys the complete done-for-you growth system: Google Maps 3-Pack rank acceleration, high-impact signature on-site shoots, and automated speed-to-lead WhatsApp funnels.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Done-For-You Execution
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 14-Day Rapid Sprint
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tracked Local Inquiries
            </span>
          </div>
        </div>

        {/* Big WhatsApp Conversion Button */}
        <div className="shrink-0 w-full sm:w-auto text-center space-y-2">
          <button
            type="button"
            onClick={handleConnectWhatsApp}
            className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1da851] text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-5 h-5 fill-slate-950 text-slate-950" />
            <span>Chat on WhatsApp ({TWS_DISPLAY_PHONE})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
            <span>Direct link with audit report attached</span>
            <span>·</span>
            <span className="text-emerald-400 font-bold">Fast Reply</span>
          </div>
        </div>
      </div>
    </div>
  );
}
