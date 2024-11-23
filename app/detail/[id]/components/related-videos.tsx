import { dataProps } from "@/app/page";
import { useEffect, useState } from "react";

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
  }, []);

  console.log(data);

  return <></>;
}
