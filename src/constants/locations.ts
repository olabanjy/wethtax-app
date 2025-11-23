import type { SelectOption } from "@/components/ui/select";

// Minimal mappings to power the selects. Extend as needed.
export const LGA_MAP: Record<string, SelectOption[]> = {
  Lagos: [
    { label: "Ikeja", value: "Ikeja" },
    { label: "Surulere", value: "Surulere" },
    { label: "Eti-Osa", value: "Eti-Osa" },
  ],
};

export const LCDA_MAP: Record<string, Record<string, SelectOption[]>> = {
  Lagos: {
    Ikeja: [
      { label: "Alausa", value: "Alausa" },
      { label: "Ojodu", value: "Ojodu" },
    ],
    Surulere: [
      { label: "Coker-Aguda", value: "Coker-Aguda" },
      { label: "Itire-Ikate", value: "Itire-Ikate" },
    ],
    "Eti-Osa": [
      { label: "Ikoyi-Obalende", value: "Ikoyi-Obalende" },
      { label: "Iru-Victoria Island", value: "Iru-Victoria Island" },
    ],
  },
};

export const getLgasForState = (state: string): SelectOption[] => {
  return LGA_MAP[state] || [];
};

export const getLcdasFor = (state: string, lga: string): SelectOption[] => {
  const byState = LCDA_MAP[state];
  return (byState && byState[lga]) || [];
};


