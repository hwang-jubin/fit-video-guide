import { createClient } from "@supabase/supabase-js";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2dHFpamNheW16aWxsYXN2bGptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDY0Nzc5NiwiZXhwIjoyMDQ2MjIzNzk2fQ.pE_VsjFkYpilVMRY790CNQXa4BMLGQBaGvWU24owKMA";
const BASE_PATH = "https://zvtqijcaymzillasvljm.supabase.co";
export const db = createClient(BASE_PATH, API_KEY);
