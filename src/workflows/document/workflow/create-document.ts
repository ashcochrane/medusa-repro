import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk";
import { createDocumentStep } from "../steps";

export type CreateDocumentWorkflowInput = {
  url: string;
}

export const createDocumentWorkflow = createWorkflow(
  "create-document",
  function (input: CreateDocumentWorkflowInput) {
    return new WorkflowResponse(createDocumentStep(input));
  }
);