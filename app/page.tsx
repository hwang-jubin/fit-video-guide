"use client";

import { useEffect, useState } from "react";

import Category from "./components/category";
import ExcerciseList from "./components/exerciseList";

export type dataProps = {
  id: string; // 'e780be0c-5d2e-4727-9d37-f0425f4979e7'와 같은 UUID 형식의 문자열
  video_title: string; // '옆으로 누워 안쪽다리 올리기'
  video_url: string; // 'http://openapi.kspo.or.kr/web/video/0AUDLJ08S_00135.mp4'
  length_seconds: number; // 67
  description: string; // '무릎관련 질환자를 위한 단계별 표준운동 1단계 - 옆으로 누워 안쪽다리 올리기'
  production_year: string; // '2021'
  thumbnail_urls: string[]; // ['http://openapi.kspo.or.kr/web/image/0AUDLJ08S_00135/0AUDLJ08S_00135_SC_00001.jpeg', ...]
  thumbnail_url: string; // 'http://openapi.kspo.or.kr/web/image/0AUDLJ08S_00135/0AUDLJ08S_00135_SC_00001.jpeg'
  age_group: string; // '공통'
  created_at: string; // '2022-10-26T00:00:00+00:00'
  training_type: string | null; // null or string (예: '유산소', '근력')
  training_purpose: string | null; // null or string
  support_tool: string; // '매트'
  fitness_factor: string | null; // null or string
  training_part: string; // '무릎'
};

export default function Home() {
  const [data, setData] = useState<dataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/exercise"); // 유효한 API URL 확인 필요
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const jsonData = await res.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="pt-20 px-5 mx-6 min-w-[1100px]">
        <Category />
      </div>
    </div>
  );
}
