import { useEffect, useState } from "react";
import ExcerciseList from "./exerciseList";
import { dataProps } from "../page";

const categories = [
  "전체",
  "허리 운동",
  "무릎 운동",
  "어깨 운동",
  "짐볼 활용 운동",
  "밴드 활용 운동",
];

export default function Category() {
  const [selectedCategory, setCategory] = useState<string>("전체");
  const [data, setData] = useState<dataProps[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/exercise/?category=${selectedCategory}`); // 유효한 API URL 확인 필요
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const jsonData = await res.json();
      setData(jsonData);
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <div className="flex gap-2 flex-col">
      <div className="flex gap-2">
        {categories.map((category, index) => (
          <button
            onClick={() => setCategory(category)}
            className={`p-2 rounded-md w-auto ${
              selectedCategory === category
                ? "bg-white shadow-lg" // 선택된 카테고리 스타일
                : "bg-black text-white" // 기본 스타일
            }`}
            key={index}
          >
            {category}
          </button>
        ))}
      </div>
      {data && <ExcerciseList data={data} />}
    </div>
  );
}
