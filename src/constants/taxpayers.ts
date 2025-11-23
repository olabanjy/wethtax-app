import type { SelectOption } from "@/components/ui/select";

export const WITHOLDING_TAX_TYPE = [
  "BANK INTEREST",
  "BUILDING CONSTRUCTION BRIDGES",
  "COMMISSION",
  "CONSULTANCY",
  "CONTRACT",
  "DIRECTORS_FEES",
  "DIVIDEND",
  "RENT",
  "ROYALTY",
  "TECHNICAL SERVICES",
];

export const TAXPAYERS: SelectOption[] = [
  { label: "Individual", value: "Individual" },
  { label: "Company", value: "Company" },
  // { label: "Tax Consultant", value: "Tax Consultant" },
];
