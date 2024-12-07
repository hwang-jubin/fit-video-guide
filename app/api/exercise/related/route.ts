import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const age_group = await req.nextUrl.searchParams.get("age_group");
  const training_purpose = await req.nextUrl.searchParams.get(
    "training_purpose"
  );
  const support_tool = await req.nextUrl.searchParams.get("support_tool");

  const queryString = [];

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

  try {
    const { data: videos, error } = await db
      .from("videos")
      .select("*")
      .or(query)
      .limit(10);

    // 데이터가 없거나 에러가 발생한 경우
    if (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json(
        { error: "Error fetching data from the database." },
        { status: 500 }
      );
    }

    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error occurred during the request:", error);
    // 504 Timeout 오류를 처리하는 부분
    return NextResponse.json(
      { error: "Request timed out. Please try again later." },
      { status: 504 }
    );
  }
}
