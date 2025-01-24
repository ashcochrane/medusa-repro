import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework";
import { AdminGetDocumentParamsType } from '../validators';
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { deleteDocumentWorkflow } from "src/workflows/document/workflow";

// TODO: implement deleting the file from our fileservice.
export const DELETE = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { id } = req.params;

  const { result } = await deleteDocumentWorkflow.run({
    input: {
      id,
    },
  });

  res.status(200).json({
    id,
    object: "documents",
    deleted: true,
  });
};