import db from "@/lib/db";
import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const { data: detailExercise, error } = await db
    .from("videos")
    .select("*")
    .eq("id", id);
  return NextResponse.json(detailExercise);
}
