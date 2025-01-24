import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { AddToCartWorkflowInputDTO, HttpTypes } from "@medusajs/framework/types";
import { addToCartWorkflow } from "@medusajs/medusa/core-flows";
import { ContainerRegistrationKeys } from "@medusajs/utils";
import { StoreAddLineItemsBulkType } from "../../../validators";

export async function POST(
  req: MedusaRequest<StoreAddLineItemsBulkType>,
  res: MedusaResponse<HttpTypes.StoreCartResponse>
) {
  const { id } = req.params;

  console.log(req.body);

  const { line_items } = req.validatedBody
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const {
    data: [cart],
  } = await query.graph(
    {
      entity: "cart",
      fields: req.remoteQueryConfig.fields,
      filters: { id },
    },
    { throwIfKeyNotFound: true }
  );

  const workflowInput = {
    cart_id: cart.id,
    items: line_items,
  };

  await addToCartWorkflow(req.scope).run({
    input: workflowInput as AddToCartWorkflowInputDTO,
  });

  const {
    data: [upatedCart],
  } = await query.graph(
    {
      entity: "cart",
      fields: req.remoteQueryConfig.fields,
      filters: { id },
    },
    { throwIfKeyNotFound: true }
  );

  res.json({ cart: upatedCart });
}