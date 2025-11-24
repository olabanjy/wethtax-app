import type { StateCreator } from "zustand";

type TenantData = { acronym: string; title: string };

export interface ITenantSlice {
  tenantName: string;
  tenants: Record<string, TenantData>;
  tenant: TenantData;
  setTenantName: (value: string) => void;
  reset: () => void;
  setTenant: (value: TenantData) => void;
}

export const tenantSlice: StateCreator<ITenantSlice> = (set) => ({
  tenantName: "",
  tenants: {
    lagos: { acronym: "LIRS", title: "Lagos State Internal Revenue Service" },
    fct: { acronym: "FCT- IRS", title: "FCT Internal Revenue Service" },
  },
  tenant: { acronym: "", title: "" },
  setTenantName: (value: string) => set({ tenantName: value }),
  setTenant: (value: TenantData) => set({ tenant: value }),
  reset: () => set((s) => ({ ...s, tenantName: "" })),
});
