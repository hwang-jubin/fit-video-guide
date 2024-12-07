// SearchResult.tsx
"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { dataProps } from "@/app/page";
import ExcerciseList from "@/app/components/exerciseList";

export default function SearchResult() {
  const [results, setResults] = useState<dataProps[]>([]); // 검색 결과 상태
  const searchParams = useSearchParams(); // 쿼리 파라미터 객체를 가져옴
  const query = searchParams.get("query"); // 'query' 파라미터를 가져옴
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();

      setResults(data);
      setIsLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <div className="min-w-[1100px]">
      {results.length !== 0 ? (
        <div className="pt-20 px-5 mx-6 box-border">
          <div>
            <div className=" font-semibold text-neutral-500 text-xl">
              &quot;{query}&quot; 검색 결과...
            </div>
            <ExcerciseList data={results} isLoading={isLoading} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen ">
          &quot;{query}&quot; 에 대한 검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
