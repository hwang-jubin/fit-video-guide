import { cookies } from "next/headers";

export default function getCookie() {
  const cookieStore = cookies();

  return cookieStore;
}
