"use client";

import { useEffect, useState } from "react";
import Editmode from "./components/editmode";
import DisplayMode from "./components/displaymode";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useStore } from "zustand";

export interface UserInfo {
  id: string;
  email: string;
  nickname: string;
  height: number | null;
  weight: number | null;
  age: number | null;
  training_purpose: "체중 감량" | "근력 증진" | "유연성 증진" | null;
}

export default function Profile() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [editmode, setEditmode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated, setLogin } = useStore(useAuthStore);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const result = await fetch("/api/auth");
      const jsonData = await result.json();

      setUserInfo(jsonData);
      setIsLoading(false);
    };
    getUser();
  }, [editmode]);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/");
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className=" *:text-neutral-600 w-full min-h-screen flex items-center justify-center pt-10">
        <div className="w-[400px] h-[400px] shadow-xl flex flex-col p-9 "></div>
      </div>
    );
  }

  return (
    <div className=" *:text-neutral-600 w-full min-h-screen flex items-center justify-center pt-10">
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
