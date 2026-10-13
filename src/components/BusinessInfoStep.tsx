"use client";

import React, { useState } from "react";
import {
  Building,
  MapPin,
  Phone,
  Globe,
  User,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { BusinessDetails } from "@/lib/audit-data";

interface BusinessInfoStepProps {
  business: BusinessDetails;
  onChange: (details: Partial<BusinessDetails>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function BusinessInfoStep({
  business,
  onChange,
  onBack,
  onContinue,
}: BusinessInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleValidateAndContinue = () => {
    const errs: Record<string, string> = {};
    if (!business.name.trim()) {
      errs.name = "Business name is required to personalize the report";
    }
    if (!business.locality.trim()) {
      errs.locality = "Locality / Area is required for local radius analysis";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onContinue();
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60 mb-2">
          <span>Step 2 of 4</span>
          <span className="text-blue-300">•</span>
          <span>Business Profile</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
          Tell us about the business.
        </h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Provide essential identifiers. These will appear on the executive cover of the customer diagnostic report.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
        {/* Selected Category Readout */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Selected Vertical:</span>
            <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">
              {business.category}
            </span>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 underline"
          >
            Change
          </button>
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Business Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Building className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={business.name}
              onChange={(e) => {
                onChange({ name: e.target.value });
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              placeholder="e.g. Blue Bottle Cafe, Dr. Mehta Dental Clinic"
              className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-500"
                  : "border-slate-300 bg-white focus:ring-blue-500/20 focus:border-blue-500"
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Locality */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Locality / Area / City <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={business.locality}
              onChange={(e) => {
                onChange({ locality: e.target.value });
                if (errors.locality) setErrors((prev) => ({ ...prev, locality: "" }));
              }}
              placeholder="e.g. Connaught Place, Central Delhi"
              className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 transition-all ${
                errors.locality
                  ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-500"
                  : "border-slate-300 bg-white focus:ring-blue-500/20 focus:border-blue-500"
              }`}
            />
          </div>
          {errors.locality && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.locality}
            </p>
          )}
        </div>

        {/* Contact Phone & Website (2 Cols on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Contact Phone <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={business.phone || ""}
                onChange={(e) => onChange({ phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Website or Maps Link <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Globe className="w-4 h-4" />
              </div>
              <input
                type="url"
                value={business.mapsUrl || ""}
                onChange={(e) => onChange({ mapsUrl: e.target.value })}
                placeholder="https://maps.google.com/..."
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Auditor Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Field Consultant / Auditor Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={business.auditorName || ""}
              onChange={(e) => onChange({ auditorName: e.target.value })}
              placeholder="e.g. Rahul Sharma (Team TWS)"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-2 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleValidateAndContinue}
          className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-blue-600/25 transition-all cursor-pointer"
        >
          <span>Start 16-Point Audit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
