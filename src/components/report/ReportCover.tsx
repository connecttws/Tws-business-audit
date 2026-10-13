"use client";

import React from "react";
import { Building, MapPin, Calendar, User, ShieldCheck, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { AuditRecord } from "@/lib/audit-data";

interface ReportCoverProps {
  record: AuditRecord;
}

export function ReportCover({ record }: ReportCoverProps) {
  const score = record.totalScore;

  // Determine dynamic tier theme
  const getTheme = (score: number) => {
    if (score >= 90) {
      return {
        badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        strokeColor: "#10B981",
        glowColor: "rgba(16, 185, 129, 0.25)",
        pillBg: "bg-emerald-500 text-slate-950",
        alertIcon: Sparkles,
        statusLabel: "Optimal Digital Footprint",
      };
    }
    if (score >= 70) {
      return {
        badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/30",
        strokeColor: "#0EA5E9",
        glowColor: "rgba(14, 165, 233, 0.25)",
        pillBg: "bg-sky-500 text-slate-950",
        alertIcon: TrendingUp,
        statusLabel: "Strong Foundation · Scaling Ready",
      };
    }
    if (score >= 40) {
      return {
        badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        strokeColor: "#F59E0B",
        glowColor: "rgba(245, 158, 11, 0.25)",
        pillBg: "bg-amber-500 text-slate-950",
        alertIcon: AlertTriangle,
        statusLabel: "Moderate Conversion Friction",
      };
    }
    return {
      badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      strokeColor: "#EF4444",
      glowColor: "rgba(239, 68, 68, 0.25)",
      pillBg: "bg-rose-500 text-white",
      alertIcon: AlertTriangle,
      statusLabel: "Critical Revenue Leakage",
    };
  };

  const theme = getTheme(score);
  const StatusIcon = theme.alertIcon;

  // Radial progress calculations for SVG gauge
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-10 shadow-2xl border border-slate-800/90">
      {/* Subtle ambient lighting glows */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ backgroundColor: theme.strokeColor }}
      />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-blue-600/15" />

      <div className="relative z-10 space-y-7">
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800/80 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-200 font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official TWS Digital Audit</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-xs font-mono">
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800">
              Ref ID: {record.id}
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(record.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Hero Main: Business Details + Radial Gauge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-1">
          <div className="space-y-4 flex-1">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-800 px-3 py-1 rounded-lg border border-slate-700/80 text-xs font-medium text-slate-200">
                <Building className="w-3.5 h-3.5 text-sky-400" />
                <span>{record.business.category}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-800 px-3 py-1 rounded-lg border border-slate-700/80 text-xs font-medium text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{record.business.locality}</span>
              </span>
              {record.business.clientName && (
                <span className="inline-flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-800 px-3 py-1 rounded-lg border border-slate-700/80 text-xs font-medium text-slate-200">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Client: <strong>{record.business.clientName}</strong></span>
                </span>
              )}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold ${theme.badgeBg}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{theme.statusLabel}</span>
              </span>
            </div>

            {/* Business Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {record.business.name}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-medium mt-2 leading-relaxed max-w-2xl">
                {record.band.headline}
              </p>
            </div>

            {/* Auditor signature pill */}
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 font-mono">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>Prepared on-site by: <strong className="text-slate-200 font-semibold">{record.business.auditorName || "Team TWS"}</strong></span>
            </div>
          </div>

          {/* Radial SVG Score Gauge */}
          <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800/90 shadow-xl shrink-0">
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 128 128">
                {/* Background Ring */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="9"
                  className="text-slate-800"
                  fill="transparent"
                />
                {/* Dynamic Value Ring */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke={theme.strokeColor}
                  strokeWidth="9"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Number in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black tracking-tight text-white font-mono leading-none">
                  {score}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  / 100 PTS
                </span>
              </div>
            </div>

            {/* Tier Pill */}
            <div className="text-right sm:text-center space-y-1">
              <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm ${theme.pillBg}`}>
                {record.band.title}
              </span>
              <span className="block text-[11px] font-mono text-slate-400">
                Score Range ({record.band.range})
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary Narrative */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.strokeColor }} />
            <span>Executive Diagnostic Synopsis:</span>
          </div>
          <p className="text-slate-300 pt-0.5">
            {record.band.description}
          </p>
        </div>
      </div>
    </div>
  );
}
