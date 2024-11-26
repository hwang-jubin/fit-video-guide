import db from "@/lib/db";

export default async function tokenAuthentication(token: string) {
  // 토큰을 사용하여 사용자 정보 조회

  const { data, error } = await db.auth.getUser(token);
  return data;
}
