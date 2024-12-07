"use server";

import { getAuthSupabase } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const mapCategoryToTrainingPart = (category: string) => {
  const categoryMap: Record<string, string> = {
    "허리 운동": "허리",
    "어깨 운동": "어깨",
    "무릎 운동": "무릎",
    "짐볼 활용 운동": "짐볼",
    "밴드 활용 운동": "밴드",
    "맞춤 동영상": "맞춤 동영상",
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

    return NextResponse.json(videos);
  } else if (category === "밴드" || category === "짐볼") {
    const { data: videos, error } = await db
      .from("videos")
      .select("*")
      .eq("support_tool", category);

    return NextResponse.json(videos);
  } else if (category === "맞춤 동영상") {
    const supabase = await getAuthSupabase();
    const { data, error } = await supabase.auth.getUser();

    if (data.user?.email) {
      const { data: training_purpose, error: resultError } = await supabase
        .from("user_info")
        .select("training_purpose")
        .eq("email", data.user.email)
        .single();

      if (training_purpose?.training_purpose === "체중 감량") {
        const { data: videos, error } = await db
          .from("videos")
          .select("*")
          .eq("training_purpose", "체력증진");

        return NextResponse.json(videos);
      } else if (training_purpose?.training_purpose === "근력 증진") {
        const { data: videos, error } = await db
          .from("videos")
          .select("*")
          .eq("training_purpose", "근력강화");

        return NextResponse.json(videos);
      } else if (training_purpose?.training_purpose === "유연성 증진") {
        const { data: videos, error } = await db
          .from("videos")
          .select()
          .eq("training_purpose", "유연성");

        return NextResponse.json(videos);
      }
    } else {
      return NextResponse.json(
        { redirect: "/login" },
        { status: 307 } // 리디렉션 상태 코드 추가
      );
    }
  }
}
