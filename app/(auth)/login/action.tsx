/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";

import { z } from "zod";

import { getAuthSupabase } from "@/lib/auth";
import tokenGenerate from "@/app/components/auth/token-generate";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "이메일 형식을 확인하세요" })
    .toLowerCase(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export default async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Validate the form data using zod schema
  const result = await formSchema.safeParseAsync(data);

  const db = await getAuthSupabase();

  if (!result.success) {
    console.log(result.error);
    return {
      error: {
        formEmail: result.error?.formErrors.formErrors || null,
        email: result.error?.formErrors.fieldErrors.email || null,
        password: result.error?.formErrors.fieldErrors.password || null,
      },
    };
  } else {
    const { data: authData, error } = await db.auth.signInWithPassword({
      email: result.data.email,
      password: result.data.password,
    });

    if (authData.user) {
      const result = await tokenGenerate(
        authData.session.access_token,
        authData.session.refresh_token
      );
      // const sessionResult = await db.auth.setSession({
      //   access_token: authData.session.access_token,
      //   refresh_token: authData.session.refresh_token,
      // });

      // const session = await getSession();
      // console.log(session?.error);
      return { success: "성공" };
    } else {
      return {
        error: {
          loginFail: "계정 정보가 없습니다!",
        },
      };
    }
  }
}
