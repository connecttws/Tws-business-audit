"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, ArrowRight, Zap, Camera, Smartphone } from "lucide-react";
import { AuditRecord } from "@/lib/audit-data";

interface ReportActionPlanProps {
  record: AuditRecord;
}

export function ReportActionPlan({ record }: ReportActionPlanProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-9 rounded-3xl border border-slate-800 shadow-xl space-y-7 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none bg-emerald-500/10" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800/80 pb-6 relative z-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Prescribed Turnaround Blueprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
            {record.band.sprintRecommendation}
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            {record.band.sprintDetails}
          </p>
        </div>

        <div className="shrink-0 bg-slate-800/90 border border-slate-700/80 px-4 py-2.5 rounded-2xl font-mono text-xs font-bold text-emerald-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Sprint Target: Score 85+ / 100</span>
        </div>
      </div>

      {/* 3 Step Blueprint Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
        {/* Step 1 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/70 hover:border-slate-600 transition-all space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono text-xs font-black flex items-center justify-center">
              01
            </div>
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              Days 1–3
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-base text-white tracking-tight">
              Plug Discovery Leaks
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              Claim and optimize Google Business Profile, fix incorrect phone/hours, and set up 1-tap prefilled WhatsApp lead capture on mobile.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-700/60 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Google Maps 3-Pack SEO</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Direct WhatsApp Mobile Link</span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/70 hover:border-slate-600 transition-all space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 font-mono text-xs font-black flex items-center justify-center">
              02
            </div>
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              Days 4–7
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-base text-white tracking-tight">
              Elevate Visual Appetite
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              Execute a signature on-site photoshoot and high-contrast short-form reels sprint to showcase premium ambiance and build instant trust.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-700/60 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>On-Site 4K Photo Session</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Viral Local Instagram Reels</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/70 hover:border-slate-600 transition-all space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-black flex items-center justify-center">
              03
            </div>
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              Days 8–14
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-base text-white tracking-tight">
              Speed-to-Lead Automation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              Deploy automated under-5-minute inquiry responders and launch hyperlocal 3–5 km radius campaigns to drive predictable bookings.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-700/60 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Instant Auto-Responder Flow</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Hyperlocal Meta Ad Radius</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
