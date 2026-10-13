"use client";

import React, { useState } from "react";
import {
  AUDIT_SECTIONS,
  BusinessDetails,
  BUSINESS_CATEGORIES,
  formatTitleCase,
} from "@/lib/audit-data";
import {
  Check,
  ArrowRight,
  Phone,
  Send,
  X,
  ShieldAlert,
  Building,
  MapPin,
  User,
  Camera,
  Globe,
  Target,
  Zap,
  Sparkles,
} from "lucide-react";

interface ContinuousQuestionnaireProps {
  business: BusinessDetails;
  onBusinessChange: (fields: Partial<BusinessDetails>) => void;
  answers: Record<string, number>;
  onAnswer: (questionId: string, optionIndex: number) => void;
  onGenerateReport: () => void;
  currentScore: number;
}

const PILLAR_META: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    gradient: string;
    subtitle: string;
  }
> = {
  maps: {
    icon: MapPin,
    color: "#0284C7",
    gradient: "from-sky-500 to-blue-600",
    subtitle: "Google Business Profile health, map pack ranking, and review responsiveness.",
  },
  visuals: {
    icon: Camera,
    color: "#8B5CF6",
    gradient: "from-purple-500 to-indigo-600",
    subtitle: "Professional photo quality, reel consistency, and brand appetite appeal.",
  },
  web: {
    icon: Globe,
    color: "#10B981",
    gradient: "from-emerald-500 to-teal-600",
    subtitle: "Mobile speed, 1-tap WhatsApp booking flow, and digital menu accessibility.",
  },
  ads: {
    icon: Target,
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-600",
    subtitle: "Hyperlocal 3–5 km radius ads, tracked promotional offers, and rival differentiation.",
  },
  speed: {
    icon: Zap,
    color: "#06B6D4",
    gradient: "from-cyan-500 to-sky-600",
    subtitle: "Under-5-minute lead response times, structured CRM follow-ups, and retention.",
  },
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

  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const answeredCount = Object.keys(answers).length;
  let globalQuestionCounter = 1;

  // Load custom categories from local storage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("tws_custom_categories");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCustomCategories(parsed);
      }
    } catch {}
  }, []);

  const handleAddCustomCategory = () => {
    const formatted = formatTitleCase(customInput);
    if (!formatted) return;

    if (!customCategories.includes(formatted)) {
      const updated = [...customCategories, formatted];
      setCustomCategories(updated);
      try {
        localStorage.setItem("tws_custom_categories", JSON.stringify(updated));
      } catch {}
    }
    onBusinessChange({ category: formatted });
    setCustomInput("");
    setShowAddCustom(false);
  };

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

  const standardCategories = BUSINESS_CATEGORIES.filter((c) => c.name !== "Other Business");

  return (
    <div className="space-y-8 pb-36">
      {/* 1. Sleek Business Setup Card */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
              Business & Client Profile
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            {answeredCount}/16 Evaluated
          </span>
        </div>

        {/* 2x2 Clean Responsive Grid for Desktop & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Business Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Business Name *</span>
            </label>
            <input
              type="text"
              value={business.name}
              onChange={(e) => onBusinessChange({ name: e.target.value })}
              placeholder="e.g. Blue Bottle Cafe"
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/70 text-base sm:text-sm font-semibold text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white transition-all shadow-xs"
            />
          </div>

          {/* 2. Client Name (Owner / Decision Maker) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Client Name</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Owner / Manager</span>
            </label>
            <input
              type="text"
              value={business.clientName || ""}
              onChange={(e) => onBusinessChange({ clientName: e.target.value })}
              placeholder="e.g. Vikram Malhotra"
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/70 text-base sm:text-sm font-semibold text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white transition-all shadow-xs"
            />
          </div>

          {/* 3. Locality / City */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Locality / City *</span>
            </label>
            <input
              type="text"
              value={business.locality}
              onChange={(e) => onBusinessChange({ locality: e.target.value })}
              placeholder="e.g. Connaught Place, Central Delhi"
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/70 text-base sm:text-sm font-semibold text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white transition-all shadow-xs"
            />
          </div>

          {/* 4. Client WhatsApp */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Client WhatsApp</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">1-tap report send</span>
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
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/70 text-base sm:text-sm font-semibold text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white transition-all shadow-xs font-mono"
            />
          </div>
        </div>

        {/* Industry Category Selector */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Industry Category
            </label>
            <span className="text-xs font-mono font-semibold text-slate-500">
              Selected: <strong className="text-slate-900">{business.category}</strong>
            </span>
          </div>

          {/* Category Horizontal Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none overscroll-x-contain touch-pan-x">
            {standardCategories.map((cat) => {
              const isSelected = business.category === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => {
                    onBusinessChange({ category: cat.name });
                    setShowAddCustom(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-slate-950 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950 border border-slate-200/80"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}

            {/* Custom Categories added by user */}
            {customCategories.map((catName) => {
              const isSelected = business.category === catName;
              return (
                <button
                  key={catName}
                  type="button"
                  onClick={() => {
                    onBusinessChange({ category: catName });
                    setShowAddCustom(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-slate-950 text-white shadow-xs"
                      : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                  }`}
                >
                  <span>{catName}</span>
                </button>
              );
            })}

            {/* "+ Other Category" Button */}
            <button
              type="button"
              onClick={() => setShowAddCustom(!showAddCustom)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                showAddCustom
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-dashed border-slate-300"
              }`}
            >
              <span>{showAddCustom ? "Close Custom" : "+ Other Industry"}</span>
            </button>
          </div>

          {/* Custom Category Input Form */}
          {showAddCustom && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Add New Industry Category</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Auto-formats to Title Case
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  autoFocus
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomCategory();
                    }
                  }}
                  placeholder="e.g. pet clinic, dental, dry cleaners, auto spa..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-base sm:text-xs font-semibold text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 transition-colors shadow-xs"
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddCustomCategory}
                    disabled={!customInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-black disabled:opacity-40 text-white text-xs font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
                  >
                    Add & Select
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddCustom(false);
                      setCustomInput("");
                    }}
                    className="px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Real-time Title Case Preview */}
              {customInput.trim() && (
                <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-white p-2 rounded-lg border border-slate-200/80">
                  <span className="text-slate-400">Title Case Saved As:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    "{formatTitleCase(customInput)}"
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 2. Continuous 16-Question Flow Segmented by 5 Pillars */}
      <div className="space-y-12">
        {AUDIT_SECTIONS.map((section, sIdx) => {
          const meta = PILLAR_META[section.id] || {
            icon: Sparkles,
            color: "#475569",
            gradient: "from-slate-500 to-slate-700",
            subtitle: "",
          };
          const PillarIcon = meta.icon;

          return (
            <div key={section.id} className="space-y-5">
              {/* Pillar Section Header */}
              <div className="pt-6 pb-3 border-b border-slate-200/90 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-mono font-bold shadow-xs shrink-0"
                      style={{ backgroundColor: meta.color }}
                    >
                      <PillarIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                      Pillar 0{sIdx + 1}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      · {section.questions.length} Questions
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 shrink-0">
                    {section.maxPoints} Pts Max
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight font-sans">
                  {section.name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 leading-normal font-normal">
                  {meta.subtitle}
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
                      className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 shadow-sm scroll-mt-24 ${
                        isAnswered
                          ? "border-slate-300 ring-1 ring-slate-200"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {/* Top Meta Line: Question Number & Points */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                            Question {qNum < 10 ? `0${qNum}` : qNum} of 16
                          </span>
                        </div>

                        {/* Status Check / Points Pill */}
                        <div className="shrink-0 text-right">
                          {isAnswered ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                              <span>Awarded: +{q.options[chosenOptIndex].points} pts</span>
                            </span>
                          ) : (
                            <span className="text-xs font-mono font-semibold text-slate-400">
                              Weight: {Math.max(...q.options.map((o) => o.points))} pts max
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Question Title */}
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug font-sans mt-2">
                        {q.text}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed mt-1.5 mb-5 font-normal">
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
                              className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-150 cursor-pointer ${
                                isSelected
                                  ? "bg-emerald-50/70 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20"
                                  : "bg-slate-50/70 hover:bg-slate-100/80 border-slate-200/90 text-slate-900"
                              }`}
                            >
                              {/* Check / Radio indicator */}
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  isSelected
                                    ? "border-emerald-600 bg-emerald-600 text-white"
                                    : "border-slate-300 bg-white"
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
                                        : "text-slate-950"
                                    }`}
                                  >
                                    {opt.text}
                                  </span>
                                  <span
                                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md shrink-0 ${
                                      isSelected
                                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300/80"
                                        : "bg-slate-200/80 text-slate-700 border border-slate-200"
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
                                        : "text-slate-600"
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
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 text-white border-t border-slate-800/90 p-3.5 sm:p-4 backdrop-blur-md shadow-2xl no-print">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block leading-none">
              Live Score
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white leading-none">
                {currentScore}
              </span>
              <span className="text-xs text-slate-400 font-semibold font-mono">/100 PTS</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateClick}
            className="flex-1 max-w-xs px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-sans"
          >
            <span>Generate Client Report</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 4. Sleek On-Site Client WhatsApp Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overscroll-none animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-950 font-sans tracking-tight">
                    Client's WhatsApp Number
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Direct 1-tap dispatch without saving contacts
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPhoneModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-950 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Ask the business owner for their WhatsApp number to deliver their diagnostic summary and report link directly into their chat.
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                10-Digit Mobile Number
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none text-slate-700 font-mono text-xs font-bold border-r border-slate-200 pr-2.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
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
                  className="w-full pl-20 pr-4 py-3.5 rounded-xl border border-slate-250 bg-slate-50 text-base sm:text-sm font-semibold text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white transition-colors shadow-xs font-mono"
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
                className="w-full py-3.5 px-5 rounded-2xl bg-slate-950 hover:bg-black active:bg-slate-900 text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer font-sans"
              >
                <span>Continue to Summary & Share</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => handleConfirmModalPhone(true)}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-500 hover:text-slate-950 transition-colors cursor-pointer text-center"
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
