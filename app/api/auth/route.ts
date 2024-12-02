import { getUserInfoFromToken } from "@/app/components/auth/tokenAuthentication";
import { getAuthSupabase } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userData = await getUserInfoFromToken();

  const db = await getAuthSupabase();

  const { data: userInfo, error } = await db
    .from("user_info") // 연결된 테이블 이름
    .select("*")
    .eq("email", userData?.email)
    .single();

  return NextResponse.json(userInfo);
}
