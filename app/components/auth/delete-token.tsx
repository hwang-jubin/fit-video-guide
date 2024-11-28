"use server";

import { cookies } from "next/headers";

export default async function deleteToken() {
  const cookieStore = cookies();
  (await cookieStore).delete("refresh_token");
  (await cookieStore).delete("access_token");
}
