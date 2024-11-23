"use client";

import Link from "next/link";
import Button from "../components/button";
import FormInput from "../components/formInput";
import Header from "../components/header";

import createAccount from "./action";
import { useActionState } from "react";

export default function CreateAccount() {
  const [state, action] = useActionState(createAccount, null);

  return (
    <div>
      <Header />
      <div className=" w-full min-h-screen flex items-center justify-center  pt-10">
        <div className="w-[400px] h-[600px] shadow-xl flex flex-col p-9 ">
          <div className="text-center font-bold text-2xl">회원가입</div>
          <div className="text-center mt-6 font-normal text-sm text-neutral-400">
            회원가입 하고 개인화된 맞춤 동영상을 추천 받으세요!
          </div>
          <form action={action} className="flex flex-col gap-3 mt-9">
            <FormInput
              name="username"
              type="text"
              placeholder="닉네임을 입력하세요"
              required
              errors={state?.fieldErrors.username ?? state?.formErrors ?? []}
            />

            <FormInput
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              required
              errors={state?.fieldErrors.email ?? []}
            />

            <FormInput
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
              errors={state?.fieldErrors.password ?? []}
            />
            <FormInput
              name="confirm_password"
              type="password"
              placeholder="비밀번호를 확인하세요"
              required
              errors={state?.fieldErrors.confirm_password ?? []}
            />
            <div className="mt-6">
              <Button />
            </div>
          </form>
          <div className="mt-14 flex gap-3 justify-center items-center text-sm ">
            <div className=" text-neutral-600">이미 계정이 있으신가요?</div>
            <Link href="/login" className="text-blue-500">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
