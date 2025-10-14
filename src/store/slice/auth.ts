import { type StateCreator } from "zustand";

type IAuth = {
  token: string;
  details: null;
};

export type AuthSlice = {
  auth: IAuth;
  setAuth: (value: Partial<IAuth>) => void;
  resetAuth: () => void;
};

const values = {
  auth: {
    token: "",
    details: null,
  },
};

export const authSlice: StateCreator<AuthSlice> = (set, get) => ({
  ...values,
  setAuth: (value) => set({ auth: { ...get().auth, ...value } }),
  resetAuth: () => set(values),
});
