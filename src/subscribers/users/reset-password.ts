import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { sendCustomerPasswordResetWorkflow, sendUserPasswordResetWorkflow } from "src/workflows/notifications/users/workflows";

export default async function ResetPassword({
  event,
  container
}: SubscriberArgs<{ entity_id: string, actorType: string, token: string }>) {

  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  switch (event.data.actorType) {
    case "user":
      logger.info(`Sending [user] email for event auth.password_reset and id ${event.data.entity_id}`);
      await sendUserPasswordResetWorkflow(container).run({
        input: event.data,
      });
      break;
  
    case "customer":
      logger.info(`Sending [customer] email for event auth.password_reset and id ${event.data.entity_id}`);
      await sendCustomerPasswordResetWorkflow(container).run({
        input: event.data,
      });
      break;
  
    default:
      logger.warn(`Unknown actorType: ${event.data.actorType} when resetting password`);
      break;
  }
}
  

export const config: SubscriberConfig = {
  event: `auth.password_reset`,
}