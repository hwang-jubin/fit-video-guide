import { dataProps } from "@/app/page";
import { useEffect, useState } from "react";
import RelatedVideo from "./related-video";

export default function RelatedVideos({
  age_group,
  training_purpose,
  support_tool,
}: {
  age_group?: string | null;
  training_purpose?: string | null;
  support_tool?: string | null;
}) {
  console.log(age_group);
  console.log(training_purpose);
  console.log(support_tool);

  const [data, setData] = useState<dataProps[]>();
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `/api/exercise/related/?age_group=${age_group}&training_purpose=${training_purpose}&support_tool=${support_tool}`
      );

      console.log(response);
      const fetchedData = (await response.json()) as dataProps[];

      setData(fetchedData);
    };
    getData();
  }, [age_group, training_purpose, support_tool]);

  console.log(data);

  return (
    <div className="flex flex-col w-auto">
      <div className="mb-6 text-lg ml-7">연관 동영상</div>
      <div className="flex flex-col gap-3 items-center">
        {data?.map((data, index) => (
          <RelatedVideo key={index} {...data} />
        ))}
      </div>
    </div>
  );
}
