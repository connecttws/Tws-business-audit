"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Check, FileCheck } from "lucide-react";
import { AuditRecord } from "@/lib/audit-data";

interface ReportFindingsProps {
  findings: AuditRecord["findings"];
}

export function ReportFindings({ findings }: ReportFindingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Group findings by section
  const grouped = findings.reduce<Record<string, AuditRecord["findings"]>>(
    (acc, item) => {
      if (!acc[item.sectionName]) acc[item.sectionName] = [];
      acc[item.sectionName].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.01em] text-zinc-950 font-sans">
              Itemized Diagnostic Findings
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500">
            A transparent review of all 16 evaluated digital touchpoints and observations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-start sm:self-auto px-4 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-900 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors no-print cursor-pointer"
        >
          <span>{isExpanded ? "Collapse Items" : "Expand All 16 Points"}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([sectionName, items], sIdx) => {
          return (
            <div key={sectionName} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-zinc-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                  0{sIdx + 1}
                </span>
                <h3 className="font-bold text-base text-zinc-950 font-sans">
                  {sectionName}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {items.map((item, idx) => {
                  const isPerfect = item.pointsAwarded === item.maxPoints;

                  // Only show all if expanded, or top points if collapsed
                  if (!isExpanded && sIdx > 1 && idx > 0) {
                    return null;
                  }

                  return (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-xl border border-zinc-100 bg-zinc-50/60 hover:bg-zinc-50 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="font-extrabold text-zinc-950 text-sm">
                          {item.questionText}
                        </div>
                        <div className="flex items-center gap-1.5 font-semibold text-zinc-700">
                          <span>Observed: {item.chosenOptionText}</span>
                        </div>
                        {item.hint && (
                          <p className="text-[11px] text-zinc-500 leading-relaxed pt-0.5">
                            {item.hint}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 self-start sm:self-center">
                        <span
                          className={`inline-flex items-center gap-1 font-mono font-bold text-xs px-2.5 py-1 rounded-md border ${
                            isPerfect
                              ? "bg-black text-white border-black"
                              : "bg-zinc-100 text-zinc-800 border-zinc-200"
                          }`}
                        >
                          {item.pointsAwarded} / {item.maxPoints} PTS
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {!isExpanded && (
        <div className="text-center pt-2 no-print">
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="text-xs font-mono font-bold text-black hover:underline cursor-pointer"
          >
            Show full 16-point breakdown ↓
          </button>
        </div>
      )}
    </div>
  );
}
