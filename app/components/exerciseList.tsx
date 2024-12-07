import { dataProps } from "../page";
import Excercise from "./exercise";

export default function ExcerciseList({
  data,
  isLoading,
}: {
  data: dataProps[];
  isLoading: boolean;
}) {
  const number = 12;

  return isLoading ? (
    <div className="grid grid-cols-3 gap-4 mt-7">
      {Array(number)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="bg-neutral-400 h-[350px] rounded-md overflow-hidden min-w-[300px]"
          >
            {/* 이미지 부분 */}
            <div className="relative w-full h-52 "></div>
            <div className="text-white px-5 py-2  box-border">
              <div className="text-lg font-bold h-10 flex items-center mb-2 bg-neutral-300 rounded-md"></div>
              <div className="flex gap-3">
                <div className="bg-neutral-300 w-20 h-7 mt-7 rounded-md"></div>
                <div className="bg-neutral-300 w-20 h-7 mt-7 rounded-md"></div>
                <div className="bg-neutral-300 w-20 h-7 mt-7 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-4 mt-7">
      {data?.map((data) => (
        <Excercise key={data.id} {...data} />
      ))}
    </div>
  );
}
