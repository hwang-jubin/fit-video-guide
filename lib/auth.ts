import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2dHFpamNheW16aWxsYXN2bGptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDY0Nzc5NiwiZXhwIjoyMDQ2MjIzNzk2fQ.pE_VsjFkYpilVMRY790CNQXa4BMLGQBaGvWU24owKMA";
const BASE_PATH = "https://zvtqijcaymzillasvljm.supabase.co";

export async function getAuthSupabase() {
  const cookieStore = await cookies();

  return createServerClient(BASE_PATH, API_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {}
      },
    },
  });
}
