import Link from "next/link";
import SearchBar from "./searchBar";

export default function Header() {
  return (
    <div className="w-[1440px] h-14 box-border bg-white flex items-center px-3 justify-between shadow-lg fixed z-10">
      <div className=" flex items-center gap-4">
        <svg className="size-10" viewBox="0 0 640 512">
          <path d="M104 96H56c-13.3 0-24 10.7-24 24v104H8c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h24v104c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24zm528 128h-24V120c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24v272c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V288h24c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM456 32h-48c-13.3 0-24 10.7-24 24v168H256V56c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24v400c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V288h128v168c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24z"></path>
        </svg>
        <div>FitVideoGuide</div>
      </div>
      <SearchBar />
      <Link
        className="w-16 h-10 rounded-md flex items-center justify-center bg-black p-1 box-border text-white"
        href="/login"
      >
        로그인
      </Link>
    </div>
  );
}
