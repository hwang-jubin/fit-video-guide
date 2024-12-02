import getCookie from "@/lib/cookie";
import { getAuthSupabase } from "@/lib/auth";

export default async function tokenGenerate(
  access_token: string,
  refresh_token: string
) {
  const db = await getAuthSupabase();
  const { data, error } = await db.auth.setSession({
    access_token,
    refresh_token,
  });

  const cookieStore = getCookie();
  const accessTokenResult = (await cookieStore).set(
    "access_token",
    data.session?.access_token!,
    {
      httpOnly: true,

      path: "/",
      maxAge: 60 * 60 * 24 * 60, //7일간 유효
    }
  );

  const refreshTokenResult = (await cookieStore).set(
    "refresh_token",
    data.session?.refresh_token!,
    {
      httpOnly: true,
      path: "/",

      maxAge: 60 * 60 * 24 * 60, //60일 동안 유효
    }
  );

  const session = await db.auth.getSession();
  console.log(session.data.session);
  const getuser = await db.auth.getUser();
  console.log(getuser.data.user);
}
