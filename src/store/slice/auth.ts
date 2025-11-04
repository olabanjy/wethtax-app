import { type StateCreator } from "zustand";

type IAuth = {
  token: string; // access token
  refresh: string;
  details: any | null; // user details
};

export type AuthSlice = {
  auth: IAuth;
  setAuth: (value: Partial<IAuth>) => void;
  resetAuth: () => void;
};

const values = {
  auth: {
    token: "",
    refresh: "",
    details: null,
  },
};

export const authSlice: StateCreator<AuthSlice> = (set, get) => ({
  ...values,
  setAuth: (value) => set({ auth: { ...get().auth, ...value } }),
  resetAuth: () => set(values),
});
