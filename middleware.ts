import getCookie from "@/lib/cookie";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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
  const { data, error } = await db.auth.getUser(token);
  console.log(data.user?.email);
  // 사용자 정보가 없거나 오류가 있으면 로그인 페이지로 리디렉션

  if (data.user) {
    if (exists) return NextResponse.redirect(new URL("/", request.url));
  }

  // 기본적으로 요청을 허용
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
