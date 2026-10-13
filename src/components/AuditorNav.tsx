"use client";

import React from "react";
import Link from "next/link";
import { History, ArrowRight } from "lucide-react";

interface AuditorNavProps {
  businessName?: string;
  category?: string;
  currentScore: number;
  maxScore?: number;
  answeredCount: number;
  totalQuestions?: number;
  onOpenHistory?: () => void;
  historyCount?: number;
}

export function AuditorNav({
  businessName,
  category,
  currentScore,
  maxScore = 100,
  answeredCount,
  totalQuestions = 16,
  onOpenHistory,
  historyCount = 0,
}: AuditorNavProps) {
  const isComplete = answeredCount === totalQuestions;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950 text-white border-b border-zinc-850 shadow-md backdrop-blur-md bg-opacity-95 no-print">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand / Business Identifier */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            href="/"
            className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-750 flex items-center justify-center font-extrabold text-white text-xs tracking-wider shrink-0"
          >
            TWS
          </Link>

          <div className="min-w-0">
            <div className="truncate">
              <span className="font-bold text-xs sm:text-sm tracking-tight text-white block truncate">
                {businessName?.trim() ? businessName : "Field Audit"}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium truncate">
              {category || "Digital Diagnostic"}
            </p>
          </div>
        </div>

        {/* Center/Right: Live Score Indicator (Fixed at Top) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Live Score Badge */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block leading-none">
                Score
              </span>
              <div className="flex items-baseline gap-0.5 leading-none mt-1">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white font-mono">
                  {currentScore}
                </span>
                <span className="text-[11px] font-semibold text-zinc-500 font-mono">
                  /{maxScore}
                </span>
              </div>
            </div>

            <div className="h-6 w-px bg-zinc-850" />

            {/* Answer count */}
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block leading-none">
                Done
              </span>
              <span className="text-xs sm:text-sm font-bold text-zinc-200 font-mono leading-none mt-1 block">
                {answeredCount}/{totalQuestions}
              </span>
            </div>
          </div>

          {/* History Icon */}
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              type="button"
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
              title="Audit History"
            >
              <History className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Thin Sleek Progress Line */}
      <div className="w-full bg-zinc-900 h-0.5">
        <div
          className="bg-white h-0.5 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
}
