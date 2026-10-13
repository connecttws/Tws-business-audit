export interface AnswerOption {
  text: string;
  points: number;
  hint?: string;
}

export interface Question {
  id: string;
  sectionId: string;
  text: string;
  description: string;
  options: AnswerOption[];
}

export interface AuditSection {
  id: string;
  name: string;
  icon: string;
  maxPoints: number;
  questions: Question[];
}

export interface BusinessDetails {
  name: string;
  clientName?: string;
  category: string;
  locality: string;
  phone?: string;
  whatsappNumber?: string;
  mapsUrl?: string;
  auditorName?: string;
}

export function formatTitleCase(input: string): string {
  if (!input) return "";
  return input
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return "";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function cleanPhoneNumber(rawPhone: string): string {
  const digits = (rawPhone || "").replace(/\D/g, "");
  if (digits.length === 10) {
    return "91" + digits;
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return "91" + digits.slice(1);
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits;
  }
  return digits;
}

export function isValidIndianMobile(rawPhone: string): boolean {
  const digits = (rawPhone || "").replace(/\D/g, "");
  if (digits.length === 10) return true;
  if (digits.length === 11 && digits.startsWith("0")) return true;
  if (digits.length === 12 && digits.startsWith("91")) return true;
  return false;
}

export function formatWhatsAppUrl(rawPhone: string, message: string): string {
  const cleanNumber = cleanPhoneNumber(rawPhone);
  const encodedText = encodeURIComponent(message);
  if (cleanNumber && cleanNumber.length >= 10) {
    return `https://wa.me/${cleanNumber}?text=${encodedText}`;
  }
  return `https://wa.me/?text=${encodedText}`;
}

export interface SectionScore {
  id: string;
  name: string;
  icon: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface ScoreBand {
  title: string;
  range: string;
  badgeClass: string;
  accentColor: string;
  headline: string;
  description: string;
  sprintRecommendation: string;
  sprintDetails: string;
}

export interface AuditRecord {
  id: string;
  createdAt: string;
  business: BusinessDetails;
  answers: Record<string, number>; // questionId -> option index
  sectionScores: SectionScore[];
  totalScore: number;
  maxScore: number;
  percentage?: number;
  band: ScoreBand;
  findings: Array<{
    questionText: string;
    chosenOptionText: string;
    pointsAwarded: number;
    maxPoints: number;
    sectionName: string;
    hint?: string;
  }>;
}

export const BUSINESS_CATEGORIES = [
  { name: "Cafe / Restaurant", icon: "Coffee", subtitle: "Maps, ambient visuals, menus & delivery links" },
  { name: "Clinic / Healthcare", icon: "Stethoscope", subtitle: "Local trust, patient reviews & booking flow" },
  { name: "Gym / Fitness", icon: "Dumbbell", subtitle: "Radius reach, trial leads & member retention" },
  { name: "Salon / Beauty", icon: "Sparkles", subtitle: "Visual portfolio, short-form reels & WhatsApp appointments" },
  { name: "Coaching Institute", icon: "GraduationCap", subtitle: "Inquiry response speed, prospectus & proof" },
  { name: "Retail / Boutiques", icon: "ShoppingBag", subtitle: "Map visibility, store photos & local radius ads" },
  { name: "Other Business", icon: "Building2", subtitle: "Custom local business diagnostic" },
];

export const AUDIT_SECTIONS: AuditSection[] = [
  {
    id: "maps",
    name: "Google Maps & Local Search",
    icon: "MapPin",
    maxPoints: 20,
    questions: [
      {
        id: "q1",
        sectionId: "maps",
        text: "Google Business Profile (GBP) status",
        description: "Is the official Google Maps profile claimed, phone/address verified, and kept up-to-date?",
        options: [
          { text: "Claimed & Verified with complete hours & photos", points: 5, hint: "Fully optimized profile helps rank in local map packs" },
          { text: "Incomplete / Outdated info or photos", points: 2, hint: "Missing crucial business details leads to customer drop-off" },
          { text: "Unclaimed / Profile not found on Maps", points: 0, hint: "Critical gap: nearby customers cannot easily locate the business" },
        ],
      },
      {
        id: "q2",
        sectionId: "maps",
        text: "Review count and rating volume",
        description: "How many authentic customer reviews does the business have, and is the rating above 4.2 stars?",
        options: [
          { text: "50+ reviews with strong 4.2★+ rating", points: 5, hint: "Strong social proof builds immediate trust" },
          { text: "20–50 reviews or rating between 3.8★–4.2★", points: 3, hint: "Moderate proof, but easily outranked by top competitors" },
          { text: "Fewer than 20 reviews or rating under 3.8★", points: 0, hint: "Severe credibility gap; customer hesitation is high" },
        ],
      },
      {
        id: "q3",
        sectionId: "maps",
        text: "Owner review response consistency",
        description: "Does the management respond to reviews (both positive & negative) within 48 hours?",
        options: [
          { text: "Replies to all reviews consistently within 48h", points: 5, hint: "Active engagement signals attentive customer service to Google algorithms" },
          { text: "Occasional replies / only responds to complaints", points: 2, hint: "Inconsistent engagement lowers local search ranking momentum" },
          { text: "Never replies to reviews", points: 0, hint: "Missed opportunity to demonstrate active hospitality and care" },
        ],
      },
      {
        id: "q4",
        sectionId: "maps",
        text: "Local 3-Pack Map ranking",
        description: "When searching category keywords nearby (e.g. 'best cafe near me'), does the business show in the Top 3?",
        options: [
          { text: "Ranks in Top 3 Local Map Pack for core keywords", points: 5, hint: "Captures 70%+ of high-intent local search clicks" },
          { text: "Ranks between positions 4–10 (requires clicking 'More Places')", points: 3, hint: "Visible but losing majority of high-converting traffic" },
          { text: "Page 2 or below / Not ranking for relevant queries", points: 0, hint: "Practically invisible to local searchers searching for solutions" },
        ],
      },
    ],
  },
  {
    id: "visuals",
    name: "Visual Trust & Content Shoots",
    icon: "Camera",
    maxPoints: 20,
    questions: [
      {
        id: "q5",
        sectionId: "visuals",
        text: "Photography quality, lighting & ambience",
        description: "Are photos on Google Maps, Instagram, and web professional, high-res, and appetizing/appealing?",
        options: [
          { text: "Studio-grade photography with vibrant lighting & aesthetics", points: 8, hint: "Exceptional visual appetite appeal and instant premium perception" },
          { text: "Staff mobile phone photos with mixed lighting", points: 4, hint: "Passable but fails to wow new customers or convey premium value" },
          { text: "Dull, blurry, dark or very limited photos", points: 0, hint: "Customers judge business quality primarily on visual presentation" },
        ],
      },
      {
        id: "q6",
        sectionId: "visuals",
        text: "Reels & short-form video consistency",
        description: "Does the business publish engaging short-form video content showing ambience, menu, or behind-the-scenes?",
        options: [
          { text: "3+ reels per week with good hook & audio", points: 7, hint: "Regular viral discovery in the local community feed" },
          { text: "1–2 videos per month sporadically", points: 3, hint: "Irregular activity fails to build algorithm momentum" },
          { text: "No video content published", points: 0, hint: "Missing the highest-reach digital acquisition channel today" },
        ],
      },
      {
        id: "q7",
        sectionId: "visuals",
        text: "Visual identity and aesthetic cohesion",
        description: "Is the logo, color palette, typography, and menu design consistent and distinctly branded?",
        options: [
          { text: "Cohesive, modern, and memorable brand identity", points: 5, hint: "Builds long-term brand recall and allows charging premium prices" },
          { text: "Disjointed, outdated or cluttered aesthetic", points: 0, hint: "Dilutes brand value and feels generic against competitors" },
        ],
      },
    ],
  },
  {
    id: "web",
    name: "Web & Lead Funnel",
    icon: "Globe",
    maxPoints: 20,
    questions: [
      {
        id: "q8",
        sectionId: "web",
        text: "Mobile landing page experience & speed",
        description: "Does the business have a mobile-first page that loads in under 2 seconds with a clear call-to-action?",
        options: [
          { text: "Fast mobile page (<2s) with clear primary CTA", points: 8, hint: "Seamless customer conversion with zero friction" },
          { text: "Slow, clunky, or desktop-focused website", points: 4, hint: "High bounce rate; up to 50% of visitors abandon slow pages" },
          { text: "No dedicated website or landing page", points: 0, hint: "100% reliance on third-party aggregators or direct walk-ins" },
        ],
      },
      {
        id: "q9",
        sectionId: "web",
        text: "One-tap direct WhatsApp booking/inquiry flow",
        description: "Can a mobile visitor initiate a WhatsApp chat with a prefilled greeting in one tap?",
        options: [
          { text: "Direct 1-tap WhatsApp button with prefilled message", points: 7, hint: "Highest converting channel in India and local commerce" },
          { text: "Plain phone number displayed (requires manually copying/dialing)", points: 3, hint: "Adds cognitive friction; many mobile users drop off" },
          { text: "No WhatsApp link or chat options available", points: 0, hint: "Major obstacle for spontaneous client inquiries" },
        ],
      },
      {
        id: "q10",
        sectionId: "web",
        text: "Menu / pricing / service catalogue accessibility",
        description: "Can visitors instantly view prices, services, or food menu on mobile without downloading heavy PDFs?",
        options: [
          { text: "Instant, responsive, mobile-friendly digital menu/catalogue", points: 5, hint: "Instant gratification speeds up buying decisions" },
          { text: "Heavy PDF download or must call to inquire about pricing", points: 0, hint: "Customers abandon rather than downloading cumbersome PDFs" },
        ],
      },
    ],
  },
  {
    id: "ads",
    name: "Paid Ads & Market Positioning",
    icon: "TrendingUp",
    maxPoints: 20,
    questions: [
      {
        id: "q11",
        sectionId: "ads",
        text: "Targeted hyperlocal radius advertising (3–5 km)",
        description: "Are Meta (Instagram/Facebook) or Google radius campaigns actively running to nearby residents?",
        options: [
          { text: "Active, targeted radius campaigns running consistently", points: 8, hint: "Predictable customer flow and constant local mindshare" },
          { text: "Occasional boosted posts without structured targeting", points: 4, hint: "Wasted ad budget without conversion optimization" },
          { text: "No active paid ads running", points: 0, hint: "Completely dependent on passive organic foot-traffic" },
        ],
      },
      {
        id: "q12",
        sectionId: "ads",
        text: "Offer & promotion clarity with tracking",
        description: "Does the business promote a compelling hook/offer (e.g., first visit discount, package deal) with tracking?",
        options: [
          { text: "Irresistible offer with tracked WhatsApp/coupon codes", points: 7, hint: "Clear ROI measurement on marketing spend" },
          { text: "Generic offer without clear tracking or urgency", points: 3, hint: "Leaves money on the table; hard to measure what converts" },
          { text: "No clear promotion or offer", points: 0, hint: "Zero incentive for fence-sitters to choose you over a competitor today" },
        ],
      },
      {
        id: "q13",
        sectionId: "ads",
        text: "Competitor differentiation & signature USP",
        description: "Does the business clearly stand out with a signature hook, atmosphere, or unique value proposition?",
        options: [
          { text: "Distinct positioning & clear signature identity", points: 5, hint: "Customers know exactly why to choose this brand" },
          { text: "Similar to nearby competitors with no distinct hook", points: 0, hint: "Forced to compete purely on price and location convenience" },
        ],
      },
    ],
  },
  {
    id: "speed",
    name: "Speed-to-Lead & Retention",
    icon: "Zap",
    maxPoints: 20,
    questions: [
      {
        id: "q14",
        sectionId: "speed",
        text: "First response time to new customer inquiries",
        description: "How quickly does the team answer an online message, DM, or web inquiry?",
        options: [
          { text: "Under 5 minutes (automated greeting + rapid human reply)", points: 8, hint: "78% of leads buy from the business that responds first" },
          { text: "Within 30–60 minutes during business hours", points: 4, hint: "Lead starts cooling down and contacting nearby rivals" },
          { text: "Over 1 hour, next day, or often missed completely", points: 0, hint: "Catastrophic revenue leak: high-intent customers go elsewhere" },
        ],
      },
      {
        id: "q15",
        sectionId: "speed",
        text: "Structured lead follow-up & CRM tracking",
        description: "Is there a systematic process to follow up with inquiries who did not immediately book or buy?",
        options: [
          { text: "Consistent follow-up sequence via WhatsApp/CRM", points: 7, hint: "Recovers 20–35% of indecisive prospective customers" },
          { text: "Ad-hoc manual follow-ups when staff has free time", points: 3, hint: "Leads slip through the cracks without accountability" },
          { text: "Zero follow-up system (one inquiry, then forgotten)", points: 0, hint: "Huge marketing waste; acquiring new leads without maximizing them" },
        ],
      },
      {
        id: "q16",
        sectionId: "speed",
        text: "Repeat customer & retention re-engagement",
        description: "Does the business have a customer database for festival broadcasts, VIP loyalty, or win-back campaigns?",
        options: [
          { text: "Active database with regular segmented re-engagement", points: 5, hint: "Drives high lifetime value (LTV) at zero customer acquisition cost" },
          { text: "No defined retention process or customer list", points: 0, hint: "Constantly paying to re-acquire customers who have already visited" },
        ],
      },
    ],
  },
];

export function getScoreBand(score: number): ScoreBand {
  if (score < 40) {
    return {
      title: "High Leakage",
      range: "0–39",
      badgeClass: "bg-zinc-950 text-zinc-100 border-zinc-800",
      accentColor: "#18181b",
      headline: "Critical Revenue Leakage & Low Online Visibility",
      description: "Significant digital touchpoints are disconnected. Prospective customers in your immediate locality are choosing competitors simply because your digital presence has major discovery and conversion friction.",
      sprintRecommendation: "TWS Local Turnaround Sprint",
      sprintDetails: "Immediate Google Business Profile overhaul, 1-tap WhatsApp lead funnel integration, and a signature high-definition ambient content shoot.",
    };
  }
  if (score < 70) {
    return {
      title: "Growth Opportunity",
      range: "40–69",
      badgeClass: "bg-zinc-900 text-zinc-100 border-zinc-700",
      accentColor: "#27272a",
      headline: "Solid Foundation With Major Conversion Gaps",
      description: "Your business has baseline visibility, but high-intent inquiries are slipping through the cracks due to slow response times, missing mobile funnels, and inconsistent visual storytelling.",
      sprintRecommendation: "TWS Foundation Sprint",
      sprintDetails: "Local SEO 3-Pack rank acceleration, high-impact short-form reel package, and speed-to-lead automated WhatsApp responder.",
    };
  }
  if (score < 90) {
    return {
      title: "Strong Foundation",
      range: "70–89",
      badgeClass: "bg-zinc-900 text-zinc-100 border-zinc-700",
      accentColor: "#3f3f46",
      headline: "High Performing Presence Ready For Scaling",
      description: "You outperform most local competitors in visibility and trust. Fine-tuning paid radius campaigns and customer retention workflows will unlock immediate incremental margin.",
      sprintRecommendation: "TWS Scale & Domination Sprint",
      sprintDetails: "Hyperlocal Meta ad campaigns, automated CRM re-engagement funnels, and review velocity scaling to dominate the top local rank.",
    };
  }
  return {
    title: "Optimized Leader",
    range: "90–100",
    badgeClass: "bg-black text-white border-zinc-600",
    accentColor: "#000000",
    headline: "Category Leader & Market Dominator",
    description: "Your digital presence operates as a well-oiled customer acquisition engine. Maintain review velocity, experiment with brand storytelling, and protect your top market positioning.",
    sprintRecommendation: "TWS Retention & VIP Retainer",
    sprintDetails: "Ongoing VIP retention broadcasts, quarterly creative refresh shoots, and brand defense campaigns.",
  };
}

export function calculateAudit(
  business: BusinessDetails,
  answers: Record<string, number>,
  auditId?: string
): AuditRecord {
  const sectionScores: SectionScore[] = AUDIT_SECTIONS.map((section) => {
    let score = 0;
    section.questions.forEach((q) => {
      const chosenIdx = answers[q.id];
      if (chosenIdx !== undefined && q.options[chosenIdx]) {
        score += q.options[chosenIdx].points;
      }
    });
    return {
      id: section.id,
      name: section.name,
      icon: section.icon,
      score,
      maxScore: section.maxPoints,
      percentage: Math.round((score / section.maxPoints) * 100),
    };
  });

  const totalScore = sectionScores.reduce((sum, s) => sum + s.score, 0);
  const band = getScoreBand(totalScore);

  const findings: AuditRecord["findings"] = [];
  AUDIT_SECTIONS.forEach((section) => {
    section.questions.forEach((q) => {
      const chosenIdx = answers[q.id];
      const opt = chosenIdx !== undefined ? q.options[chosenIdx] : null;
      findings.push({
        questionText: q.text,
        chosenOptionText: opt ? opt.text : "Not answered",
        pointsAwarded: opt ? opt.points : 0,
        maxPoints: Math.max(...q.options.map((o) => o.points)),
        sectionName: section.name,
        hint: opt?.hint,
      });
    });
  });

  const finalId =
    auditId ||
    `TWS-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id: finalId,
    createdAt: new Date().toISOString(),
    business,
    answers,
    sectionScores,
    totalScore,
    maxScore: 100,
    band,
    findings,
  };
}

// Default sample audit for client report demo preview
export const SAMPLE_AUDIT: AuditRecord = {
  id: "TWS-261012-1048",
  createdAt: "2026-10-12T10:30:00.000Z",
  business: {
    name: "Blue Bottle Cafe",
    category: "Cafe / Restaurant",
    locality: "Connaught Place, Central Delhi",
    phone: "+91 98765 43210",
    mapsUrl: "https://maps.google.com/?q=Blue+Bottle+Cafe+CP",
    auditorName: "Team TWS Field Auditor",
  },
  answers: {
    q1: 1, // Incomplete (2 pts)
    q2: 1, // 20-50 reviews (3 pts)
    q3: 1, // Occasional (2 pts)
    q4: 1, // Rank 4-10 (3 pts)
    q5: 1, // Phone photos (4 pts)
    q6: 1, // 1-2 per month (3 pts)
    q7: 1, // Disjointed (0 pts)
    q8: 0, // Fast (8 pts)
    q9: 1, // Plain phone number (3 pts)
    q10: 1, // Hidden (0 pts)
    q11: 1, // Occasional (4 pts)
    q12: 1, // Weak tracking (3 pts)
    q13: 1, // Similar (0 pts)
    q14: 1, // Within an hour (4 pts)
    q15: 1, // Manual (3 pts)
    q16: 1, // No defined process (0 pts)
  },
  sectionScores: [
    { id: "maps", name: "Google Maps & Local Search", icon: "MapPin", score: 10, maxScore: 20, percentage: 50 },
    { id: "visuals", name: "Visual Trust & Content Shoots", icon: "Camera", score: 7, maxScore: 20, percentage: 35 },
    { id: "web", name: "Web & Lead Funnel", icon: "Globe", score: 11, maxScore: 20, percentage: 55 },
    { id: "ads", name: "Paid Ads & Market Positioning", icon: "TrendingUp", score: 7, maxScore: 20, percentage: 35 },
    { id: "speed", name: "Speed-to-Lead & Retention", icon: "Zap", score: 7, maxScore: 20, percentage: 35 },
  ],
  totalScore: 42,
  maxScore: 100,
  band: getScoreBand(42),
  findings: [
    { questionText: "Google Business Profile status", chosenOptionText: "Incomplete / Outdated info or photos", pointsAwarded: 2, maxPoints: 5, sectionName: "Google Maps & Local Search", hint: "Missing crucial business details leads to customer drop-off" },
    { questionText: "Review count and rating volume", chosenOptionText: "20–50 reviews", pointsAwarded: 3, maxPoints: 5, sectionName: "Google Maps & Local Search", hint: "Moderate proof, but easily outranked by top competitors" },
    { questionText: "Owner review response consistency", chosenOptionText: "Occasional replies", pointsAwarded: 2, maxPoints: 5, sectionName: "Google Maps & Local Search", hint: "Inconsistent engagement lowers local search ranking momentum" },
    { questionText: "Local 3-Pack Map ranking", chosenOptionText: "Ranks between positions 4–10", pointsAwarded: 3, maxPoints: 5, sectionName: "Google Maps & Local Search", hint: "Visible but losing majority of high-converting traffic" },
    { questionText: "Photography quality & lighting", chosenOptionText: "Staff mobile phone photos", pointsAwarded: 4, maxPoints: 8, sectionName: "Visual Trust & Content Shoots", hint: "Passable but fails to wow new customers or convey premium value" },
    { questionText: "Reels & short-form video consistency", chosenOptionText: "1–2 per month", pointsAwarded: 3, maxPoints: 7, sectionName: "Visual Trust & Content Shoots", hint: "Irregular activity fails to build algorithm momentum" },
    { questionText: "Visual identity and aesthetic", chosenOptionText: "Disjointed / outdated", pointsAwarded: 0, maxPoints: 5, sectionName: "Visual Trust & Content Shoots", hint: "Dilutes brand value and feels generic against competitors" },
    { questionText: "Mobile landing page experience", chosenOptionText: "Fast mobile page (<2s)", pointsAwarded: 8, maxPoints: 8, sectionName: "Web & Lead Funnel", hint: "Seamless customer conversion with zero friction" },
    { questionText: "One-tap direct WhatsApp flow", chosenOptionText: "Plain phone number displayed", pointsAwarded: 3, maxPoints: 7, sectionName: "Web & Lead Funnel", hint: "Adds cognitive friction; many mobile users drop off" },
    { questionText: "Menu / pricing accessibility", chosenOptionText: "Hidden or heavy PDF download", pointsAwarded: 0, maxPoints: 5, sectionName: "Web & Lead Funnel", hint: "Customers abandon rather than downloading cumbersome PDFs" },
    { questionText: "Targeted radius ads (3–5 km)", chosenOptionText: "Occasional boosted posts", pointsAwarded: 4, maxPoints: 8, sectionName: "Paid Ads & Market Positioning", hint: "Wasted ad budget without conversion optimization" },
    { questionText: "Offer & promotion clarity", chosenOptionText: "Generic offer with weak tracking", pointsAwarded: 3, maxPoints: 7, sectionName: "Paid Ads & Market Positioning", hint: "Leaves money on the table; hard to measure what converts" },
    { questionText: "Competitor differentiation", chosenOptionText: "Similar to competitors", pointsAwarded: 0, maxPoints: 5, sectionName: "Paid Ads & Market Positioning", hint: "Forced to compete purely on price and location convenience" },
    { questionText: "First response time to new inquiries", chosenOptionText: "Within 30–60 minutes", pointsAwarded: 4, maxPoints: 8, sectionName: "Speed-to-Lead & Retention", hint: "Lead starts cooling down and contacting nearby rivals" },
    { questionText: "Structured lead follow-up", chosenOptionText: "Ad-hoc manual follow-ups", pointsAwarded: 3, maxPoints: 7, sectionName: "Speed-to-Lead & Retention", hint: "Leads slip through the cracks without accountability" },
    { questionText: "Repeat customer & retention", chosenOptionText: "No defined retention process", pointsAwarded: 0, maxPoints: 5, sectionName: "Speed-to-Lead & Retention", hint: "Constantly paying to re-acquire customers who have already visited" },
  ],
};
