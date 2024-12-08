import { dataProps } from "../page";
import Excercise from "./exercise";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ExcerciseList({
  data,
  isLoading,
  loadMoreData,
  hasMore,
}: {
  data: dataProps[];
  isLoading: boolean;
  loadMoreData: () => void;
  hasMore: boolean;
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
    <InfiniteScroll
      dataLength={data.length} // 현재 데이터 길이
      next={loadMoreData} // 스크롤 끝에 도달하면 loadMoreData 호출
      hasMore={hasMore} // 더 이상 데이터가 없으면 더 이상 요청하지 않음
      loader={""} // 로딩 메시지
      endMessage={""} // 끝 메시지
      scrollThreshold={0.95} // 화면의 95%를 스크롤하면 데이터를 가져옵니다
    >
      <div className="grid grid-cols-3 gap-4 mt-7">
        {data?.map((data, index) => (
          <Excercise key={index} {...data} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
