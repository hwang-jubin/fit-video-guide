import { dataProps } from "@/app/page";
import { useEffect, useState } from "react";
import RelatedVideo from "./related-video";

export default function RelatedVideos({
  id,
  age_group,
  training_purpose,
  support_tool,
}: {
  id: string | undefined;
  age_group?: string | null;
  training_purpose?: string | null;
  support_tool?: string | null;
}) {
  const [data, setData] = useState<dataProps[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const number = 10;

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // 로딩 상태 시작
      try {
        const response = await fetch(
          `/api/exercise/related/?age_group=${age_group}&training_purpose=${training_purpose}&support_tool=${support_tool}`
        );
        const fetchedData = (await response.json()) as dataProps[];
        setData(fetchedData);
      } catch (error) {
        console.error("Failed to fetch related videos:", error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };
    getData();
  }, [age_group, training_purpose, support_tool]);

  return (
    <div className="flex-1 flex-col box-border mx-7">
      <div className="mb-3 text-lg font-bold">연관 동영상</div>
      {loading ? (
        <div className=" flex flex-col gap-3">
          {Array(number)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 items-center bg-neutral-400"
              >
                <div className=" w-full h-[270px] ">
                  <div className="relative w-full h-44 overflow-hidden"></div>
                  <div className=" p-2 2xl:p-4 gap-2 flex flex-col ">
                    <div className="bg-neutral-300 h-7 rounded-md"></div>
                    <div className="flex gap-2 mt-2">
                      <div className="bg-neutral-300 w-16 h-5 rounded-md "></div>
                      <div className="bg-neutral-300 w-16 h-5 rounded-md "></div>
                      <div className="bg-neutral-300 w-16 h-5 rounded-md "></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6 items-center">
          {data?.map(
            (video) =>
              video.id !== id && <RelatedVideo key={video.id} {...video} />
          )}
        </div>
      )}
    </div>
  );
}
