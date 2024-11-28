import { useAuthStore } from "@/store/useAuthStore";

import { useStore } from "zustand";
import deleteToken from "./delete-token";

export default function Logout() {
  const { setLogout } = useStore(useAuthStore);

  const logout = () => {
    setLogout();
    deleteToken();
  };

  return (
    <button
      onClick={logout}
      className="w-16 h-10 rounded-md flex items-center justify-center bg-black p-1 box-border text-white"
    >
      Logout
    </button>
  );
}
