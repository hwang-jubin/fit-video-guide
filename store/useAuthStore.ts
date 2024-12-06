import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean | undefined;
  setLogin: () => void;
  setLogout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: undefined, // 초기값 false
      setLogin: () => {
        set({ isAuthenticated: true });
      },
      setLogout: () => {
        set({ isAuthenticated: false });
      },
    }),
    {
      name: "authState",
    }
  )
);
