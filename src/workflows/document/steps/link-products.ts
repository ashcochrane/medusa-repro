import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { DOCUMENT_MODULE } from "src/modules/document";

export type LinkProductsStepToDocumentInput = {
  documentId: string;
  productIds: string[]
}

export const LinkProductsToDocumentId = "link-products-to-document";

export const linkProductsToDocumentStep = createStep(
  LinkProductsToDocumentId,
  async ({ documentId, productIds }: LinkProductsStepToDocumentInput, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    const links = productIds.map((productId) => ({
      [Modules.PRODUCT]: {
        product_id: productId
      },
      [DOCUMENT_MODULE]: {
        document_id: documentId
      }
    }));
    await remoteLink.create(links);

    return new StepResponse({ documentId, productIds }, { documentId, productIds })
  },
  async ({ documentId, productIds}: LinkProductsStepToDocumentInput , { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
    const links = productIds.map((productId) => ({
      [Modules.PRODUCT]: {
        product_id: productId
      },
      [DOCUMENT_MODULE]: {
        document_id: documentId
      }
    }));
    await remoteLink.dismiss(links);
  }
)