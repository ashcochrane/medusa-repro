import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework";
import { AdminLinkProductsDocumentType } from "../../validators";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { linkProductsToDocumentWorkflow, unlinkProductsToDocumentWorkflow } from "src/workflows/document/workflow";

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminLinkProductsDocumentType>,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { id } = req.params;

  const { result } = await linkProductsToDocumentWorkflow.run({
    input: {
      documentId: id,
      productIds: req.validatedBody.productIds
    },
    container: req.scope
  });
}

export const PATCH = async (
  req: AuthenticatedMedusaRequest<AdminLinkProductsDocumentType>,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { id } = req.params;

  const { result } = await unlinkProductsToDocumentWorkflow.run({
    input: {
      documentId: id,
      productIds: req.validatedBody.productIds
    },
    container: req.scope
  });
}