import { cookies } from "next/headers";
import tokenGenerate from "./token-generate";
import { getAuthSupabase } from "@/lib/auth";

//토큰 검증
export default async function tokenAuthentication(access_token: string) {
  const cookieStore = cookies();
  const db = await getAuthSupabase();
  const { data, error } = await db.auth.getUser(access_token);
  const refresh_token = (await cookieStore).get("refresh_token")?.value;
  // const session = db.auth.getSession();
  // console.log(`session=${(await session).data.session}`);

  //token 만료(403)이면 또는 session에 값이 없으면(왜 없는지 모를...)
  if (error?.status === 403 || error?.status === 400) {
    if (refresh_token) {
      const newToken = await generateNewAccessToken(refresh_token);
      console.log(newToken);
      //토큰 발급 하고
      tokenGenerate(
        newToken.session?.access_token!,
        newToken.session?.refresh_token!
      );
      //그 토큰으로 user 정보 내려주기
      const { data, error } = await db.auth.getUser(access_token);
      return data;
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
  const db = await getAuthSupabase();
  const { data: newToken, error } = await db.auth.refreshSession({
    refresh_token: refresh_token,
  });

  console.log(`error=${error}`);

  return newToken;
}

export async function getUserInfoFromToken() {
  const cookieStore = cookies();
  const access_token = (await cookieStore).get("access_token");

  if (access_token) {
    const result = await tokenAuthentication(access_token?.value);

    return result?.user;
  }
}
