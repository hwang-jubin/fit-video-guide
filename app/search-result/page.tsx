"use client";

import { useEffect, useState } from "react";
import { dataProps } from "../page";
import { useSearchParams } from "next/navigation";
import ExcerciseList from "../components/exerciseList";

export default function searchResult() {
  const [results, setResults] = useState<dataProps[]>([]); // 검색 결과 상태
  const searchParams = useSearchParams(); // 쿼리 파라미터 객체를 가져옴
  const query = searchParams.get("query"); // 'query' 파라미터를 가져옴

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();

      setResults(data);
    };

    fetchData();
  }, [query]);

  console.log(results);
  return (
    <div className="pt-20 px-5 mx-6">
      {results.length !== 0 ? (
        <div>
          <div> {query} 검색 결과...</div>
          <ExcerciseList data={results} />
        </div>
      ) : (
        <div>없어</div>
      )}
    </div>
  );
}
