import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk";
import { ModuleUpdateCompany } from "@ashtoncochrane/types";
import { updateCompanyStep } from "../steps";

export const updateCompanyWorkflow = createWorkflow(
  "update-compant",
  function (input: ModuleUpdateCompany) {
    return new WorkflowResponse(updateCompanyStep(input));
  }
);