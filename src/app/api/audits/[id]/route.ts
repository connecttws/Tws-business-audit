import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuditRecord } from "@/lib/audit-data";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Audit ID is required" },
        { status: 400 }
      );
    }

    // Find audit record by id or slug
    const record = await prisma.businessAudit.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!record) {
      return NextResponse.json(
        { success: false, error: "Audit record not found" },
        { status: 404 }
      );
    }

    // Asynchronously increment view count without blocking response
    prisma.businessAudit
      .update({
        where: { id: record.id },
        data: {
          viewCount: { increment: 1 },
          lastViewedAt: new Date(),
        },
      })
      .catch((err) => console.error("Error updating view count:", err));

    const formatted: AuditRecord = {
      id: record.id,
      createdAt: record.createdAt.toISOString(),
      business: {
        name: record.businessName,
        clientName: record.clientName || undefined,
        category: record.category,
        locality: record.locality,
        phone: record.phone || undefined,
        whatsappNumber: record.whatsappNumber || undefined,
        mapsUrl: record.mapsUrl || undefined,
        auditorName: record.auditorName,
      },
      answers: record.answers as Record<string, number>,
      totalScore: record.totalScore,
      maxScore: record.maxScore,
      percentage: record.percentage,
      band: {
        title: record.bandTitle,
        range: record.bandRange,
        badgeClass: "bg-white text-black border-white",
        accentColor: "emerald",
        headline: record.bandHeadline,
        description: record.bandDescription,
        sprintRecommendation: record.sprintRecommendation,
        sprintDetails: record.sprintDetails,
      },
      sectionScores: record.sectionScores as any,
      findings: record.findings as any,
    };

    const token = Buffer.from(`${record.id}:${record.createdAt.getTime()}`).toString("base64");
    const shortUrl = `/r/${record.id}`;
    const fullUrl = `/report?id=${record.id}`;

    return NextResponse.json(
      {
        success: true,
        audit: formatted,
        shortUrl,
        fullUrl,
        token,
      },
      {
        headers: {
          "X-Audit-ID": record.id,
          "X-Audit-Token": token,
          "X-Audit-Short-URL": shortUrl,
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error: any) {
    console.error("Error retrieving audit record:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to retrieve audit" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const data: any = {};
    if (body.whatsappNumber !== undefined) {
      data.whatsappNumber = body.whatsappNumber;
      data.phone = body.whatsappNumber;
    }
    if (body.status !== undefined) {
      data.status = body.status;
    }

    const updated = await prisma.businessAudit.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      id: updated.id,
      whatsappNumber: updated.whatsappNumber,
    });
  } catch (error: any) {
    console.error("Error updating audit:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update audit" },
      { status: 500 }
    );
  }
}
