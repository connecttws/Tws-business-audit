"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  RotateCcw,
  Copy,
  Check,
  Send,
  Building,
  ShieldCheck,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import {
  AuditRecord,
  formatWhatsAppUrl,
  isValidIndianMobile,
  cleanPhoneNumber,
} from "@/lib/audit-data";
import { encodeAuditForUrl, saveAuditToStorage } from "@/lib/audit-storage";

interface AuditCompleteStepProps {
  record: AuditRecord;
  onReviewAnswers: () => void;
  onReset: () => void;
}

export function AuditCompleteStep({
  record,
  onReviewAnswers,
  onReset,
}: AuditCompleteStepProps) {
  const [copied, setCopied] = useState(false);
  const [clientPhone, setClientPhone] = useState(
    record.business.whatsappNumber || record.business.phone || ""
  );
  const [phoneError, setPhoneError] = useState("");
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [wasSent, setWasSent] = useState(false);

  // Generate cross-device encoded string
  const encodedPayload = encodeAuditForUrl(record);

  // Base report link
  const reportUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/report?id=${record.id}&d=${encodedPayload}`
      : `/report?id=${record.id}`;

  const cleanDigits = (clientPhone || "").replace(/\D/g, "");
  const isPhoneValid = isValidIndianMobile(clientPhone);

  const handlePhoneChange = (val: string) => {
    setClientPhone(val);
    setPhoneError("");
    setWasSent(false);
    record.business.whatsappNumber = val;
    record.business.phone = val;
    saveAuditToStorage(record);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(reportUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert("Please copy the URL manually from your browser address bar.");
    }
  };

  const generateWhatsAppMessage = () => {
    return (
      `*Team TWS • Local Business Digital Audit*\n\n` +
      `*Business:* ${record.business.name}\n` +
      `*Locality:* ${record.business.locality} (${record.business.category})\n` +
      `*Digital Health Score:* ${record.totalScore} / 100 — ${record.band.title}\n\n` +
      `*5-Pillar Score Breakdown:*\n` +
      record.sectionScores
        .map((s) => `• ${s.name}: ${s.score}/${s.maxScore}`)
        .join("\n") +
      `\n\n*View Complete Diagnostic Report Online:*\n${reportUrl}\n\n` +
      `_Prepared on-site by Team TWS._`
    );
  };

  const handleShareWhatsApp = () => {
    if (!isPhoneValid) {
      setPhoneError("Please enter a valid 10-digit mobile number to open WhatsApp directly.");
      return;
    }

    const text = generateWhatsAppMessage();
    const waUrl = formatWhatsAppUrl(clientPhone, text);
    setWasSent(true);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* 1. Page Header */}
      <div className="flex items-center justify-between border-b border-zinc-200/90 pb-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block">
            Executive Summary & Client Dispatch
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 font-sans tracking-tight mt-0.5">
            Audit Summary
          </h2>
        </div>

        <button
          type="button"
          onClick={onReviewAnswers}
          className="text-xs font-bold text-zinc-600 hover:text-black transition-colors cursor-pointer"
        >
          ← Edit Answers
        </button>
      </div>

      {/* 2. Luxury Monochrome Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-black text-white p-6 sm:p-8 shadow-xl border border-zinc-800">
        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
              Audit Complete · ID: {record.id}
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              {new Date(record.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold">
                <Building className="w-3.5 h-3.5 text-zinc-300" />
                <span>
                  {record.business.category} • {record.business.locality}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans">
                {record.business.name}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed font-normal">
                {record.band.headline}
              </p>
            </div>

            {/* Stark Monochrome Score Card */}
            <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
              <div className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-right">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white block leading-none">
                  {record.totalScore}
                  <span className="text-xs text-zinc-500 font-normal">/100</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-1 block">
                  Digital Health Score
                </span>
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white text-black border border-white">
                  {record.band.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Direct Client WhatsApp Delivery Console (Zero Manual Work) */}
      <div className="bg-white rounded-3xl border border-zinc-200/90 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-sans">
              Share Report to Client WhatsApp
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            Zero Contact-Saving Needed
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Deliver the complete executive report directly into the business owner's WhatsApp chat in one tap. You do not need to save their phone number in your contacts.
        </p>

        {/* WhatsApp Phone Input Section */}
        <div className="space-y-3 pt-1">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                Client WhatsApp Number *
              </label>
              {isPhoneValid ? (
                <span className="text-[11px] font-mono font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Valid number · Ready to send</span>
                </span>
              ) : cleanDigits.length > 0 ? (
                <span className="text-[11px] font-mono text-zinc-400">
                  {10 - cleanDigits.length > 0
                    ? `Enter ${10 - cleanDigits.length} more digits`
                    : "Invalid format"}
                </span>
              ) : (
                <span className="text-[11px] font-mono text-zinc-400">
                  Required to send directly
                </span>
              )}
            </div>

            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none text-zinc-700 font-mono text-xs font-bold border-r border-zinc-200 pr-2.5">
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                <span>+91</span>
              </div>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="Enter 10-digit mobile number (e.g. 98765 43210)"
                className={`w-full pl-20 pr-4 py-3.5 rounded-xl border bg-zinc-50 text-base sm:text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 focus:outline-none transition-colors shadow-xs font-mono ${
                  phoneError
                    ? "border-red-400 focus:border-red-500 focus:bg-white ring-2 ring-red-100"
                    : isPhoneValid
                    ? "border-emerald-400 focus:border-emerald-600 focus:bg-white"
                    : "border-zinc-200 focus:border-black focus:bg-white"
                }`}
              />
            </div>

            {phoneError && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{phoneError}</span>
              </p>
            )}
          </div>

          {/* Primary Action: Send on WhatsApp Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="p-4 rounded-2xl bg-zinc-950 hover:bg-black active:bg-zinc-900 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer border border-zinc-800"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Share Report on WhatsApp ↗</span>
            </button>

            <Link
              href={`/report?id=${record.id}&d=${encodedPayload}`}
              target="_blank"
              className="p-4 rounded-2xl bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 text-zinc-950 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-zinc-200 transition-all text-center cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-zinc-700" />
              <span>Open Report Online</span>
            </Link>
          </div>

          {wasSent && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
              <span>
                WhatsApp opened! The client report and executive scorecard have been pre-filled directly into their chat.
              </span>
            </div>
          )}

          {/* Pre-Formatted Message Preview Toggle */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowMessagePreview(!showMessagePreview)}
              className="text-xs font-bold text-zinc-500 hover:text-black flex items-center gap-1.5 transition-colors cursor-pointer py-1"
            >
              {showMessagePreview ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
              <span>
                {showMessagePreview
                  ? "Hide WhatsApp Message Preview"
                  : "Preview Pre-Formatted WhatsApp Message"}
              </span>
            </button>

            {showMessagePreview && (
              <div className="mt-2.5 p-4 rounded-2xl bg-zinc-900 text-zinc-200 border border-zinc-800 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                {generateWhatsAppMessage()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Copy Report Link Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-zinc-200/90 shadow-xs flex items-center justify-between gap-3 text-xs">
        <div className="truncate text-zinc-500 font-mono text-[11px] flex-1">
          {reportUrl}
        </div>
        <button
          type="button"
          onClick={handleCopyLink}
          className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-black" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-500" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>

      {/* 4. 5-Pillar Breakdown in Clean Monochrome */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <h2 className="text-sm font-black uppercase tracking-wider text-zinc-950 font-sans">
            5-Pillar Score Breakdown
          </h2>
          <span className="text-xs font-mono text-zinc-400">
            20 Pts Max Each
          </span>
        </div>

        <div className="space-y-3">
          {record.sectionScores.map((sec, idx) => (
            <div
              key={sec.id}
              className="p-3.5 rounded-xl border border-zinc-100 bg-zinc-50/60 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-zinc-900">
                  <span className="font-mono text-zinc-400">0{idx + 1}</span>
                  <span>{sec.name}</span>
                </div>
                <div className="font-mono font-black text-zinc-950">
                  {sec.score}{" "}
                  <span className="text-zinc-400 font-normal">/ {sec.maxScore}</span>
                </div>
              </div>

              {/* Monochrome Progress Bar */}
              <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-black h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(sec.score / sec.maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recommended TWS Blueprint */}
      <div className="p-5 rounded-2xl bg-zinc-900 text-white border border-zinc-800 space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
          <span>Recommended Agency Solution</span>
        </div>
        <h3 className="text-base font-black text-white font-sans">
          {record.band.sprintRecommendation}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          {record.band.sprintDetails}
        </p>
      </div>

      {/* 6. Footer Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onReviewAnswers}
          className="text-xs font-bold text-zinc-500 hover:text-black transition-colors cursor-pointer"
        >
          ← Review All Questions
        </button>

        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold text-black hover:text-zinc-600 flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start New Audit</span>
        </button>
      </div>
    </div>
  );
}
