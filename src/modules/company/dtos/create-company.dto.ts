import { CompanyDTO } from "./company.dto";

export interface CreateCompanyDTO
  extends Omit<Partial<CompanyDTO>, "id" | "createdAt" | "updatedAt"> {}