export type AccommodationReturn = {
  id: number;
  icode: string;
  created: string;
  modified: string;
  is_active: boolean;
  accommodation_type: string;
  ownership_type: string;
  owner_name: string;
  owner_address: string;
  owner_tax_payer_number: string;
  rent_paid: string;
  rent_paid_by_employer: string;
  start_date: string;
  end_date: string;
  created_by: string;
  modified_by: string;
  individual_return: number;
};

export type IncomeReturn = {
  id: number;
  icode: string;
  other_incomes: Array<OtherIncome>;
  created: string;
  modified: string;
  is_active: boolean;
  salary: string;
  commission: string;
  trade_income: string;
  allowance: string;
  pension: string;
  annuity: string;
  gratuities: string;
  foreign_income: string;
  dividend: string;
  interest: string;
  rent: string;
  statement_of_income: string;
  created_by: string;
  modified_by: string;
  individual_return: number;
};

export type OtherIncome = {
  id: number;
  icode: string;
  created: string;
  modified: string;
  is_active: boolean;
  name: string;
  details: string;
  value: string;
  created_by: string;
  modified_by: string;
  income: number;
};

export type IndividualReturn = {
  id: number;
  icode: string;
  income: IncomeReturn | null;
  accommodation: AccommodationReturn | null;
  created: string;
  modified: string;
  is_active: boolean;
  return_type: string;
  year_in_view: number;
  reference: string;
  status: string;
  created_by: string;
  modified_by: string;
  user: string;
};

export type IndividualReturnsList = {
  count: number;
  page: number;
  pages: number;
  results: IndividualReturn[];
};
