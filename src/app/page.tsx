"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AuditorNav } from "@/components/AuditorNav";
import { ContinuousQuestionnaire } from "@/components/ContinuousQuestionnaire";
import { AuditCompleteStep } from "@/components/AuditCompleteStep";
import { RecentAuditsModal } from "@/components/RecentAuditsModal";
import {
  BusinessDetails,
  AUDIT_SECTIONS,
  calculateAudit,
  AuditRecord,
} from "@/lib/audit-data";
import { saveAudit, getAuditsList } from "@/lib/audit-storage";

export default function FieldAuditorPage() {
  const [business, setBusiness] = useState<BusinessDetails>({
    name: "",
    clientName: "",
    category: "Cafe / Restaurant",
    locality: "",
    phone: "",
    mapsUrl: "",
    auditorName: "Team TWS Field Auditor",
  });

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completedRecord, setCompletedRecord] = useState<AuditRecord | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Compute live score dynamically as answers are selected
  const liveScore = useMemo(() => {
    let sum = 0;
    AUDIT_SECTIONS.forEach((section) => {
      section.questions.forEach((q) => {
        const chosenIdx = answers[q.id];
        if (chosenIdx !== undefined && q.options[chosenIdx]) {
          sum += q.options[chosenIdx].points;
        }
      });
    });
    return sum;
  }, [answers]);

  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    setHistoryCount(getAuditsList().length);
  }, [completedRecord]);

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleBusinessChange = (fields: Partial<BusinessDetails>) => {
    setBusiness((prev) => ({ ...prev, ...fields }));
  };

  const handleGenerateReport = async () => {
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

    setIsSaving(true);
    try {
      const record = await saveAudit(business, answers);
      setCompletedRecord(record);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Error saving audit:", err);
      const fallbackRecord = calculateAudit(business, answers);
      setCompletedRecord(fallbackRecord);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetAudit = () => {
    setBusiness({
      name: "",
      clientName: "",
      category: "Cafe / Restaurant",
      locality: "",
      phone: "",
      mapsUrl: "",
      auditorName: "Team TWS Field Auditor",
    });
    setAnswers({});
    setCompletedRecord(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-950">
      {/* Pinned Top Bar with Live Calculated Score */}
      <AuditorNav
        businessName={business.name}
        category={business.category}
        currentScore={liveScore}
        maxScore={100}
        answeredCount={answeredCount}
        totalQuestions={16}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={historyCount}
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 sm:py-8">
        {!completedRecord ? (
          <ContinuousQuestionnaire
            business={business}
            onBusinessChange={handleBusinessChange}
            answers={answers}
            onAnswer={handleAnswer}
            onGenerateReport={handleGenerateReport}
            currentScore={liveScore}
          />
        ) : (
          <AuditCompleteStep
            record={completedRecord}
            onReviewAnswers={() => {
              if (completedRecord?.business.whatsappNumber) {
                setBusiness((prev) => ({
                  ...prev,
                  whatsappNumber: completedRecord.business.whatsappNumber,
                  phone: completedRecord.business.whatsappNumber,
                }));
              }
              setCompletedRecord(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onReset={handleResetAudit}
          />
        )}
      </main>

      <RecentAuditsModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      {/* Modern Refined Footer */}
      <footer className="py-8 border-t border-slate-200/90 bg-white text-center text-xs text-slate-400 no-print space-y-1">
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 rounded bg-slate-950 text-white font-black text-[8px] flex items-center justify-center">
            TWS
          </div>
          <p className="font-mono font-bold tracking-wider uppercase text-[11px] text-slate-600">
            TWS Local Business Intelligence · Field Diagnostic Suite v2.0
          </p>
        </div>
        <p className="text-[10px] text-slate-400 font-mono">
          Proprietary 5-Pillar Local Algorithm
        </p>
      </footer>
    </div>
  );
}
