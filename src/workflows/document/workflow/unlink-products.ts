import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk";
import { UnlinkProductsToDocumentStep } from "../steps";

export type UnlinkProductsWorkflowToDocumentInput = {
  documentId: string;
  productIds: string[]
}

export const UnlinkProductsToDocumentWorkflowId = "unlink-products-to-document"

export const unlinkProductsToDocumentWorkflow = createWorkflow(
  UnlinkProductsToDocumentWorkflowId,
  function (input: UnlinkProductsWorkflowToDocumentInput) {
    return new WorkflowResponse(UnlinkProductsToDocumentStep(input));
  }
);