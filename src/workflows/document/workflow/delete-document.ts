import { createWorkflow } from "@medusajs/workflows-sdk";
import { ModuleDeleteDocument } from "src/modules/document/util/types";
import { deleteDocumentStep } from "../steps";

export const deleteDocumentWorkflow = createWorkflow(
  "delete-document",
  function (input: ModuleDeleteDocument) {
    deleteDocumentStep([input.id]);
  }
);