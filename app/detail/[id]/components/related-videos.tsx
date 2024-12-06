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
      {loading ? ( // 로딩 중일 때 메시지 표시
        <div>Loading...</div>
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
