"use client";

import React, { useState } from "react";
import {
  AUDIT_SECTIONS,
  BusinessDetails,
  BUSINESS_CATEGORIES,
} from "@/lib/audit-data";
import { Check, ArrowRight, Phone, Send, X, ShieldAlert } from "lucide-react";

interface ContinuousQuestionnaireProps {
  business: BusinessDetails;
  onBusinessChange: (fields: Partial<BusinessDetails>) => void;
  answers: Record<string, number>;
  onAnswer: (questionId: string, optionIndex: number) => void;
  onGenerateReport: () => void;
  currentScore: number;
}

const SECTION_SUBTITLES: Record<string, string> = {
  maps: "Google Business Profile health, local map pack rankings, and customer review responsiveness.",
  visuals: "Professional photography quality, short-form reels consistency, and brand aesthetics.",
  web: "Mobile landing page speed, direct 1-tap WhatsApp booking flow, and menu accessibility.",
  ads: "Hyperlocal 3–5 km radius advertising, tracked promotional offers, and competitor differentiation.",
  speed: "Inquiry response time (<5 min), structured follow-up systems, and repeat customer retention.",
};

export function ContinuousQuestionnaire({
  business,
  onBusinessChange,
  answers,
  onAnswer,
  onGenerateReport,
  currentScore,
}: ContinuousQuestionnaireProps) {
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [modalPhone, setModalPhone] = useState(
    business.whatsappNumber || business.phone || ""
  );
  const [phoneError, setPhoneError] = useState("");

  const answeredCount = Object.keys(answers).length;
  let globalQuestionCounter = 1;

  const handleGenerateClick = () => {
    if (!business.name.trim()) {
      alert("Please enter the Business Name before generating the report.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!business.locality.trim()) {
      alert("Please enter the Locality / City before generating the report.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const currentPhone = (business.whatsappNumber || business.phone || "").trim();
    if (!currentPhone) {
      setModalPhone("");
      setPhoneError("");
      setShowPhoneModal(true);
      return;
    }

    onGenerateReport();
  };

  const handleConfirmModalPhone = (skip = false) => {
    if (!skip) {
      const digits = modalPhone.replace(/\D/g, "");
      if (digits.length < 10) {
        setPhoneError("Please enter a valid 10-digit mobile number, or skip for now.");
        return;
      }
      onBusinessChange({ whatsappNumber: modalPhone, phone: modalPhone });
    }
    setShowPhoneModal(false);
    onGenerateReport();
  };

  return (
    <div className="space-y-8 pb-36">
      {/* 1. Sleek Business Setup Card */}
      <section className="bg-white rounded-3xl border border-zinc-200/90 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-sans">
              Business Information
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-zinc-500">
            {answeredCount}/16 Evaluated
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
              Business Name *
            </label>
            <input
              type="text"
              value={business.name}
              onChange={(e) => onBusinessChange({ name: e.target.value })}
              placeholder="e.g. Blue Bottle Cafe"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/60 text-base sm:text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white transition-colors shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
              Locality / City *
            </label>
            <input
              type="text"
              value={business.locality}
              onChange={(e) => onBusinessChange({ locality: e.target.value })}
              placeholder="e.g. Connaught Place, Central Delhi"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/60 text-base sm:text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white transition-colors shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5 flex items-center justify-between">
              <span>Client WhatsApp</span>
              <span className="text-[10px] text-zinc-400 font-normal font-mono">optional now</span>
            </label>
            <input
              type="tel"
              value={business.whatsappNumber || business.phone || ""}
              onChange={(e) =>
                onBusinessChange({
                  whatsappNumber: e.target.value,
                  phone: e.target.value,
                })
              }
              placeholder="e.g. 98765 43210"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/60 text-base sm:text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white transition-colors shadow-xs font-mono"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
            Industry Category
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none overscroll-x-contain touch-pan-x">
            {BUSINESS_CATEGORIES.map((cat) => {
              const isSelected = business.category === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => onBusinessChange({ category: cat.name })}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-black text-white shadow-xs"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-black border border-zinc-200/80"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Continuous 16-Question Flow Segmented by 5 Pillars */}
      <div className="space-y-12">
        {AUDIT_SECTIONS.map((section, sIdx) => {
          return (
            <div key={section.id} className="space-y-5">
              {/* Beautiful, High-Legibility Pillar Section Header */}
              <div className="pt-6 pb-3 border-b border-zinc-200/90 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-zinc-950 text-white">
                      Pillar 0{sIdx + 1}
                    </span>
                    <span className="text-xs font-medium text-zinc-400">
                      {section.questions.length} Questions · {section.maxPoints} Points
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-md border border-zinc-200 shrink-0">
                    {section.maxPoints} Pts Max
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-[-0.015em] leading-tight font-sans">
                  {section.name}
                </h2>

                <p className="text-xs sm:text-[13.5px] text-zinc-500 leading-normal font-normal">
                  {SECTION_SUBTITLES[section.id]}
                </p>
              </div>

              {/* Questions in this Section */}
              <div className="space-y-5">
                {section.questions.map((q) => {
                  const qNum = globalQuestionCounter++;
                  const chosenOptIndex = answers[q.id];
                  const isAnswered = chosenOptIndex !== undefined;

                  return (
                    <article
                      key={q.id}
                      id={`question-${qNum}`}
                      className={`bg-white rounded-3xl border transition-colors p-5 sm:p-6 shadow-xs scroll-mt-24 ${
                        isAnswered
                          ? "border-zinc-300 ring-1 ring-zinc-200"
                          : "border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      {/* Top Meta Line: Question Number & Points */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                            Question {qNum < 10 ? `0${qNum}` : qNum} of 16
                          </span>
                        </div>

                        {/* Status Check / Points Pill */}
                        <div className="shrink-0 text-right">
                          {isAnswered ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-black bg-zinc-100 px-2.5 py-1 rounded-md border border-zinc-300">
                              <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                              <span>Awarded: {q.options[chosenOptIndex].points} pts</span>
                            </span>
                          ) : (
                            <span className="text-xs font-mono font-semibold text-zinc-400">
                              Weight: {Math.max(...q.options.map((o) => o.points))} pts max
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Question Title - Large, Clear, Human Readable */}
                      <h3 className="text-base sm:text-[18px] font-bold text-zinc-950 tracking-[-0.01em] leading-snug font-sans mt-2">
                        {q.text}
                      </h3>

                      {/* Description - Un-indented, Clear Line Height */}
                      <p className="text-xs sm:text-[13.5px] text-zinc-600 leading-relaxed mt-1.5 mb-5 font-normal">
                        {q.description}
                      </p>

                      {/* Options List */}
                      <div className="space-y-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = chosenOptIndex === optIdx;

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => {
                                onAnswer(q.id, optIdx);
                                if (qNum < 16) {
                                  setTimeout(() => {
                                    const nextEl = document.getElementById(`question-${qNum + 1}`);
                                    if (nextEl) {
                                      nextEl.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }
                                  }, 150);
                                }
                              }}
                              className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-colors duration-150 cursor-pointer ${
                                isSelected
                                  ? "bg-emerald-50/80 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20"
                                  : "bg-zinc-50/70 hover:bg-zinc-100/90 border-zinc-200/90 text-zinc-900"
                              }`}
                            >
                              {/* Attractive Check / Radio indicator */}
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  isSelected
                                    ? "border-emerald-600 bg-emerald-600 text-white"
                                    : "border-zinc-300 bg-white"
                                }`}
                              >
                                {isSelected ? (
                                  <Check className="w-3 h-3 text-white stroke-[3.5]" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between gap-2">
                                  <span
                                    className={`text-sm sm:text-[15px] font-bold leading-snug tracking-tight ${
                                      isSelected
                                        ? "text-emerald-950"
                                        : "text-zinc-950"
                                    }`}
                                  >
                                    {opt.text}
                                  </span>
                                  <span
                                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md shrink-0 ${
                                      isSelected
                                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300/80"
                                        : "bg-zinc-200/80 text-zinc-700 border border-zinc-200"
                                    }`}
                                  >
                                    +{opt.points} PTS
                                  </span>
                                </div>

                                {opt.hint && (
                                  <p
                                    className={`text-xs sm:text-[12.5px] mt-1 leading-relaxed ${
                                      isSelected
                                        ? "text-emerald-900/80"
                                        : "text-zinc-600"
                                    }`}
                                  >
                                    {opt.hint}
                                  </p>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950 text-white border-t border-zinc-800 p-3.5 sm:p-4 backdrop-blur-md shadow-2xl no-print">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block leading-none">
              Calculated Score
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white leading-none">
                {currentScore}
              </span>
              <span className="text-xs text-zinc-400 font-semibold font-mono">/100 PTS</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateClick}
            className="flex-1 max-w-xs px-6 py-3.5 rounded-2xl bg-white hover:bg-zinc-100 active:bg-zinc-200 text-black font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer font-sans"
          >
            <span>Generate Client Report</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 4. Sleek On-Site Client WhatsApp Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overscroll-none animate-fadeIn">
          <div className="bg-white rounded-3xl border border-zinc-250 p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 font-sans tracking-tight">
                    Client's WhatsApp Number
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium">
                    Direct 1-tap dispatch without saving contacts
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPhoneModal(false)}
                className="p-1.5 rounded-xl hover:bg-zinc-100 text-zinc-400 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed">
              Ask the business owner for their WhatsApp number to deliver their diagnostic summary and report link directly into their chat.
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                10-Digit Mobile Number
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none text-zinc-700 font-mono text-xs font-bold border-r border-zinc-200 pr-2.5">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  autoFocus
                  value={modalPhone}
                  onChange={(e) => {
                    setModalPhone(e.target.value);
                    setPhoneError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleConfirmModalPhone(false);
                    }
                  }}
                  placeholder="98765 43210"
                  className="w-full pl-20 pr-4 py-3.5 rounded-xl border border-zinc-250 bg-zinc-50 text-base sm:text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white transition-colors shadow-xs font-mono"
                />
              </div>

              {phoneError && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span>{phoneError}</span>
                </p>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => handleConfirmModalPhone(false)}
                className="w-full py-3.5 px-5 rounded-2xl bg-zinc-950 hover:bg-black active:bg-zinc-900 text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer font-sans"
              >
                <span>Continue to Summary & Share</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => handleConfirmModalPhone(true)}
                className="w-full py-2.5 px-4 text-xs font-bold text-zinc-500 hover:text-black transition-colors cursor-pointer text-center"
              >
                Skip for now (enter on summary page)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
