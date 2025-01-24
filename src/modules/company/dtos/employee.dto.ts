import { CustomerDTO } from "@medusajs/framework/types";
import { CompanyDTO } from "./company.dto";

export interface EmployeeDTO extends CustomerDTO {
  id: string;
  spending_limit: number;
  is_admin: boolean;
  company_id: string;
  company?: CompanyDTO;
  customer?: CustomerDTO;
  created_at: Date;
  updated_at: Date;
}