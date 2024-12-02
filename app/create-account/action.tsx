/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import z from "zod";

import tokenGenerate from "../components/auth/token-generate";
import { getAuthSupabase } from "@/lib/auth";
const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({ invalid_type_error: "숫자 제외" })
      .min(3, "3자 이상으로 적어주세요")
      .toLowerCase()
      .trim(),
    email: z
      .string()
      .email({ message: "이메일 형식을 확인하세요" })
      .toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ email }, ctx) => {
    const supabase = await getAuthSupabase();
    const { data: duplicated_email, error } = await supabase
      .from("user_info")
      .select("*")
      .eq("email", email);

    if (duplicated_email?.length! > 0) {
      ctx.addIssue({
        code: "custom",
        message: "이미 등록된 이메일 입니다",
        path: ["email"],
        fatal: true,
      });
    }
    return z.NEVER;
  })
  .refine(checkPasswords, {
    message: "비밀번호를 확인하세요",
    path: ["confirm_password"],
  });

// eslint-disable-next-line
export default async function createAccount(
  prevState: any,
  formData: FormData
) {
  const supabase = await getAuthSupabase();
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    purpose: formData.get("purpose"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      error: {
        formEmail: result.error?.formErrors.formErrors || null,
        email: result.error?.formErrors.fieldErrors.email || null,
        username: result.error?.formErrors.fieldErrors.username || null,
        password: result.error?.formErrors.fieldErrors.password || null,
        confirm_password:
          result.error?.formErrors.fieldErrors.confirm_password || null,
      },
    };
  } else {
    const { data: authData, error } = await supabase.auth.signUp({
      email: result.data?.email,
      password: result.data.password,
      options: {
        data: {
          nickname: result.data.username,
          training_purpose: data.purpose,
        },
      },
    });

    if (authData.session) {
      await tokenGenerate(
        authData!.session.access_token,
        authData!.session.refresh_token
      );
    }
    return { success: "성공" };
  }
}
