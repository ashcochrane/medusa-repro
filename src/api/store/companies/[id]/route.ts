import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { StoreGetCompanyParamsType } from "../validators";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";


export const GET = async (
  req: MedusaRequest<StoreGetCompanyParamsType>,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { id } = req.params;

  const {
    data: [company],
  } = await query.graph(
    {
      entity: "companies",
      fields: req.remoteQueryConfig.fields,
      filters: { id },
    },
    { throwIfKeyNotFound: true }
  );

  res.json({ company });
}