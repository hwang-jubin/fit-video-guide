import getCookie from "@/lib/cookie";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import tokenGenerate from "./app/components/auth/token-generate";
import tokenAuthentication, {
  generateNewAccessToken,
} from "./app/components/auth/tokenAuthentication";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/login": true,
  "/create-account": true,
};

const privateUrls: Routes = {
  "/profile": true,
};

export async function middleware(request: NextRequest) {
  // 쿠키에서 토큰을 가져옵니다.
  const cookie = await getCookie();
  const access_token = (await cookie).get("access_token")?.value;
  const refresh_token = (await cookie).get("refresh_token")?.value;

  // 요청된 URL이 publicOnlyUrls에 존재하는지 확인
  const publicUrl = publicOnlyUrls[request.nextUrl.pathname];
  const privateUrl = privateUrls[request.nextUrl.pathname];

  // 토큰을 사용하여 사용자 정보 조회
  if (access_token) {
    const data = await tokenAuthentication(access_token);
    if (data?.user) {
      if (publicUrl) return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (access_token === undefined && refresh_token) {
    const newAccess_token = await generateNewAccessToken(refresh_token);

    if (newAccess_token.session) {
      tokenGenerate(
        newAccess_token.session?.access_token,
        newAccess_token.session?.refresh_token
      );
    }
  } else if (!access_token && !refresh_token) {
    if (privateUrl) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  // 기본적으로 요청을 허용
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
