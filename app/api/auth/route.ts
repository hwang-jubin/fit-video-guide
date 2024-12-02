import { getUserInfoFromToken } from "@/app/components/auth/tokenAuthentication";
import { getAuthSupabase } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await getAuthSupabase();

  const user = await supabase.auth.getUser();

  const email = user.data.user?.email;
  const { data: userInfo, error } = await supabase
    .from("user_info") // 연결된 테이블 이름
    .select("*")
    .eq("email", email)
    .single();

  return NextResponse.json(userInfo);
}
