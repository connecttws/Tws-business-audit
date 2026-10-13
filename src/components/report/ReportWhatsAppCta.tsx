"use client";

import React from "react";
import { MessageSquare, Check } from "lucide-react";
import { AuditRecord } from "@/lib/audit-data";

interface ReportWhatsAppCtaProps {
  record: AuditRecord;
}

export function ReportWhatsAppCta({ record }: ReportWhatsAppCtaProps) {
  const handleConnectWhatsApp = () => {
    const text =
      `Hi Team TWS! I reviewed our digital audit report for *${record.business.name}* (Score: ${record.totalScore}/100, Ref: ${record.id}).\n\n` +
      `We would like to discuss implementing the recommended *${record.band.sprintRecommendation}* to fix our digital gaps. Please let us know your availability for a quick walkthrough.`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-md space-y-6 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 text-xs font-mono font-bold uppercase tracking-wider border border-zinc-200">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span>Ready for Rapid Turnaround</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight font-sans">
            Want Team TWS to implement these fixes for {record.business.name}?
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl leading-relaxed">
            Our team executes the complete local growth sprint: Google Maps 3-Pack rank acceleration, signature on-site ambient content shoots, and speed-to-lead automated funnels.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-zinc-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-black stroke-[3]" /> Done-For-You Execution
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-black stroke-[3]" /> 14-Day Sprint Timeline
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-black stroke-[3]" /> Measurable Local Inquiries
            </span>
          </div>
        </div>

        {/* Big WhatsApp CTA Button */}
        <div className="shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleConnectWhatsApp}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-black hover:bg-zinc-800 active:bg-zinc-900 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discuss Audit on WhatsApp ↗</span>
          </button>
          <p className="text-[11px] text-zinc-400 font-mono text-center mt-2">
            Direct chat with Team TWS Strategists
          </p>
        </div>
      </div>
    </div>
  );
}
