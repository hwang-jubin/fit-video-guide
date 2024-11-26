/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { useCookies } from "next-client-cookies";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";

import z from "zod";

import db from "@/lib/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getCookie from "@/lib/cookie";

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
      .string({ invalid_type_error: "Username must be a string!" })
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
    const { data: duplicated_email, error } = await db
      .from("user_info")
      .select("*")
      .eq("email", email);

    console.log(duplicated_email);
    if (error) {
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
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

// eslint-disable-next-line
export default async function createAccount(
  prevState: any,
  formData: FormData
) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.safeParseAsync(data);
  console.log(result.success);

  if (!result.success) {
    return result.error.flatten();
  } else {
    //
    const { data: authData, error } = await db.auth.signUp({
      email: result.data?.email,
      password: result.data.password,
      options: {
        data: {
          nickname: result.data.username, // 추가 메타데이터
        },
      },
    });

    //   const { data:userDetail, error:userDetailError } = await db
    // .from('user_info')
    // .insert({
    //   id: data.user.id,
    //   email: data.user.email,
    //   nickname: userForm.nickname,
    //   age: userForm.age,
    //   height: userForm.height,
    //   weight: userForm.weight,
    //   training_purpose: userForm.trainingPurpose, # muscle_gain, weight_loss, increased_flexibility
    // })

    // 쿠키 설정
    const cookieStore = getCookie();
    (await cookieStore).set("access_token", authData!.session!.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7일간 유지
    });

    console.log(authData.session?.access_token);

    redirect("/");
  }
}
