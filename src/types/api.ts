import { Customer } from "./customer";

export type CustomersResponse = {
  customers: Customer[];
};

export type CustomersQueryParams = {
  searchText?: string;
  species?: string[];
};
