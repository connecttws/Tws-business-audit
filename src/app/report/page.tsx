"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ReportHeader } from "@/components/report/ReportHeader";
import { ReportCover } from "@/components/report/ReportCover";
import { ReportBreakdown } from "@/components/report/ReportBreakdown";
import { ReportFindings } from "@/components/report/ReportFindings";
import { ReportActionPlan } from "@/components/report/ReportActionPlan";
import { ReportWhatsAppCta } from "@/components/report/ReportWhatsAppCta";
import { AuditRecord, SAMPLE_AUDIT } from "@/lib/audit-data";
import { resolveAuditAsync } from "@/lib/audit-storage";
import { Loader2 } from "lucide-react";

function ReportContent({ record }: { record: AuditRecord }) {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Executive Cover Banner */}
      <ReportCover record={record} />

      {/* 2. 5-Pillar Score Breakdown */}
      <ReportBreakdown sectionScores={record.sectionScores} />

      {/* 3. Action Plan & Prescribed TWS Solution */}
      <ReportActionPlan record={record} />

      {/* 4. Itemized 16-Point Findings Breakdown */}
      <ReportFindings findings={record.findings} />

      {/* 5. Direct WhatsApp Conversion CTA */}
      <ReportWhatsAppCta record={record} />

      {/* Report Footer */}
      <div className="text-center py-10 text-xs text-slate-400 space-y-1.5 font-mono">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-md bg-slate-900 text-white font-black text-[9px] flex items-center justify-center">
            TWS
          </div>
          <p className="font-extrabold text-slate-700 uppercase tracking-wider text-[11px]">
            Team TWS · Local Business Intelligence & Growth
          </p>
        </div>
        <p className="text-[11px] text-slate-400">
          Confidential Business Diagnostic Report · Ref {record.id}
        </p>
      </div>
    </div>
  );
}

export default function CustomerReportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-950">
      <Suspense
        fallback={
          <div className="min-h-screen flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-7 h-7 text-black animate-spin" />
            <p className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
              Initializing Report Engine...
            </p>
          </div>
        }
      >
        <ReportViewerWrapper />
      </Suspense>
    </div>
  );
}

function ReportViewerWrapper() {
  const searchParams = useSearchParams();
  const [record, setRecord] = useState<AuditRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = searchParams.get("id");
    const payload = searchParams.get("d");

    let isMounted = true;
    setIsLoading(true);

    resolveAuditAsync(id, payload).then((resolved) => {
      if (isMounted) {
        setRecord(resolved);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  if (isLoading || !record) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-7 h-7 text-black animate-spin" />
        <p className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
          Loading Audit Intelligence...
        </p>
      </div>
    );
  }

  return (
    <>
      <ReportHeader record={record} />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-10">
        <ReportContent record={record} />
      </main>
    </>
  );
}
