import { getLS, removeLS, setLS } from "@/lib/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authSlice, type AuthSlice } from "./slice/auth";

export type Store = AuthSlice;

export const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...authSlice(...a),
    }),
    {
      name: "wethtax_frontend",
      storage: {
        getItem: getLS,
        setItem: setLS,
        removeItem: removeLS,
      },
    }
  )
);
