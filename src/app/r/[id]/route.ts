import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const baseUrl = req.nextUrl.origin;

  if (!id) {
    return NextResponse.redirect(new URL("/", baseUrl));
  }

  const destination = new URL(`/report?id=${encodeURIComponent(id)}`, baseUrl);
  const response = NextResponse.redirect(destination, 307);
  response.headers.set("X-Audit-ID", id);
  response.headers.set("X-Audit-Short-URL", `/r/${id}`);
  response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  return response;
}
