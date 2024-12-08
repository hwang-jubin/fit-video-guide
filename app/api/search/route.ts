import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const query = await req.nextUrl.searchParams.get("query");
  const page = await Number(req.nextUrl.searchParams.get("page"));
  const pageSize = 12;

  const { data, error } = await db
    .from("videos")
    .select()
    .textSearch("search_vector", `${query}`)
    .range((page - 1) * pageSize, page * pageSize - 1);
  return NextResponse.json(data);
}
