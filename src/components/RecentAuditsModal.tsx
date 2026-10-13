"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, ExternalLink, Building, Search, Loader2 } from "lucide-react";
import { fetchAuditsListFromApi } from "@/lib/audit-storage";

interface RecentAuditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecentAuditsModal({ isOpen, onClose }: RecentAuditsModalProps) {
  const [list, setList] = useState<
    Array<{
      id: string;
      name: string;
      category: string;
      locality?: string;
      whatsappNumber?: string;
      date: string;
      score: number;
      bandTitle?: string;
      viewCount?: number;
    }>
  >([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetchAuditsListFromApi()
        .then((data) => {
          setList(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = list.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.locality && item.locality.toLowerCase().includes(q)) ||
      (item.whatsappNumber && item.whatsappNumber.includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black uppercase tracking-wider text-zinc-950 font-sans">
              Client Audit Records
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Historical database records & client diagnostics
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-zinc-100 text-zinc-400 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3 border-b border-zinc-100 bg-zinc-50/70">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by business, locality, or category..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-200 bg-white text-base sm:text-xs font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-2.5 flex-1">
          {isLoading ? (
            <div className="text-center py-12 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 text-black animate-spin" />
              <p className="text-xs text-zinc-400 font-mono">Loading records...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <Building className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-zinc-800">
                {search ? "No matching audits found" : "No Audits Recorded"}
              </p>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                {search
                  ? "Try searching with a different business name or category."
                  : "Completed business audits will automatically appear here."}
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-zinc-900 truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500 font-mono text-[11px]">
                    <span className="truncate">{item.locality || item.id}</span>
                    <span>•</span>
                    <span className="shrink-0">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-base font-black font-mono text-zinc-950">
                      {item.score}
                    </span>
                    <span className="text-xs text-zinc-400">/100</span>
                  </div>

                  <Link
                    href={`/report?id=${item.id}`}
                    onClick={onClose}
                    className="p-2 rounded-xl bg-zinc-100 hover:bg-black text-zinc-800 hover:text-white transition-colors cursor-pointer"
                    title="Open Report"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between text-xs">
          <span className="text-zinc-500 font-mono text-[11px]">
            {list.length} {list.length === 1 ? "audit" : "audits"} recorded
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 font-bold text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
