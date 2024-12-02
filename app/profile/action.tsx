"use server";

import { getAuthSupabase } from "@/lib/auth";

export default async function editUserInfo(formData: FormData) {
  const data = {
    nickname: formData.get("nickname"),
    email: formData.get("email") as string,
    purpose: formData.get("purpose"),
  };

  const db = await getAuthSupabase();

  //   const cookieStore = cookies();
  //   const token = (await cookieStore).get("access_token")?.value;
  //   console.log(token);
  const session = await db.auth.getUser();
  //   console.log(`session=${session.data.session?.access_token}`);
  console.log(`user = ${session.data.user?.email}`);
  const response = await db.auth.updateUser({
    email: data.email, // 업데이트할 이메일
    // data: {
    //   nickname: data.nickname, // 닉네임
    //   training_purpose: data.purpose, // 운동 목표
    // },
    // access_token: token,
  });
  //   console.log(data);
  //   console.log(response);
}
