import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk";
import { linkProductsToDocumentStep } from "../steps";

export type linkProductsToDocumentWorkflowInput = {
  documentId: string;
  productIds: string[]
}

export const linkProductsToDocumentWorkflowId = "link-products-to-document"

export const linkProductsToDocumentWorkflow = createWorkflow(
  linkProductsToDocumentWorkflowId,
  function (input: linkProductsToDocumentWorkflowInput) {
    return new WorkflowResponse(linkProductsToDocumentStep(input));
  }
);