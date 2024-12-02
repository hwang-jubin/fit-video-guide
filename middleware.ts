import getCookie from "@/lib/cookie";

import { NextRequest, NextResponse } from "next/server";

import tokenAuthentication from "./app/components/auth/tokenAuthentication";
import { getAuthSupabase } from "./lib/auth";

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
  const supabase = await getAuthSupabase();

  // 요청된 URL이 publicOnlyUrls에 존재하는지 확인
  const publicUrl = publicOnlyUrls[request.nextUrl.pathname];
  const privateUrl = privateUrls[request.nextUrl.pathname];

  const { data: session, error } = await supabase.auth.getUser();

  if (session.user) {
    if (session.user === null) {
      await supabase.auth.refreshSession();
    }
    if (publicUrl) return NextResponse.redirect(new URL("/", request.url));
  } else {
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
