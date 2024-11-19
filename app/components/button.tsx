"use client";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  isSuccess: boolean; // isSuccess를 prop으로 받도록 정의
}

const Button = () => {
  const { pending } = useFormStatus(); // pending 상태를 가져옵니다.
  const path = usePathname();
  console.log(path);
  return (
    <button
      className={`w-full py-2 rounded-full text-center 
      ${pending ? "bg-neutral-400" : "bg-neutral-200"}
                 disabled:cursor-not-allowed active:scale-95`}
      disabled={pending}
      type="submit"
    >
      {pending ? "Loading..." : path === "/login" ? "로그인" : "회원가입"}
    </button>
  );
};

export default Button;
