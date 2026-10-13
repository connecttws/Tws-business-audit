"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { AuditRecord } from "@/lib/audit-data";

interface ReportActionPlanProps {
  record: AuditRecord;
}

export function ReportActionPlan({ record }: ReportActionPlanProps) {
  return (
    <div className="bg-black text-white p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 text-xs font-mono font-bold uppercase tracking-widest border border-zinc-700 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Prescribed Action Roadmap</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
            {record.band.sprintRecommendation}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
            {record.band.sprintDetails}
          </p>
        </div>

        <div className="shrink-0 bg-zinc-900 px-3.5 py-2 rounded-xl border border-zinc-700 font-mono text-xs font-bold text-zinc-300">
          Target Outcome: Score 85+ / 100
        </div>
      </div>

      {/* 3 Step Blueprint */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
          <div className="w-7 h-7 rounded-lg bg-white text-black font-mono text-xs font-black flex items-center justify-center">
            01
          </div>
          <h3 className="font-extrabold text-sm text-white font-sans">
            Stop Traffic Leakage
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
            Claim and optimize Google Business Profile, fix incorrect phone/hours, and set up 1-tap prefilled WhatsApp lead capture.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
          <div className="w-7 h-7 rounded-lg bg-white text-black font-mono text-xs font-black flex items-center justify-center">
            02
          </div>
          <h3 className="font-extrabold text-sm text-white font-sans">
            Elevate Visual Appetite
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
            Execute a signature on-site photoshoot & short-form reels sprint to showcase premium ambiance and build instant trust.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
          <div className="w-7 h-7 rounded-lg bg-white text-black font-mono text-xs font-black flex items-center justify-center">
            03
          </div>
          <h3 className="font-extrabold text-sm text-white font-sans">
            Automate Speed-to-Lead
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
            Implement under-5-minute automated inquiry responders and structured follow-ups so zero prospective customers slip away.
          </p>
        </div>
      </div>
    </div>
  );
}
