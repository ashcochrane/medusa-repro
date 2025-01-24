import { INotificationModuleService } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { createStep } from "@medusajs/framework/workflows-sdk";

interface SendCustomerCreatedStepInput {
  id: string;
}

export const sendCustomerCreatedStep = createStep(
  "send-customer-created",
  async (
    input: SendCustomerCreatedStepInput,
    { container }
  ): Promise<void> => {
    const notificationService = container.resolve<INotificationModuleService>(Modules.NOTIFICATION);
    const customerService = container.resolve(Modules.CUSTOMER);

    try {
      const customer = await customerService.retrieveCustomer(input.id);

      if (!customer.email) {
        throw new Error(`No email found for customer ${input.id}`);
      }

      await notificationService.createNotifications({
        to: customer.email,
        channel: "email",
        template: process.env.SENDGRID_USER_CREATED_TEMPLATE_ID,
        data: {
          customer: customer
        }
      });

    } catch (error) {
      console.error("Error sending customer created email:", error);
      throw new Error("Failed to send customer created email");
    }
  }
)