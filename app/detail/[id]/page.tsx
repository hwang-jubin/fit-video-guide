"use client";

import Header from "@/app/components/header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RelatedVideos from "./components/related-videos";

interface Video {
  id: string;
  video_title: string;
  video_url: string;
  length_seconds: number;
  description: string;
  production_year: string;
  thumbnail_urls: string[];
  thumbnail_url: string;
  age_group: string;
  created_at: string;
  training_type: string | null;
  training_purpose: string | null;
  support_tool: string | null;
  fitness_factor: string | null;
  training_part: string | null;
  search_vector: string;
}

const spanStyles =
  "bg-black text-white p-2 box-border rounded-md mr-2 inline-block";

export default function ExerciseDetail() {
  const [data, setData] = useState<Video[]>([]);
  const param = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/exercise/${param.id}`);
      const fetchedData = (await response.json()) as Video[];

      setData(fetchedData);
    };
    getData();
  }, [param.id]);

  // 데이터가 없을 때 로딩 상태를 렌더링
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  // 배열의 첫 번째 데이터 추출
  const video = data[0];

  console.log(video);
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="min-w-[1000px] border-r-[2px] min-h-screen">
          <div className="pt-20 px-14">
            <div className="flex flex-col ">
              <video
                key={video.video_url}
                controls
                width="900px"
                height="600px"
                preload="metadata"
                style={{ objectFit: "fill" }}
              >
                <source src={video.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="mt-3 text-2xl font-bold" key={video.video_title}>
                {video.video_title}
              </div>
              <div className="mt-4">
                {video.age_group && (
                  <span className={spanStyles}>{video.age_group}</span>
                )}
                {video.support_tool && (
                  <span className={spanStyles}>{video.support_tool}</span>
                )}
                {video.training_part && (
                  <span className={spanStyles}>{video.training_part}</span>
                )}
                {video.training_purpose && (
                  <span className={spanStyles}>{video.training_purpose}</span>
                )}
                {video.training_type && (
                  <span className={spanStyles}>{video.training_type}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-20 flex-grow">
          <RelatedVideos
            age_group={video.age_group}
            training_purpose={video.training_purpose}
            support_tool={video.support_tool}
          />
        </div>
      </div>
    </div>
  );
}
