"use server";

import db from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

const mapCategoryToTrainingPart = (category: string) => {
  const categoryMap: Record<string, string> = {
    "허리 운동": "허리",
    "가슴 운동": "가슴",
    "어깨 운동": "어깨",
    "무릎 운동": "무릎",
    "짐볼 활용 운동": "짐볼",
    "밴드 활용 운동": "밴드",
  };

  return categoryMap[category] || "default";
};

export async function GET(req: NextRequest) {
  const queryString = await req.nextUrl.searchParams.get("category");
  const category = mapCategoryToTrainingPart(queryString as string);

  if (category === "default") {
    const { data: videos, error } = await db.from("videos").select("*");

    return NextResponse.json(videos);
  } else if (
    category === "허리" ||
    category === "무릎" ||
    category === "어깨"
  ) {
    const { data: videos, error } = await db
      .from("videos")
      .select("*")
      .eq("training_part", category);

    console.log(videos);
    return NextResponse.json(videos);
  } else {
    const { data: videos, error } = await db
      .from("videos")
      .select("*")
      .eq("support_tool", category);

    return NextResponse.json(videos);
  }
}
