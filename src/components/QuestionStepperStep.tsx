"use client";

import React, { useMemo } from "react";
import {
  MapPin,
  Camera,
  Globe,
  TrendingUp,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Award,
} from "lucide-react";
import { AUDIT_SECTIONS, Question } from "@/lib/audit-data";

interface QuestionStepperStepProps {
  currentIndex: number;
  answers: Record<string, number>;
  onAnswer: (questionId: string, optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onJumpToIndex: (index: number) => void;
}

const SECTION_ICON_MAP: Record<string, React.ReactNode> = {
  maps: <MapPin className="w-4 h-4 text-blue-600" />,
  visuals: <Camera className="w-4 h-4 text-purple-600" />,
  web: <Globe className="w-4 h-4 text-emerald-600" />,
  ads: <TrendingUp className="w-4 h-4 text-amber-600" />,
  speed: <Zap className="w-4 h-4 text-rose-600" />,
};

export function QuestionStepperStep({
  currentIndex,
  answers,
  onAnswer,
  onNext,
  onPrev,
  onJumpToIndex,
}: QuestionStepperStepProps) {
  // Flatten all 16 questions in order
  const allQuestions = useMemo(() => {
    const list: Array<{
      q: Question;
      sectionName: string;
      sectionId: string;
      sectionIndex: number;
      questionInSecIndex: number;
      sectionTotalQuestions: number;
    }> = [];

    AUDIT_SECTIONS.forEach((section, sIdx) => {
      section.questions.forEach((q, qIdx) => {
        list.push({
          q,
          sectionName: section.name,
          sectionId: section.id,
          sectionIndex: sIdx + 1,
          questionInSecIndex: qIdx + 1,
          sectionTotalQuestions: section.questions.length,
        });
      });
    });
    return list;
  }, []);

  const currentItem = allQuestions[currentIndex];
  const currentQuestion = currentItem.q;
  const selectedOptionIdx = answers[currentQuestion.id];
  const isAnswered = selectedOptionIdx !== undefined;

  // Compute running score
  const runningScore = useMemo(() => {
    let sum = 0;
    allQuestions.forEach(({ q }) => {
      const idx = answers[q.id];
      if (idx !== undefined && q.options[idx]) {
        sum += q.options[idx].points;
      }
    });
    return sum;
  }, [allQuestions, answers]);

  const totalQuestions = allQuestions.length; // 16
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="space-y-5">
      {/* Top Status & Running Score Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 font-heading">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium">
              Section {currentItem.sectionIndex} of 5
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200/60">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Running Score: {runningScore}/100</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Section Pill Badge */}
        <div className="flex items-center gap-2 pt-1">
          <div className="p-1 rounded-md bg-slate-100">
            {SECTION_ICON_MAP[currentItem.sectionId]}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold text-slate-700 block truncate">
              {currentItem.sectionName}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-semibold">
            Point {currentItem.questionInSecIndex}/{currentItem.sectionTotalQuestions}
          </span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-5 animate-fadeIn">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug font-heading">
              {currentQuestion.text}
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0 border border-slate-200">
              Max {Math.max(...currentQuestion.options.map((o) => o.points))} pts
            </span>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
            {currentQuestion.description}
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 pt-1">
          {currentQuestion.options.map((opt, optIdx) => {
            const isSelected = selectedOptionIdx === optIdx;
            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => onAnswer(currentQuestion.id, optIdx)}
                className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-emerald-50/80 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20"
                    : "bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50"
                }`}
              >
                {/* Custom Radio Button */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-zinc-300 bg-white"
                  }`}
                >
                  {isSelected ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                  )}
                </div>

                {/* Option text & hint */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-sm font-bold tracking-tight ${
                        isSelected ? "text-emerald-950" : "text-zinc-900"
                      }`}
                    >
                      {opt.text}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        opt.points > 4
                          ? "bg-emerald-100/70 text-emerald-800"
                          : opt.points > 0
                          ? "bg-amber-100/70 text-amber-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      +{opt.points} pts
                    </span>
                  </div>

                  {opt.hint && (
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {opt.hint}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mini Question Nav Dots / Quick Jump */}
      <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-1 overflow-x-auto">
        {allQuestions.map((item, idx) => {
          const answered = answers[item.q.id] !== undefined;
          const isCurrent = currentIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onJumpToIndex(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                isCurrent
                  ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/30"
                  : answered
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                  : "bg-slate-100 text-slate-400 hover:bg-slate-200"
              }`}
              title={`Jump to Q${idx + 1}: ${item.q.text}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="pt-2 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!isAnswered}
          className={`px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer ${
            isAnswered
              ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-600/25"
              : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
          }`}
        >
          <span>
            {currentIndex === totalQuestions - 1
              ? "Calculate Score & Finish"
              : "Next Question"}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
