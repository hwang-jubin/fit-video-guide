import { getAuthSupabase } from "@/lib/auth";

import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await getAuthSupabase();

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();

  const email = sessionData.user?.email;
  const { data: userInfo, error } = await supabase
    .from("user_info")
    .select("*")
    .eq("email", email)
    .single();

  return NextResponse.json(userInfo);
}
