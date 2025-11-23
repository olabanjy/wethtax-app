import { getLS, removeLS, setLS } from "@/lib/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authSlice, type AuthSlice } from "./slice/auth";
import { tenantSlice, type ITenantSlice } from "./slice/tenant";

export type Store = AuthSlice & ITenantSlice;

export const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...tenantSlice(...a),
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
