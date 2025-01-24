import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import {
  AdminGetEmployeeParamsType,
  AdminUpdateEmployeeType,
} from "../../../validators";
import { deleteEmployeeWorkflow, updateEmployeeWorkflow } from "src/workflows/employee/workflow";

export const GET = async (
  req: AuthenticatedMedusaRequest<AdminGetEmployeeParamsType>,
  res: MedusaResponse
) => {
  const { id, employeeId } = req.params;
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const {
    data: [employee],
  } = await query.graph(
    {
      entity: "employee",
      fields: req.remoteQueryConfig?.fields,
      filters: { ...req.filterableFields, id: employeeId, company_id: id },
    },
    { throwIfKeyNotFound: true }
  );

  res.json({ employee });
};

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminUpdateEmployeeType>,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { id, employeeId } = req.params;
  const { spending_limit, is_admin } = req.body;

  await updateEmployeeWorkflow.run({
    input: {
      id: employeeId,
      company_id: id,
      spending_limit,
      is_admin,
    },
    container: req.scope,
  });

  const {
    data: [employee],
  } = await query.graph(
    {
      entity: "employee",
      fields: req.remoteQueryConfig?.fields,
      filters: { ...req.filterableFields, id: employeeId, company_id: id },
    },
    { throwIfKeyNotFound: true }
  );

  res.json({ employee });
};

export const DELETE = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const { id, employeeId } = req.params;

  await deleteEmployeeWorkflow.run({
    input: {
      id: employeeId,
      company_id: id,
    },
    container: req.scope,
  });

  res.status(200).json({
    id: employeeId,
    object: "employee",
    deleted: true,
  });
};