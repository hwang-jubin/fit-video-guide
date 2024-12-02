"use client";

import editUserInfo from "../action";
import { UserInfo } from "../page";

interface EditModeProps {
  userInfo: UserInfo | undefined;
  setEditmode: (value: boolean) => void;
}

export default function Editmode({ userInfo, setEditmode }: EditModeProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 폼 제출 동작 막기

    const formData = new FormData(event.currentTarget);

    // 서버 액션 호출
    await editUserInfo(formData);

    // 상태 변경
    setEditmode(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-7 mt-6 bg-neutral-100 rounded-t-md p-5 py-12 h-[230px]">
        <div className="flex gap-3 items-center">
          <div className="font-bold">닉네임</div>
          <input
            name="nickname"
            className="appearance-none bg-transparent border-none outline-none cursor-default text-neutral-600"
            type="text"
            defaultValue={userInfo?.nickname}
            readOnly
          />
          {<div></div>}
        </div>
        <div className="flex gap-3">
          <div className="font-bold">이메일</div>
          <input
            name="email"
            className="appearance-none bg-transparent border-none outline-none cursor-default text-neutral-600"
            type="email"
            defaultValue={userInfo?.email}
            readOnly
          />
        </div>
        <div className=" *:text-neutral-600 flex gap-3 flex-col ">
          <div>
            <div className="font-bold">운동 목표</div>
            <div className="grid grid-cols-3 *:justify-center ">
              <label className="flex items-center gap-2">
                <input
                  className="appearance-none w-3 h-3 border border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500"
                  type="radio"
                  name="purpose"
                  value="체중 감량"
                  defaultChecked={userInfo?.training_purpose === "체중 감량"}
                />
                <div>체중 감량</div>
              </label>
              <label className="flex items-center gap-2">
                <input
                  className="appearance-none w-3 h-3 border border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500"
                  type="radio"
                  name="purpose"
                  defaultChecked={userInfo?.training_purpose === "근력 증진"}
                  value="근력 증진"
                />
                <div>근력 증진</div>
              </label>
              <label className="flex items-center gap-2">
                <input
                  className="appearance-none w-3 h-3 border border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500"
                  type="radio"
                  name="purpose"
                  defaultChecked={userInfo?.training_purpose === "유연성 증진"}
                  value="유연성 증진"
                />
                <div>유연성 증진</div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 ">
        <button
          type="submit"
          className="w-20 p-1 bg-neutral-300 text-neutral-800 font-bold rounded-md"
        >
          수정완료
        </button>
      </div>
    </form>
  );
}
