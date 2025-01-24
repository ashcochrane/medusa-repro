import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { sendCustomerCreatedWorkflow } from "src/workflows/notifications/users/workflows";

export default async function CustomerCreated({
  event,
  container
}: SubscriberArgs<{ id: string }>) {

  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info(`Sending confirmation email for event ${event.name} and id ${event.data.id}`);

  await sendCustomerCreatedWorkflow(container).run({
    input: event.data
  });
}

export const config: SubscriberConfig = {
  event: `customer.created`,
}