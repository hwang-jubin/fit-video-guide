import getCookie from "@/lib/cookie";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import tokenAuthentication from "./app/components/tokenAuthentication";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/login": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  // 쿠키에서 토큰을 가져옵니다.
  const cookie = await getCookie();
  const token = (await cookie).get("access_token")?.value;

  // 요청된 URL이 publicOnlyUrls에 존재하는지 확인
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  console.log(exists);

  // 토큰을 사용하여 사용자 정보 조회
  if (token) {
    const data = await tokenAuthentication(token);
    if (data.user) {
      if (exists) return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    //user의 profile page에 못들어가게 하기
  }

  // 기본적으로 요청을 허용
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
