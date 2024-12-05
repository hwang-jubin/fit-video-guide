"use server";

import { getAuthSupabase } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function deleteToken() {
  const supabase = await getAuthSupabase();
  const sign = await supabase.auth.signOut();
}
