"use client"; // 클라이언트 사이드 렌더링을 강제

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js 14에서는 'next/router' 대신 'next/navigation'을 사용
import Link from "next/link";
import { dataProps } from "../page";

export default function SearchBar() {
  const [query, setQuery] = useState<string>(""); // 입력값 상태
  const [results, setResults] = useState<dataProps[]>([]); // 검색 결과 상태
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter(); // 클라이언트에서 useRouter를 사용

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleFocus = () => {
    setIsInputFocused(true); // 커서가 input 안으로 들어갔을 때
  };

  const handleBlur = () => {
    setIsInputFocused(false); // 커서가 input 밖으로 나갔을 때
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === "") return; // 빈 입력일 경우 API 호출하지 않음

      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();

      setResults(data);
    };

    fetchData();
  }, [query]);

  const onSubmit = () => {
    if (query.trim() === "") return;
    query;
    router.push(`/search-result?query=${query}`); // useRouter로 라우팅
    setTimeout(() => {
      setQuery("");
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 Enter 키 동작을 막음 (폼 제출 등)
      onSubmit(); // Enter 키가 눌렸을 때 onSubmit 호출
      setTimeout(() => {
        setResults([]);
      }, 0);
    }
  };

  return (
    <div className="relative">
      <input
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className=" focus:outline-none focus:border-neutral-400 p-3  w-[600px] h-11 rounded-full border-2"
      />
      <button
        type="submit"
        onClick={onSubmit}
        className="absolute top-1/2 -translate-y-1/2 right-3 bg-neutral-200 size-9 rounded-full flex items-center justify-center"
      >
        <svg className="size-5" viewBox="0 0 512 512">
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </button>
      {results.length > 0 && (
        <div className="bg-neutral-200 p-5 absolute w-full rounded-md flex flex-col gap-1 font-semibold min-h-0 max-h-[200px] overflow-y-auto box-border">
          {results.map((data, index) => (
            <Link
              href={`/detail/${data.id}`}
              onClick={() => setResults([])}
              key={index}
              className="flex items-center gap-2"
            >
              <svg className="size-5" viewBox="0 0 512 512">
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
              {data.video_title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
