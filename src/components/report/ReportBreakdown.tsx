"use client";

import React from "react";
import { MapPin, Camera, Globe, Target, Zap, CheckCircle2, AlertTriangle, AlertOctagon } from "lucide-react";
import { SectionScore } from "@/lib/audit-data";

interface ReportBreakdownProps {
  sectionScores: SectionScore[];
}

interface PillarConfig {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  borderClass: string;
  badgeBg: string;
  description: string;
  impactMetric: string;
}

const PILLAR_CONFIGS: Record<string, PillarConfig> = {
  maps: {
    icon: MapPin,
    color: "#0284C7",
    gradient: "from-sky-500 to-blue-600",
    borderClass: "border-sky-200",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
    description: "Determines how easily high-intent local customers find your business on Google Maps and the top 3-pack search rankings.",
    impactMetric: "+35–50% footfall discovery",
  },
  visuals: {
    icon: Camera,
    color: "#8B5CF6",
    gradient: "from-purple-500 to-indigo-600",
    borderClass: "border-purple-200",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    description: "High-contrast photography, reels, and ambiance storytelling build instant trust and appetite appeal before a customer visits.",
    impactMetric: "3x higher Instagram engagement",
  },
  web: {
    icon: Globe,
    color: "#10B981",
    gradient: "from-emerald-500 to-teal-600",
    borderClass: "border-emerald-200",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "Mobile landing page load speed and direct 1-tap WhatsApp booking channels turn digital viewers into immediate walk-ins.",
    impactMetric: "Sub-2s mobile conversion funnel",
  },
  ads: {
    icon: Target,
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-600",
    borderClass: "border-amber-200",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
    description: "Hyperlocal 3–5 km radius advertising puts promotional offers directly in front of nearby customers looking to spend today.",
    impactMetric: "Hyperlocal paid customer acquisition",
  },
  speed: {
    icon: Zap,
    color: "#06B6D4",
    gradient: "from-cyan-500 to-sky-600",
    borderClass: "border-cyan-200",
    badgeBg: "bg-cyan-50 text-cyan-800 border-cyan-200",
    description: "Under-5-minute inquiry response times and structured follow-up sequences ensure zero leads leak to nearby competitors.",
    impactMetric: "391% higher inquiry close rate",
  },
};

export function ReportBreakdown({ sectionScores }: ReportBreakdownProps) {
  return (
    <div className="bg-white p-6 sm:p-9 rounded-3xl border border-slate-200/90 shadow-sm space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Diagnostic Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-sans">
            5 Digital Pillars Breakdown
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Evaluated on a standardized 20-point scale per pillar (100 total potential points).
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold self-start sm:self-auto border border-slate-200 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Full 5-Pillar Matrix</span>
        </div>
      </div>

      {/* 5 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionScores.map((sec, idx) => {
          const config = PILLAR_CONFIGS[sec.id] || {
            icon: Globe,
            color: "#475569",
            gradient: "from-slate-500 to-slate-700",
            borderClass: "border-slate-200",
            badgeBg: "bg-slate-100 text-slate-800 border-slate-200",
            description: "",
            impactMetric: "",
          };

          const IconComponent = config.icon;
          const isOptimal = sec.score >= 15;
          const isModerate = sec.score >= 8;
          const percentage = Math.round((sec.score / sec.maxScore) * 100);

          return (
            <div
              key={sec.id}
              className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/60 hover:shadow-md transition-all space-y-4 relative overflow-hidden group"
            >
              {/* Subtle top indicator line with pillar gradient */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`}
              />

              {/* Title & Score line */}
              <div className="flex items-start justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
                    style={{ backgroundColor: config.color }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        Pillar 0{idx + 1}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight leading-snug">
                      {sec.name}
                    </h3>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono font-black text-xl text-slate-900 leading-none">
                    {sec.score}
                    <span className="text-xs font-semibold text-slate-400 ml-0.5">
                      /{sec.maxScore}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border mt-1.5 ${
                      isOptimal
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : isModerate
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {isOptimal ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Optimal</span>
                      </>
                    ) : isModerate ? (
                      <>
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span>Growth Gap</span>
                      </>
                    ) : (
                      <>
                        <AlertOctagon className="w-3 h-3 text-rose-600" />
                        <span>Critical Leak</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* High Legibility Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 font-semibold">
                  <span>Health Index</span>
                  <span>{percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-200/60">
                  <div
                    className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${config.gradient}`}
                    style={{ width: `${Math.max(percentage, 4)}%` }}
                  />
                </div>
              </div>

              {/* Narrative description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed pt-0.5">
                {config.description}
              </p>

              {/* Impact Metric Pill */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Opportunity Potential:</span>
                <span className="font-bold text-slate-800">{config.impactMetric}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
