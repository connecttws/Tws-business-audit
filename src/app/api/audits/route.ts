import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateAudit, BusinessDetails } from "@/lib/audit-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { business, answers } = body as {
      business: BusinessDetails;
      answers: Record<string, number>;
    };

    if (!business?.name?.trim()) {
      return NextResponse.json(
        { success: false, error: "Business name is required" },
        { status: 400 }
      );
    }

    if (!business?.locality?.trim()) {
      return NextResponse.json(
        { success: false, error: "Locality / City is required" },
        { status: 400 }
      );
    }

    // Compute complete scores & findings
    const calculated = calculateAudit(business, answers || {});

    // Save to database
    const saved = await prisma.businessAudit.create({
      data: {
        businessName: calculated.business.name.trim(),
        clientName: calculated.business.clientName?.trim() || null,
        slug: calculated.id || null,
        category: calculated.business.category || "Cafe / Restaurant",
        locality: calculated.business.locality.trim(),
        phone: calculated.business.phone || null,
        whatsappNumber: calculated.business.whatsappNumber || calculated.business.phone || null,
        mapsUrl: calculated.business.mapsUrl || null,
        auditorName: calculated.business.auditorName || "Team TWS Field Auditor",

        totalScore: calculated.totalScore,
        maxScore: calculated.maxScore,
        percentage: Math.round((calculated.totalScore / calculated.maxScore) * 100),
        bandTitle: calculated.band.title,
        bandRange: calculated.band.range,
        bandHeadline: calculated.band.headline,
        bandDescription: calculated.band.description,
        sprintRecommendation: calculated.band.sprintRecommendation,
        sprintDetails: calculated.band.sprintDetails,

        mapsScore: calculated.sectionScores.find((s) => s.id === "maps")?.score ?? 0,
        visualsScore: calculated.sectionScores.find((s) => s.id === "visuals")?.score ?? 0,
        webScore: calculated.sectionScores.find((s) => s.id === "web")?.score ?? 0,
        adsScore: calculated.sectionScores.find((s) => s.id === "ads")?.score ?? 0,
        speedScore: calculated.sectionScores.find((s) => s.id === "speed")?.score ?? 0,

        sectionScores: calculated.sectionScores as any,
        answers: calculated.answers as any,
        findings: calculated.findings as any,
      },
    });

    const shortUrl = `/r/${saved.id}`;
    const fullUrl = `/report?id=${saved.id}`;
    const token = Buffer.from(`${saved.id}:${saved.createdAt.getTime()}`).toString("base64");

    return NextResponse.json(
      {
        success: true,
        audit: {
          ...calculated,
          id: saved.id,
          createdAt: saved.createdAt.toISOString(),
        },
        id: saved.id,
        shortUrl,
        fullUrl,
        token,
      },
      {
        headers: {
          "X-Audit-ID": saved.id,
          "X-Audit-Short-URL": shortUrl,
          "X-Audit-Token": token,
        },
      }
    );
  } catch (error: any) {
    console.error("Error creating audit record:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to save audit record to database",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category")?.trim() || "";
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);

    const where: any = {};
    if (search) {
      where.OR = [
        { businessName: { contains: search, mode: "insensitive" } },
        { locality: { contains: search, mode: "insensitive" } },
        { whatsappNumber: { contains: search, mode: "insensitive" } },
      ];
    }
    if (category) {
      where.category = category;
    }

    const records = await prisma.businessAudit.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        businessName: true,
        category: true,
        locality: true,
        whatsappNumber: true,
        totalScore: true,
        bandTitle: true,
        createdAt: true,
        viewCount: true,
      },
    });

    return NextResponse.json({
      success: true,
      audits: records.map((r) => ({
        id: r.id,
        name: r.businessName,
        category: r.category,
        locality: r.locality,
        whatsappNumber: r.whatsappNumber,
        score: r.totalScore,
        bandTitle: r.bandTitle,
        date: r.createdAt.toISOString(),
        viewCount: r.viewCount,
      })),
      total: records.length,
    });
  } catch (error: any) {
    console.error("Error listing audits:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to list audits" },
      { status: 500 }
    );
  }
}
