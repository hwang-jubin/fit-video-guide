import { UserInfo } from "../page";

interface DisplayModeProps {
  userInfo: UserInfo | undefined;
  setEditmode: (value: boolean) => void;
}

export default function DisplayMode({
  userInfo,
  setEditmode,
}: DisplayModeProps) {
  return (
    <div>
      <div className="flex flex-col gap-7 mt-6 bg-neutral-100 rounded-t-md p-5 py-12 h-[230px]">
        <div className="flex gap-3 items-center">
          <div className="font-bold">닉네임</div>
          <div>{userInfo?.nickname}</div>
        </div>
        <div className="flex gap-3">
          <div className="font-bold">이메일</div>
          <div>{userInfo?.email}</div>
        </div>
        <div className=" flex gap-3 flex-col ">
          <div className="flex gap-3">
            <div className="font-bold">운동 목표</div>
            <div>{userInfo?.training_purpose}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 ">
        <button
          type="submit"
          onClick={() => setEditmode(true)}
          className="w-20 p-1 bg-neutral-300 text-neutral-800 font-bold rounded-md"
        >
          수정하기
        </button>
      </div>
    </div>
  );
}
