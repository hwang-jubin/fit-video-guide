/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";

import z from "zod";

import db from "@/lib/db";
import { redirect } from "next/navigation";

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
    // console.log(existEmail?.email);
    // console.log(error?.message);

    // if (existEmail) {
    //   ctx.addIssue({
    //     code: "custom",
    //     message: "This email is already taken",
    //     path: ["email"],
    //     fatal: true,
    //   });
    // }
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
    const { data: existEmail, error } = await db
      .from("users")
      .select("email")
      .eq("email", result.data.email)
      .single();
    console.log(`error:${error?.message}`);
    if (error?.message) {
      // return error.message
    }
    // const {
    //   data: { user },
    // } = await db.auth.getUser();
    console.log(existEmail?.email);
    // redirect("/");
  }
}
