import { useEffect, useState } from "react";
import ExcerciseList from "./exerciseList";
import { dataProps } from "../page";
import { useRouter } from "next/navigation";

const categories = [
  "전체",
  "허리 운동",
  "무릎 운동",
  "어깨 운동",
  "짐볼 활용 운동",
  "밴드 활용 운동",
  "맞춤 동영상",
];

export default function Category() {
  const [selectedCategory, setCategory] = useState<string>("전체");
  const [data, setData] = useState<dataProps[]>([]);
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // 현재 페이지
  const [hasMore, setHasMore] = useState(true);

  // 카테고리가 변경될 때마다 데이터 초기화
  useEffect(() => {
    setData([]); // 이전 데이터를 초기화
    setPage(1); // 페이지 1부터 시작
    setHasMore(true); // 다시 데이터 불러오기 설정
  }, [selectedCategory]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const res = await fetch(
        `/api/exercise/?category=${selectedCategory}&page=${page}`
      ); // 유효한 API URL 확인 필요
      if (res.status === 307) {
        route.push("/login");
      } else {
        const jsonData = await res.json();

        setData((prevData) => [...prevData, ...jsonData]);
        if (jsonData.length < 12) {
          setHasMore(false); // 더 이상 데이터가 없으면 hasMore를 false로 설정
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, page]);

  const loadMoreData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // 페이지 증가
    }
  };

  return (
    <div className="flex gap-2 flex-col ">
      <div className="flex gap-2">
        {categories.map((category, index) => (
          <button
            onClick={() => setCategory(category)}
            className={`p-2 rounded-md w-auto ${
              category === "맞춤 동영상"
                ? selectedCategory === "맞춤 동영상"
                  ? "bg-white shadow-lg" // 연파랑 (선택된 맞춤동영상 스타일)
                  : "bg-blue-400 text-white" // 기본 파랑 (맞춤동영상 스타일)
                : selectedCategory === category
                ? "bg-white shadow-lg" // 선택된 다른 카테고리 스타일
                : "bg-black text-white" // 기본 스타일
            }`}
            key={index}
          >
            {category}
          </button>
        ))}
      </div>
      <ExcerciseList
        data={data}
        isLoading={isLoading}
        loadMoreData={loadMoreData}
        hasMore={hasMore}
      />
    </div>
  );
}
