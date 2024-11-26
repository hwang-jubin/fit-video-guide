"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import getCookie from "@/lib/cookie";
import db from "@/lib/db";
import { redirect } from "next/navigation";

import { z } from "zod";

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

    const token = authData.session?.access_token;
    console.log(token);
    if (authData.user) {
      const cookieStore = getCookie();
      const cookieResult = (await cookieStore).set(
        "access_token",
        authData.session.access_token,
        {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7일간 유지
        }
      );

      console.log(cookieResult.get);
      redirect("/");
    } else {
      return {
        error: {
          loginFail: "계정 정보가 없습니다!",
        },
      };
    }
  }
}
