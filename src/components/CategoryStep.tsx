"use client";

import React, { useState } from "react";
import {
  Coffee,
  Stethoscope,
  Dumbbell,
  Sparkles,
  GraduationCap,
  ShoppingBag,
  Building2,
  ArrowRight,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { BUSINESS_CATEGORIES } from "@/lib/audit-data";

interface CategoryStepProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onContinue: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Coffee: <Coffee className="w-5 h-5" />,
  Stethoscope: <Stethoscope className="w-5 h-5" />,
  Dumbbell: <Dumbbell className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
};

export function CategoryStep({
  selectedCategory,
  onSelectCategory,
  onContinue,
}: CategoryStepProps) {
  const [customCategory, setCustomCategory] = useState("");
  const [isCustom, setIsCustom] = useState(
    selectedCategory !== "" &&
      !BUSINESS_CATEGORIES.some((c) => c.name === selectedCategory)
  );

  const handleChoose = (name: string) => {
    if (name === "Other Business") {
      setIsCustom(true);
      if (customCategory.trim()) {
        onSelectCategory(customCategory.trim());
      } else {
        onSelectCategory("Other Business");
      }
    } else {
      setIsCustom(false);
      onSelectCategory(name);
    }
  };

  const handleCustomChange = (val: string) => {
    setCustomCategory(val);
    onSelectCategory(val.trim() || "Other Business");
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60 mb-2">
          <span>Step 1 of 4</span>
          <span className="text-blue-300">•</span>
          <span>Category Selector</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
          What type of business are you visiting?
        </h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Select the client’s industry vertical to calibrate audit benchmarks and diagnostic insights.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BUSINESS_CATEGORIES.map((cat) => {
          const isSelected =
            (isCustom && cat.name === "Other Business") ||
            (!isCustom && selectedCategory === cat.name);

          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => handleChoose(cat.name)}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-blue-50/70 border-blue-500 shadow-sm shadow-blue-500/10 ring-2 ring-blue-500/20"
                  : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50 shadow-sm"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {ICON_MAP[cat.icon] || <Building2 className="w-5 h-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`font-bold text-sm tracking-tight ${
                      isSelected ? "text-blue-900" : "text-slate-900"
                    }`}
                  >
                    {cat.name}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Category input if other */}
      {isCustom && (
        <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 animate-fadeIn">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Specify Custom Business Category
          </label>
          <input
            type="text"
            value={customCategory}
            onChange={(e) => handleCustomChange(e.target.value)}
            placeholder="e.g. Dental Clinic, Pet Care, Dance Academy"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
          />
        </div>
      )}

      {/* Trust & Duration bar */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100/70 text-slate-600 text-xs">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>Estimated audit time: <strong>3–5 minutes</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>16 Standard Diagnostic Points</span>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition-all cursor-pointer"
        >
          <span>Continue to Business Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
