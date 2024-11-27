import getCookie from "@/lib/cookie";

export default async function tokenGenerate(
  access_token: string,
  refresh_token: string
) {
  const cookieStore = getCookie();
  const accessTokenResult = (await cookieStore).set(
    "access_token",
    access_token,
    {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, //7일간 유효
    }
  );
  const refreshTokenResult = (await cookieStore).set(
    "refresh_token",
    refresh_token,
    {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 60, //60일 동안 유효
    }
  );
}
