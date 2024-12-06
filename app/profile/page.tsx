"use client";
import { useEffect, useState } from "react";
import Editmode from "./components/editmode";
import DisplayMode from "./components/displaymode";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useStore } from "zustand";

export interface UserInfo {
  email: string;
  nickname: string;

  training_purpose: "체중 감량" | "근력 증진" | "유연성 증진" | null;
}

export default function Profile() {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [editmode, setEditmode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated } = useStore(useAuthStore);
  const router = useRouter();

  const getUser = async () => {
    setIsLoading(true); // 로딩 상태 시작

    //이전 training_purpose를 삭제해서 editmode->displaymode로 넘어갈 때 이전상태를 잠깐 보여주는 오류 해결
    setUserInfo((prev) =>
      prev ? { ...prev, training_purpose: null } : undefined
    );
    const result = await fetch("/api/auth");
    const jsonData = await result.json();
    setUserInfo(jsonData); // 새 데이터 설정
    setIsLoading(false); // 로딩 상태 종료
  };

  useEffect(() => {
    getUser();
  }, [editmode]);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center pt-10">
      <div className="w-[400px] h-[400px] shadow-xl flex flex-col p-9 ">
        <div className="text-center font-extrabold text-2xl">Profile</div>
        {editmode ? (
          <Editmode userInfo={userInfo} setEditmode={setEditmode} />
        ) : (
          <DisplayMode userInfo={userInfo} setEditmode={setEditmode} />
        )}
      </div>
    </div>
  );
}
