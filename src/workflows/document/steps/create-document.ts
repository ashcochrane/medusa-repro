import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { DOCUMENT_MODULE } from "src/modules/document";
import { IDocumentModuleService, ModuleCreateDocument } from "src/modules/document/util/types";

export type CreateDocumentsStepInput = {
  url: string
}

export const CreateDocumentStepId = "create-document";

export const createDocumentStep = createStep(
  CreateDocumentStepId,
  async (data: CreateDocumentsStepInput, { container }) => {
    const service = container.resolve<IDocumentModuleService>(DOCUMENT_MODULE);
    const document = await service.createDocuments(data);
    return new StepResponse(document, document.id);
  },

  // TODO: update undo
  async (documentId: string, { container }) => {
  }
)