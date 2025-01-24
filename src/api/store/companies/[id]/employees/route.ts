import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { StoreGetEmployeeParamsType } from "../../validators";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export const GET = async (
  req: MedusaRequest<StoreGetEmployeeParamsType>,
  res: MedusaResponse
) => {
  const { id } = req.params;
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data: employees, metadata } = await query.graph(
    {
      entity: "employee",
      fields: req.remoteQueryConfig.fields,
      filters: {
        company_id: id,
        ...req.filterableFields,
      },
    },
    { throwIfKeyNotFound: true }
  );

  res.json({
    employees,
    count: metadata!.count,
    offset: metadata!.skip,
    limit: metadata!.take,
  });
};