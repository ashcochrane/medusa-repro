import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { DOCUMENT_MODULE } from "src/modules/document"
import { IDocumentModuleService } from "src/modules/document/util/types"



export const deleteDocumentStep = createStep(
  "delete-document",
  async (id: string[], { container }) => {
    const documentModule =
      container.resolve<IDocumentModuleService>(DOCUMENT_MODULE);

    await documentModule.softDeleteDocuments(id);

    return new StepResponse(id);
  },
  async (documentId: string[], { container }) => {
    const documentModule = 
      container.resolve<IDocumentModuleService>(DOCUMENT_MODULE);
  }
)