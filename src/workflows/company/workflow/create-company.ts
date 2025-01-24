import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk";
import { ModuleCreateCompany } from "@ashtoncochrane/types";
import { createCompanyStep } from "../steps";

export const createCompanyWorkflow = createWorkflow(
  "create-company",
  function (input: ModuleCreateCompany) {
    return new WorkflowResponse(createCompanyStep(input));
  }
);