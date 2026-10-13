import { AuditRecord, SAMPLE_AUDIT, calculateAudit, BusinessDetails } from "./audit-data";

const STORAGE_PREFIX = "tws_audit_";
const LIST_KEY = "tws_audits_index";

export function saveAuditToStorage(record: AuditRecord): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PREFIX + record.id, JSON.stringify(record));
    
    // Maintain index of audits
    const rawList = localStorage.getItem(LIST_KEY);
    let list: Array<{ id: string; name: string; category: string; date: string; score: number }> = [];
    if (rawList) {
      try {
        list = JSON.parse(rawList);
      } catch {
        list = [];
      }
    }
    // Remove duplicate if exists
    list = list.filter((item) => item.id !== record.id);
    list.unshift({
      id: record.id,
      name: record.business.name,
      category: record.business.category,
      date: record.createdAt,
      score: record.totalScore,
    });
    // Keep last 30
    localStorage.setItem(LIST_KEY, JSON.stringify(list.slice(0, 30)));
  } catch (err) {
    console.error("Failed to save audit to localStorage:", err);
  }
}

export function getAuditFromStorage(id: string): AuditRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + id);
    if (raw) {
      return JSON.parse(raw) as AuditRecord;
    }
  } catch (err) {
    console.error("Failed to read audit from localStorage:", err);
  }
  return null;
}

export function getAuditsList(): Array<{ id: string; name: string; category: string; date: string; score: number }> {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LIST_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read audits index:", err);
  }
  return [];
}

/**
 * Compact encoder to allow full cross-device sharing via URL parameter (?d=...)
 * Enables business owners to view their exact report directly from WhatsApp on another device without a database.
 */
export function encodeAuditForUrl(record: AuditRecord): string {
  try {
    const minified = {
      i: record.id,
      c: record.createdAt,
      b: [
        record.business.name,
        record.business.category,
        record.business.locality,
        record.business.whatsappNumber || record.business.phone || "",
        record.business.mapsUrl || "",
        record.business.auditorName || "",
        record.business.clientName || "",
      ],
      a: record.answers,
    };
    const jsonStr = JSON.stringify(minified);
    if (typeof window !== "undefined") {
      return encodeURIComponent(btoa(encodeURIComponent(jsonStr)));
    }
    return "";
  } catch (err) {
    console.error("Error encoding audit for URL:", err);
    return "";
  }
}

export function decodeAuditFromUrl(payloadStr: string): AuditRecord | null {
  try {
    if (!payloadStr) return null;
    const decodedJson = decodeURIComponent(atob(decodeURIComponent(payloadStr)));
    const minified = JSON.parse(decodedJson);
    
    const business = {
      name: minified.b[0],
      category: minified.b[1],
      locality: minified.b[2],
      phone: minified.b[3],
      whatsappNumber: minified.b[3],
      mapsUrl: minified.b[4],
      auditorName: minified.b[5],
      clientName: minified.b[6] || undefined,
    };
    return calculateAudit(business, minified.a, minified.i);
  } catch (err) {
    console.error("Error decoding audit from URL payload:", err);
    return null;
  }
}

export async function saveAudit(
  business: BusinessDetails,
  answers: Record<string, number>
): Promise<AuditRecord> {
  try {
    const res = await fetch("/api/audits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ business, answers }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.audit) {
        saveAuditToStorage(data.audit);
        return data.audit;
      }
    }
  } catch (err) {
    console.warn("Database save failed, falling back to local storage:", err);
  }

  // Fallback: calculate locally & save to localStorage
  const localRecord = calculateAudit(business, answers);
  saveAuditToStorage(localRecord);
  return localRecord;
}

export async function resolveAuditAsync(
  id?: string | null,
  payload?: string | null
): Promise<AuditRecord> {
  // 1. Try fetching from Database API by ID
  if (id) {
    try {
      const res = await fetch(`/api/audits/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.audit) {
          saveAuditToStorage(data.audit);
          return data.audit;
        }
      }
    } catch (err) {
      console.warn("API lookup failed, falling back:", err);
    }
  }

  // 2. Try URL payload if present
  if (payload) {
    const fromPayload = decodeAuditFromUrl(payload);
    if (fromPayload) {
      saveAuditToStorage(fromPayload);
      return fromPayload;
    }
  }

  // 3. Try Local Storage
  if (id) {
    const fromStorage = getAuditFromStorage(id);
    if (fromStorage) return fromStorage;
  }

  // 4. Fallback
  return SAMPLE_AUDIT;
}

export async function fetchAuditsListFromApi(): Promise<
  Array<{
    id: string;
    name: string;
    category: string;
    locality?: string;
    whatsappNumber?: string;
    date: string;
    score: number;
    bandTitle?: string;
  }>
> {
  try {
    const res = await fetch("/api/audits");
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.audits)) {
        return data.audits;
      }
    }
  } catch (err) {
    console.warn("API fetch failed for audits list:", err);
  }
  return getAuditsList();
}

