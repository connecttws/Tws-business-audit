"use client";

import React from "react";
import { Check, AlertTriangle, AlertCircle } from "lucide-react";
import { SectionScore } from "@/lib/audit-data";

interface ReportBreakdownProps {
  sectionScores: SectionScore[];
}

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  maps: "Determines how easily customers searching on Google Maps and local search discover and choose your business.",
  visuals: "High-contrast photography & video content build instant appetite appeal and premium brand credibility.",
  web: "Mobile speed and direct 1-tap WhatsApp booking channels prevent visitors from bouncing to rivals.",
  ads: "Hyperlocal radius ad campaigns drive predictable, active customer traffic to your door.",
  speed: "Rapid response time (<5 min) and systematic follow-up maximize conversion from every inbound inquiry.",
};

export function ReportBreakdown({ sectionScores }: ReportBreakdownProps) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.01em] text-zinc-950 font-sans">
            5 Digital Pillars Breakdown
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Evaluated on a standardized 20-point scale per pillar (100 points maximum).
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 text-xs font-mono font-bold self-start sm:self-auto border border-zinc-200">
          <span>5 Pillars Evaluated</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionScores.map((sec, idx) => {
          const isHigh = sec.score >= 15;
          const isModerate = sec.score >= 8;

          return (
            <div
              key={sec.id}
              className="p-5 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 hover:bg-zinc-50 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-black text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-zinc-950 tracking-tight font-sans">
                      {sec.name}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Weight: 20 Points
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono font-black text-lg text-zinc-950">
                    {sec.score}{" "}
                    <span className="text-xs font-normal text-zinc-400">
                      / {sec.maxScore}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border ${
                      isHigh
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : isModerate
                        ? "bg-zinc-200 text-zinc-800 border-zinc-300"
                        : "bg-zinc-100 text-zinc-500 border-zinc-200"
                    }`}
                  >
                    {isHigh ? "Strong" : isModerate ? "Opportunity" : "Critical Gap"}
                  </span>
                </div>
              </div>

              {/* Monochrome Progress Bar */}
              <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-black h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(sec.score / sec.maxScore) * 100}%` }}
                />
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed pt-1">
                {PILLAR_DESCRIPTIONS[sec.id] || ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
