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
  const [data, setData] = useState<Video>();
  const param = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/exercise/${param.id}`);
      const fetchedData = (await response.json()) as Video;

      setData(fetchedData);
    };
    getData();
  }, [param.id]);

  // 데이터가 없을 때 로딩 상태를 렌더링

  return (
    <div>
      <div className="flex">
        <div className="min-w-[800px] w-2/3 border-r-[2px] min-h-screen">
          <div className="pt-20 px-14">
            <div className="flex flex-col ">
              <video
                key={data?.video_url}
                controls
                className="w-full h-auto"
                preload="metadata"
                style={{ objectFit: "fill" }}
              >
                <source src={data?.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div
                className="mt-3 text-2xl 2xl:text-[35px] 2xl:mt-10 font-bold"
                key={data?.video_title}
              >
                {data?.video_title}
              </div>
              <div className="mt-4 2xl:text-[25px] 2xl:mt-8 ">
                {data?.age_group && (
                  <span className={spanStyles}># {data?.age_group}</span>
                )}
                {data?.support_tool && (
                  <span className={spanStyles}># {data?.support_tool}</span>
                )}
                {data?.training_part && (
                  <span className={spanStyles}># {data?.training_part}</span>
                )}
                {data?.training_purpose && (
                  <span className={spanStyles}># {data?.training_purpose}</span>
                )}
                {data?.training_type && (
                  <span className={spanStyles}># {data?.training_type}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-20 flex-grow min-w-[400px]">
          <RelatedVideos
            id={data?.id}
            age_group={data?.age_group}
            training_purpose={data?.training_purpose}
            support_tool={data?.support_tool}
          />
        </div>
      </div>
    </div>
  );
}
