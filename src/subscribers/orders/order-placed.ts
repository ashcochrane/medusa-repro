import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { sendOrderPlacedWorkflow } from "src/workflows/notifications/orders/workflows";

export default async function OrderPlaced({
  event,
  container
}: SubscriberArgs<{ id: string }>) {

  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info(`Sending confirmation email for event ${event.name} and id ${event.data.id}`);

  await sendOrderPlacedWorkflow(container).run({
    input: { orderId: event.data.id }
  });
}

export const config: SubscriberConfig = {
  event: `order.placed`,
}