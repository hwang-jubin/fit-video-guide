import db from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET() {
  const { data: videos, error } = await db.from("videos").select("*");

  return NextResponse.json(videos);
}
