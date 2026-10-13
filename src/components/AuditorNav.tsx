"use client";

import React from "react";
import Link from "next/link";
import { History, ShieldCheck } from "lucide-react";

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

  // Dynamic score color
  const getScoreColor = (s: number) => {
    if (s >= 90) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/30";
    if (s >= 70) return "text-sky-500 bg-sky-500/10 border-sky-500/30";
    if (s >= 40) return "text-amber-500 bg-amber-500/10 border-amber-500/30";
    return "text-rose-500 bg-rose-500/10 border-rose-500/30";
  };

  const scoreTheme = getScoreColor(currentScore);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 text-white border-b border-slate-800/90 shadow-lg backdrop-blur-md no-print">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand / Business Identifier */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center font-black text-white text-xs tracking-wider shrink-0 shadow-sm"
          >
            TWS
          </Link>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white block truncate">
                {businessName?.trim() ? businessName : "New Business Audit"}
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              {category || "Digital Diagnostic"}
            </p>
          </div>
        </div>

        {/* Center/Right: Live Score Indicator & History */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Live Score Gauge Pill */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="text-right">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none">
                Live Score
              </span>
              <div className="flex items-baseline gap-0.5 leading-none mt-1">
                <span className="text-lg sm:text-xl font-black tracking-tight font-mono text-white">
                  {currentScore}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 font-mono">
                  /{maxScore}
                </span>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-800" />

            {/* Answer count */}
            <div className="text-right">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none">
                Progress
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-200 font-mono leading-none mt-1 block">
                {answeredCount}/{totalQuestions}
              </span>
            </div>
          </div>

          {/* History Icon */}
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              type="button"
              className="relative p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title="Audit History"
            >
              <History className="w-4 h-4" />
              {historyCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-mono text-[9px] font-black flex items-center justify-center">
                  {historyCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-900 h-1 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
}
