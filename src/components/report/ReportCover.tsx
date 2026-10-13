"use client";

import React from "react";
import { Building, MapPin, Calendar, User, ShieldCheck } from "lucide-react";
import { AuditRecord } from "@/lib/audit-data";

interface ReportCoverProps {
  record: AuditRecord;
}

export function ReportCover({ record }: ReportCoverProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-black text-white p-7 sm:p-10 shadow-xl border border-zinc-800">
      <div className="relative z-10 space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-zinc-800/80 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono font-bold uppercase tracking-widest text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Executive Business Audit Report</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
            <span>Audit ID: {record.id}</span>
          </div>
        </div>

        {/* Business Title & Details */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-1">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300 font-semibold">
              <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800 font-mono text-[11px] uppercase tracking-wider">
                <Building className="w-3.5 h-3.5 text-zinc-400" />
                <span>{record.business.category}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800 font-mono text-[11px] uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{record.business.locality}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans leading-tight">
              {record.business.name}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 max-w-xl font-normal leading-relaxed">
              {record.band.headline}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-3 border-t border-zinc-800/80 font-mono">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>
                  {new Date(record.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-500" />
                <span>Prepared by: {record.business.auditorName || "Team TWS"}</span>
              </div>
            </div>
          </div>

          {/* Stark Monochrome Score Gauge */}
          <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                Digital Health Index
              </span>
              <div className="flex items-baseline gap-1 text-right">
                <span className="text-5xl sm:text-6xl font-black tracking-tight font-mono text-white">
                  {record.totalScore}
                </span>
                <span className="text-sm font-bold text-zinc-500">/100</span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white text-black border border-white">
                {record.band.title}
              </span>
              <span className="block text-[10px] font-mono text-zinc-400 mt-1">
                Score Range ({record.band.range})
              </span>
            </div>
          </div>
        </div>

        {/* Executive Narrative */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
          <p>
            <strong className="text-white font-extrabold mr-1 uppercase font-mono text-[11px] tracking-wider block sm:inline sm:mb-0 mb-1">
              Diagnostic Synopsis:
            </strong>{" "}
            {record.band.description}
          </p>
        </div>
      </div>
    </div>
  );
}
