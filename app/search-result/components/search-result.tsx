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
  const [page, setPage] = useState(1); // 현재 페이지
  const [hasMore, setHasMore] = useState(true);

  // 쿼리나 페이지가 변경될 때마다 데이터 초기화
  useEffect(() => {
    setResults([]); // 이전 데이터 초기화
    setPage(1); // 페이지 1로 초기화
    setHasMore(true); // 더 불러올 데이터가 있음을 설정
  }, [query]); // 쿼리가 변경될 때마다 실행

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(`/api/search?query=${query}&&page=${page}`);

      const jsonData = await response.json();

      if (jsonData) {
        setResults((prevData) => [...prevData, ...jsonData]);

        if (jsonData.length < 12) {
          setHasMore(false); // 더 이상 데이터가 없으면 hasMore를 false로 설정
        }

        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const loadMoreData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // 페이지 증가
    }
  };

  return (
    <div className="min-w-[1100px] mb-20">
      {results.length !== 0 ? (
        <div className="pt-20 px-5 mx-6 box-border">
          <div>
            <div className=" font-semibold text-neutral-500 text-xl">
              &quot;{query}&quot; 검색 결과...
            </div>
            <ExcerciseList
              data={results}
              isLoading={isLoading}
              loadMoreData={loadMoreData}
              hasMore={hasMore}
            />
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
