"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Printer, Share2, Check, ArrowLeft, Send } from "lucide-react";
import { AuditRecord } from "@/lib/audit-data";

interface ReportHeaderProps {
  record: AuditRecord;
}

export function ReportHeader({ record }: ReportHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShareWhatsApp = () => {
    const text =
      `*Team TWS • Local Business Audit Report*\n` +
      `*Business:* ${record.business.name}\n` +
      `*Digital Score:* ${record.totalScore} / 100 (${record.band.title})\n\n` +
      `View your complete report: ${window.location.href}\n\n` +
      `_Prepared by Team TWS._`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert("Please copy the URL from your browser address bar.");
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-black text-white border-b border-zinc-800 shadow-md backdrop-blur-md bg-opacity-95 no-print">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Back to Auditor"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center font-black text-white text-xs tracking-widest">
              TWS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white uppercase font-sans">
                  Official Audit Report
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono">
                Ref: {record.id}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="text-white">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>WhatsApp ↗</span>
          </button>
        </div>
      </div>
    </header>
  );
}
