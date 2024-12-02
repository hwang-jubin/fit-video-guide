import { getUserInfoFromToken } from "@/app/components/auth/tokenAuthentication";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userData = await getUserInfoFromToken();

  const { data: userInfo, error } = await db
    .from("user_info") // 연결된 테이블 이름
    .select("*")
    .eq("email", userData?.email)
    .single();
  // 결과를 객체로 반환

  return NextResponse.json(userInfo);
}
