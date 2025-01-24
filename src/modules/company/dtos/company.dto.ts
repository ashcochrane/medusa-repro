import { EmployeeDTO } from "./employee.dto";

export interface CompanyDTO {
  id: string;
  name: string;
  phone: string;
  email: string;
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  country: string | null;
  employees?: EmployeeDTO[];
  currency_code: string | null;
  created_at: Date;
  updated_at: Date;
}