"use server";

import { getAuthSupabase } from "@/lib/auth";
import { z } from "zod";

const formSchema = z.object({
  nickname: z
    .string({ invalid_type_error: "숫자 제외" })
    .min(3, "3자 이상으로 적어주세요")
    .toLowerCase()
    .trim(),
});

export default async function editUserInfo(formData: FormData) {
  const data = {
    nickname: formData.get("nickname"),
    email: formData.get("email") as string,
    purpose: formData.get("purpose"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (result.success) {
    const supabase = await getAuthSupabase();

    const session = await supabase.auth.getUser();
    console.log(session.data.user?.email);
    const response = await supabase.auth.updateUser({
      email: data.email, // 업데이트할 이메일
      data: {
        nickname: data.nickname, // 닉네임
        training_purpose: data.purpose, // 운동 목표
      },
    });
    const { data: resultData, error } = await supabase
      .from("user_info")
      .update({
        nickname: data.nickname, // 업데이트할 닉네임
        training_purpose: data.purpose, // 업데이트할 운동 목표
      })
      .eq("email", data.email);
  } else {
    return result.error.flatten();
  }
}
