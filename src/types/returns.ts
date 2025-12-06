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

export type IndividualReturnSummary = {
  biller: string;
  email_address: string;
  amount: number;
  customer_name: string;
  tax_payer_id: string;
  created_at: string;
  phone_number: string;
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

export type Levies = {
  development_levy: number;
  capital_gain_min: number;
  capital_gain_percentage: number;
  premises_levy: number;
};

export type CompanyReturn = {
  id: number;
  icode: string;
  amount: string;
  created: string;
  modified: string;
  is_active: boolean;
  return_type: string;
  month: string;
  year: number;
  reference: string;
  status: string;
  created_by: string;
  modified_by: string;
  company_profile: number;
};

export type CompanyDevelopmentLevy = {
  id: number;
  icode: string;
  company_return: CompanyReturn;
  created: string;
  modified: string;
  is_active: boolean;
  number_of_staffs: number;
  amount_paid: string;
  created_by: string;
  modified_by: string;
};

export type CompanyDevelopmentLevyReturnList = {
  count: number;
  page: number;
  pages: number;
  results: CompanyDevelopmentLevy[];
};

export type BusinessPremisesLevy = {
  id: number;
  icode: string;
  company_return: CompanyReturn;
  created: string;
  modified: string;
  is_active: boolean;
  number_of_staffs: number;
  amount_paid: string;
  created_by: string;
  modified_by: string;
};

export type BusinessPremisesLevyReturnList = {
  count: number;
  page: number;
  pages: number;
  results: BusinessPremisesLevy[];
};

export type CapitalGainsTax = {
  id: number;
  icode: string;
  company_return: CompanyReturn;
  created: string;
  modified: string;
  is_active: boolean;
  asset: string;
  acquisition_price: string;
  selling_price: string;
  amount_paid: string;
  created_by: string;
  modified_by: string;
};

export type CapitalGainsTaxReturnList = {
  count: number;
  page: number;
  pages: number;
  results: CapitalGainsTax[];
};

export type IndividualDevelopmentLevy = {
  id: number;
  icode: string;
  individual_return: IndividualReturn;
  created: string;
  modified: string;
  is_active: boolean;
  amount_paid: string;
  created_by: string | null;
  modified_by: string | null;
};

export type IndividualDevelopmentLevyReturnList = {
  count: number;
  page: number;
  pages: number;
  results: IndividualDevelopmentLevy[];
};
