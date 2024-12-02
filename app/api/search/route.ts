import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const query = await req.nextUrl.searchParams.get("query");

  const { data, error } = await db
    .from("videos")
    .select()
    .textSearch("search_vector", `${query}`);
  return NextResponse.json(data);
}
