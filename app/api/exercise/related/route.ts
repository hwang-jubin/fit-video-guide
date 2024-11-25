import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const age_group = await req.nextUrl.searchParams.get("age_group");
  const training_purpose = await req.nextUrl.searchParams.get(
    "training_purpose"
  );
  const support_tool = await req.nextUrl.searchParams.get("support_tool");

  const queryString = [];

  //   console.log(`age_group=${age_group}`);
  //   console.log(`training_purpose=${training_purpose}`);
  //   console.log(`support_tool=${support_tool}`);

  if (age_group !== "null") {
    queryString.push(`age_group.eq.${age_group}`);
  }

  if (training_purpose !== "null") {
    queryString.push(`training_purpose.eq.${training_purpose}`);
  }

  if (support_tool !== "null") {
    queryString.push(`support_tool.eq.${support_tool}`);
  }

  const query = queryString.join(",");

  const { data: videos, error } = await db
    .from("videos")
    .select("*")
    .or(query)
    // .order("RANDOM()")
    .limit(10);

  return NextResponse.json(videos);
}
