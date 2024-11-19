import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2dHFpamNheW16aWxsYXN2bGptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDY0Nzc5NiwiZXhwIjoyMDQ2MjIzNzk2fQ.pE_VsjFkYpilVMRY790CNQXa4BMLGQBaGvWU24owKMA";
const BASE_PATH = "https://zvtqijcaymzillasvljm.supabase.co";
const supabase = createClient(BASE_PATH, API_KEY);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const { data: detailExercise, error } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id);
  return NextResponse.json(detailExercise);
}
