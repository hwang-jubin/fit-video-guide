"use client";

import Link from "next/link";
import SearchBar from "./searchBar";
import { useStore } from "zustand";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import Logout from "./auth/logout";

export default function Header() {
  const [isLoading, setLoading] = useState(true); // 로딩 상태 관리
  const { isAuthenticated, setLogin } = useStore(useAuthStore);

  useEffect(() => {
    // Zustand 상태가 localStorage에서 로드되기 전까지 로딩 상태 유지
    const checkAuthStatus = async () => {
      // 상태가 로드되면 loading 상태를 false로 설정
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    // 로딩 중일 때는 Header를 아예 렌더링하지 않거나,
    // 상태가 false로 바뀌면 렌더링을 시작함
    return null;
  }

  return (
    <div className="w-full h-14 box-border bg-white flex gap-[120px] items-center px-3 justify-between shadow-lg fixed z-10 ">
      <div className=" flex items-center gap-4">
        <Link href="/">
          <svg className="size-10" viewBox="0 0 640 512">
            <path d="M104 96H56c-13.3 0-24 10.7-24 24v104H8c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h24v104c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24zm528 128h-24V120c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24v272c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V288h24c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM456 32h-48c-13.3 0-24 10.7-24 24v168H256V56c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24v400c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V288h128v168c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24z"></path>
          </svg>
        </Link>
        <Link href="/">FitVideoGuide</Link>
      </div>
      <SearchBar />
      {!isAuthenticated ? (
        <Link
          className="min-w-16  h-10 rounded-md flex items-center justify-center bg-black p-2 box-border text-white "
          href="/login"
        >
          LogIn
        </Link>
      ) : (
        <div className="flex gap-3">
          <Link
            className="w-16 h-10 rounded-md flex items-center justify-center bg-black p-2 box-border text-white"
            href="/profile"
          >
            Profile
          </Link>
          <Logout />
        </div>
      )}
    </div>
  );
}
