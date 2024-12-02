import getCookie from "@/lib/cookie";
import { getAuthSupabase } from "@/lib/auth";

export default async function tokenGenerate(
  access_token: string,
  refresh_token: string
) {
  const supabase = await getAuthSupabase();
  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
}
