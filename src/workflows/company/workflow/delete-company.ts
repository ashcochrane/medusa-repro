import { createWorkflow } from "@medusajs/workflows-sdk";
import { ModuleDeleteCompany } from "@ashtoncochrane/types";
import { deleteCompanyStep } from "../steps";

export const deleteCompanyWorkflow = createWorkflow(
  "delete-company",
  function (input: ModuleDeleteCompany) {
    deleteCompanyStep([input.id]);
  }
);