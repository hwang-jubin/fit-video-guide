import db from "@/lib/db";
import { cookies } from "next/headers";
import tokenGenerate from "./token-generate";

//토큰 검증
export default async function tokenAuthentication(access_token: string) {
  const cookieStore = cookies();
  const { data, error } = await db.auth.getUser(access_token);
  const refresh_token = (await cookieStore).get("refresh_token")?.value;

  //token 만료(403)이면
  if (error?.status === 403) {
    if (refresh_token) {
      const newAccessToken = (await generateNewAccessToken(refresh_token))
        .session?.access_token;
      //토큰 발급 하고
      tokenGenerate(newAccessToken!, refresh_token);
      //그 토큰으로 user 정보 내려주기
      const { data, error } = await db.auth.getUser(access_token);
    }
  } else {
    return data;
  }
  //아예 토큰이 이상한거면 어떻게 할지 고민해야 함..!

  // //token이 만료에러가 나오면 generateNewAccessToken 에서 발급 받고 tokenGenerate 에서 토큰 발급하기
  // if (!data) {
  //   const result = (await cookieStore).get("refresh_token");
  //   if (result) {
  //     const refresh_token = await generateNewAccessToken(result?.value);
  //     if (refresh_token)
  //       tokenGenerate(token, refresh_token.session?.refresh_token);
  //   }
  // }
}

//refresh token으로 access token 발급
export async function generateNewAccessToken(refresh_token: string) {
  const { data: newAccessToken, error } = await db.auth.refreshSession({
    refresh_token: refresh_token,
  });

  return newAccessToken;
}

export async function getUserInfoFromToken() {
  const cookieStore = cookies();
  const access_token = (await cookieStore).get("access_token");

  if (access_token) {
    const result = await tokenAuthentication(access_token?.value);

    return (await result).user;
  }
}
