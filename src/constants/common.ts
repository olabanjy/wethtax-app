export const MONTH_INDEX_MAPPER: Record<number, string> = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const currentYear = new Date().getFullYear();

export const previousYear = currentYear - 1;

export const YEARS = Array.from(
  { length: 5 },
  (_, index) => currentYear - index
);

export const PREVIOUS_YEARS = Array.from(
  { length: 5 },
  (_, index) => previousYear - index
);