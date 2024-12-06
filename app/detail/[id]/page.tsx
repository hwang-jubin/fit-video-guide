"use client";

import Header from "@/app/components/header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RelatedVideos from "./components/related-videos";
import Link from "next/link";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const response = await fetch(`/api/exercise/${param.id}`);
      const fetchedData = (await response.json()) as Video;

      setData(fetchedData);
      setIsLoading(false);
    };
    getData();
  }, [param.id]);

  return (
    <div>
      <div className="flex">
        <div className="min-w-[800px] w-2/3 border-r-[2px] min-h-screen">
          <div className="pt-[110px] px-14">
            <div className="flex flex-col ">
              {isLoading ? (
                // 로딩 중에는 스켈레톤을 보여주거나 고정된 크기를 적용
                <div className=" w-full aspect-[7/4] bg-neutral-400 rounded-md" />
              ) : (
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
              )}

              {isLoading ? (
                <div className="mt-3 2xl:mt-10 bg-neutral-400 h-10 rounded-md 2xl:h-16"></div>
              ) : (
                <div
                  className="mt-3 text-2xl 2xl:text-[35px] 2xl:mt-10 font-bold"
                  key={data?.video_title}
                >
                  {data?.video_title}
                </div>
              )}
              {isLoading ? (
                <div className="flex gap-3">
                  <div className="mt-4 2xl:mt-8 w-16 h-8 rounded-md 2xl:h-12 2xl:w-24 bg-neutral-400"></div>
                  <div className="mt-4 2xl:mt-8 w-16 h-8 rounded-md 2xl:h-12 2xl:w-24 bg-neutral-400"></div>
                  <div className="mt-4 2xl:mt-8 w-16 h-8 rounded-md 2xl:h-12 2xl:w-24 bg-neutral-400"></div>
                </div>
              ) : (
                <div className="mt-4 2xl:text-[25px] 2xl:mt-8 ">
                  {data?.age_group && (
                    <Link
                      href={`/search-result?query=${data?.age_group}`}
                      className={spanStyles}
                    >
                      # {data?.age_group}
                    </Link>
                  )}
                  {data?.support_tool && (
                    <Link
                      href={`/search-result?query=${data?.support_tool}`}
                      className={spanStyles}
                    >
                      # {data?.support_tool}
                    </Link>
                  )}
                  {data?.training_part && (
                    <Link
                      href={`/search-result?query=${data?.training_part}`}
                      className={spanStyles}
                    >
                      # {data?.training_part}
                    </Link>
                  )}
                  {data?.training_purpose && (
                    <Link
                      href={`/search-result?query=${data?.training_purpose}`}
                      className={spanStyles}
                    >
                      # {data?.training_purpose}
                    </Link>
                  )}
                  {data?.training_type && (
                    <Link
                      href={`/search-result?query=${data?.training_type}`}
                      className={spanStyles}
                    >
                      # {data?.training_type}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pt-[70px] flex-grow min-w-[400px] w-1/3">
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
