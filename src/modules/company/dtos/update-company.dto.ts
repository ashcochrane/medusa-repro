import { CompanyDTO } from "./company.dto";

export interface UpdateCompanyDTO extends Partial<CompanyDTO> {
  id: string;
}