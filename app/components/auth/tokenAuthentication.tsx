import db from "@/lib/db";

//토큰 검증
export default async function tokenAuthentication(token: string) {
  const { data, error } = await db.auth.getUser(token);

  return data;
}

//refresh token으로 access token 발급
export async function generateNewAccessToken(refresh_token: string) {
  const { data: newAccessToken, error } = await db.auth.refreshSession({
    refresh_token: refresh_token,
  });

  return newAccessToken;
}
