import getCookie from "@/lib/cookie";
import db from "@/lib/db";

export default async function tokenGenerate(
  access_token: string,
  refresh_token: string
) {
  const { data, error } = await db.auth.setSession({
    access_token,
    refresh_token,
  });
  const session = await db.auth.getSession();
  console.log(`session=${session.data.session?.access_token}`);
  const cookieStore = getCookie();
  const accessTokenResult = (await cookieStore).set(
    "access_token",
    data.session?.access_token!,
    {
      // httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 60, //7일간 유효
    }
  );

  console.log(accessTokenResult);
  const refreshTokenResult = (await cookieStore).set(
    "refresh_token",
    data.session?.refresh_token!,
    {
      // httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 60, //60일 동안 유효
    }
  );
}
