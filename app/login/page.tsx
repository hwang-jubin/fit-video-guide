import Link from "next/link";
import Button from "../components/button";
import FormInput from "../components/formInput";
import Header from "../components/header";

export default function Login() {
  return (
    <div>
      <Header />
      <div className=" w-full min-h-screen flex items-center justify-center  pt-10">
        <div className="w-[400px] h-[500px] shadow-xl flex flex-col p-9 ">
          <div className="text-center font-bold text-2xl">로그인</div>
          <div className="text-center mt-6 font-normal text-sm text-neutral-400">
            로그인 하고 개인화된 맞춤 동영상을 추천 받으세요!
          </div>
          <form className="flex flex-col gap-5 mt-9">
            <div className=" flex flex-col ">
              <FormInput
                name="email"
                type="email"
                placeholder="이메일을 입력하세요"
                required
              />
            </div>
            <div>
              <FormInput
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요 입력하세요"
                required
              />
            </div>
            <Button />
          </form>
          <div className="flex justify-center items-center mt-11">
            <Link href="/create-account" className="text-neutral-500 text-sm">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}