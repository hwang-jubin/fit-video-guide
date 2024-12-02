"use server";

import { getAuthSupabase } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function deleteToken() {
  const cookieStore = cookies();
  (await cookieStore).delete("refresh_token");
  (await cookieStore).delete("access_token");

  const supabase = await getAuthSupabase();
  const sign = supabase.auth.signOut();
  console.log(sign);
}
