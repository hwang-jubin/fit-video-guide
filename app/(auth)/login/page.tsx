"use client";

import Link from "next/link";

import { useActionState, useEffect } from "react";
import login from "./action";
import { useStore } from "zustand";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import FormInput from "@/app/components/formInput";
import Button from "@/app/components/button";

export default function Login() {
  const [state, action] = useActionState(login, null);
  const { setLogin } = useStore(useAuthStore);
  const router = useRouter(); // useRouter 훅 사용

  // //login 시에 state를 true로. logout 하면 false 로 해주는 로직 작성해야 함
  useEffect(() => {
    // 로그인 성공 시 인증 상태 true로 변경
    if (state?.success === "성공") {
      setLogin();
      router.push("/");
    }
  }, [state, setLogin, router]); // state가 변경될 때마다 실행

  return (
    <div>
      <div className=" w-full min-h-screen flex items-center justify-center  pt-10">
        <div className="w-[400px] h-[500px] shadow-xl flex flex-col p-9 ">
          <div className="text-center font-bold text-2xl">로그인</div>
          <div className="text-center mt-6 font-normal text-sm text-neutral-400">
            로그인 하고 개인화된 맞춤 동영상을 추천 받으세요!
          </div>
          <form action={action} className="flex flex-col gap-3 mt-9">
            <div className=" flex flex-col ">
              <FormInput
                name="email"
                type="email"
                placeholder="이메일을 입력하세요"
                required
                errors={state?.error?.email ?? []}
              />
            </div>
            <div>
              <FormInput
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                required
                errors={state?.error?.password ?? []}
              />
            </div>
            <Button />
            {state?.error?.loginFail ? (
              <div className="text-red-500 text-sm text-center">
                {state?.error.loginFail}
              </div>
            ) : null}
          </form>
          <div className="flex justify-center items-center mt-11  text-sm text-neutral-600">
            <div>계정이 없으신가요?</div>
            <Link href="/create-account" className="text-blue-500 ml-3">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
