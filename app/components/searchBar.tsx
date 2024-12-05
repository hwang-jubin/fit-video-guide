"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { dataProps } from "../page";

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<dataProps[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();

  const searchBarRef = useRef<HTMLDivElement>(null); // SearchBar 전체 영역을 감싸는 ref

  const fetchData = useDebouncedCallback(async (query: string) => {
    if (query.trim() === "") {
      setResults([]); // 빈 검색어일 경우 결과 초기화
      return;
    }

    const response = await fetch(`/api/search?query=${query}`);
    const data = await response.json();
    setResults(data); // 데이터 업데이트
  }, 100); // 500ms 디바운싱

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    fetchData(e.target.value); // 디바운싱된 fetchData 호출
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(e.target as Node)
    ) {
      setResults([]); // 외부 클릭 시 결과 초기화
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // 전역 클릭 이벤트 등록
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // 이벤트 제거
    };
  }, []);

  const onSubmit = () => {
    if (query.trim() === "") return;

    setResults([]); // 검색 제출 시 결과 초기화
    router.push(`/search-result?query=${query}`);
    setTimeout(() => {
      setQuery("");
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative" ref={searchBarRef}>
      <input
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="focus:outline-none focus:border-neutral-400 p-3 w-[600px] h-11 rounded-full border-2"
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
      {results && results.length > 0 && (
        <div className="bg-neutral-200 p-5 absolute w-full rounded-md flex flex-col gap-1 font-semibold min-h-0 max-h-[200px] overflow-y-auto box-border">
          {results.map((data, index) => (
            <Link
              href={`/detail/${data.id}`}
              onClick={() => setResults([])} // 클릭 시 결과 초기화
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
