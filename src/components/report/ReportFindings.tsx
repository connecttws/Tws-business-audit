"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, AlertOctagon } from "lucide-react";
import { AuditRecord } from "@/lib/audit-data";

interface ReportFindingsProps {
  findings: AuditRecord["findings"];
}

export function ReportFindings({ findings }: ReportFindingsProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "attention" | "passed">("all");

  const passedCount = findings.filter((f) => f.pointsAwarded === f.maxPoints).length;
  const attentionCount = findings.filter((f) => f.pointsAwarded < f.maxPoints).length;

  const filteredFindings = findings.filter((item) => {
    if (activeFilter === "passed") return item.pointsAwarded === item.maxPoints;
    if (activeFilter === "attention") return item.pointsAwarded < item.maxPoints;
    return true;
  });

  return (
    <div className="bg-white p-6 sm:p-9 rounded-3xl border border-slate-200/90 shadow-sm space-y-7">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Complete Diagnostic Audit
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-sans">
            Itemized Diagnostic Findings
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Transparent breakdown of all 16 evaluated digital touchpoints and observations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start sm:self-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All (16)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("attention")}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === "attention"
                ? "bg-amber-500 text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-amber-700"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Attention ({attentionCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("passed")}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === "passed"
                ? "bg-emerald-600 text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-emerald-700"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Optimal ({passedCount})</span>
          </button>
        </div>
      </div>

      {/* Findings List */}
      <div className="space-y-3.5">
        {filteredFindings.map((item, idx) => {
          const isPerfect = item.pointsAwarded === item.maxPoints;
          const isZero = item.pointsAwarded === 0;

          return (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isPerfect
                  ? "border-slate-200/80 bg-slate-50/40 hover:bg-slate-50/80"
                  : isZero
                  ? "border-rose-200/90 bg-rose-50/30 hover:bg-rose-50/60"
                  : "border-amber-200/90 bg-amber-50/30 hover:bg-amber-50/60"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  {/* Pillar & Question Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700">
                      {item.sectionName}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border ${
                        isPerfect
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : isZero
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {isPerfect ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Optimal Practice</span>
                        </>
                      ) : isZero ? (
                        <>
                          <AlertOctagon className="w-3 h-3 text-rose-600" />
                          <span>Revenue Leak</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>Improvement Gap</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Question Title */}
                  <h3 className="font-extrabold text-base text-slate-900 tracking-tight leading-snug">
                    {item.questionText}
                  </h3>

                  {/* Observed Finding */}
                  <div className="text-xs sm:text-sm font-semibold text-slate-700 flex items-baseline gap-1.5 pt-0.5">
                    <span className="text-slate-400 font-mono text-[11px] uppercase">Observation:</span>
                    <span className={isPerfect ? "text-emerald-900" : isZero ? "text-rose-950 font-bold" : "text-amber-950 font-bold"}>
                      {item.chosenOptionText}
                    </span>
                  </div>

                  {/* Strategic Hint */}
                  {item.hint && (
                    <div
                      className={`p-3 rounded-xl text-xs leading-relaxed mt-2 ${
                        isPerfect
                          ? "bg-emerald-50/80 text-emerald-900 border border-emerald-200/60"
                          : isZero
                          ? "bg-rose-50/80 text-rose-900 border border-rose-200/60"
                          : "bg-amber-50/80 text-amber-900 border border-amber-200/60"
                      }`}
                    >
                      <strong className="font-bold mr-1">TWS Strategic Impact:</strong>
                      {item.hint}
                    </div>
                  )}
                </div>

                {/* Points Pill */}
                <div className="shrink-0 self-start sm:self-center">
                  <span
                    className={`font-mono font-bold text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1 ${
                      isPerfect
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : isZero
                        ? "bg-rose-100 text-rose-800 border-rose-300"
                        : "bg-amber-100 text-amber-800 border-amber-300"
                    }`}
                  >
                    <span>+{item.pointsAwarded}</span>
                    <span className="text-[10px] text-slate-500">/ {item.maxPoints} PTS</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
