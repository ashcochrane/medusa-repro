import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { ICompanyModuleService, ModuleCreateCompany } from "@ashtoncochrane/types";
import { COMPANY_MODULE } from "../../../modules/company";

export const createCompanyStep = createStep(
  "create-company",
  async (input: ModuleCreateCompany, { container }) => {
    const companyModuleService =
      container.resolve<ICompanyModuleService>(COMPANY_MODULE);

    const company = await companyModuleService.createCompanies(input);

    return new StepResponse(company, company.id);
  },
  async (companyId: string, { container }) => {
    if (!companyId) {
      return;
    }

    const companyModuleService =
      container.resolve<ICompanyModuleService>(COMPANY_MODULE);
  }
);