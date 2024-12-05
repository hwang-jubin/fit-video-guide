"use client";

import Link from "next/link";
import Button from "../../components/button";
import FormInput from "../../components/formInput";

import createAccount from "./action";
import { useActionState, useEffect } from "react";
import { useStore } from "zustand";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const [state, action] = useActionState(createAccount, null);
  const { setLogin } = useStore(useAuthStore);
  const router = useRouter(); // useRouter 훅 사용

  useEffect(() => {
    // 로그인 성공 시 인증 상태 true로 변경
    if (state?.success === "성공") {
      setLogin();
      router.push("/");
    }
  }, [state, setLogin, router]); // state가 변경될 때마다 실행

  return (
    <div>
      <div className=" w-full min-h-screen flex items-center justify-center pt-8">
        <div className="w-[400px] h-[560px] shadow-xl flex flex-col p-9 pt-6 ">
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
              errors={state?.error?.username ?? []}
            />

            <FormInput
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              required
              errors={state?.error?.email ?? []}
            />

            <FormInput
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
              errors={state?.error?.password ?? []}
            />
            <FormInput
              name="confirm_password"
              type="password"
              placeholder="비밀번호를 확인하세요"
              required
              errors={state?.error?.confirm_password ?? []}
            />
            <div className="*:text-sm *:text-neutral-600 flex gap-3 flex-col mt-2 bg-neutral-100 p-6 rounded-md ">
              <div className="text-sm  ">운동 목표</div>
              <div className="grid grid-cols-3">
                <label className="text-sm flex items-center gap-2">
                  <input
                    className="appearance-none w-3 h-3 border border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500"
                    type="radio"
                    name="purpose"
                    value="체중 감량"
                    defaultChecked
                  />
                  <div>체중 감량</div>
                </label>
                <label className="text-sm flex items-center gap-2">
                  <input
                    className="appearance-none w-3 h-3 border border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500"
                    type="radio"
                    name="purpose"
                    value="근력 증진"
                  />
                  <div>근력 증진</div>
                </label>
                <label className="text-sm flex items-center gap-2">
                  <input
                    className="appearance-none w-3 h-3 border border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500"
                    type="radio"
                    name="purpose"
                    value="유연성 증진"
                  />
                  <div>유연성 증진</div>
                </label>
              </div>
            </div>
            <div className="mt-3">
              <Button />
            </div>
          </form>
          <div className="mt-12 flex gap-3 justify-center items-center text-sm ">
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
