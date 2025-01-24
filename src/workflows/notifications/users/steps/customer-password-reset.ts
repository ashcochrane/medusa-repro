import { INotificationModuleService } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { createStep } from "@medusajs/framework/workflows-sdk";

interface SendPasswordResetStepInput {
  entity_id: string;
  token: string;
}

export const sendCustomerPasswordResetStep = createStep(
  "send-customer-password-reset",
  async (
    input: SendPasswordResetStepInput,
    { container }
  ): Promise<void> => {

    const notificationService = container.resolve<INotificationModuleService>(Modules.NOTIFICATION);

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${input.token}&email=${input.entity_id}`;
    try {
      await notificationService.createNotifications({
        to: input.entity_id,
        channel: "email",
        template: process.env.SENDGRID_CUSTOMER_PASSWORD_RESET_ID,
        data: {
          resetUrl: resetUrl,
        },
      });
    } catch (error) {
      console.error("Error sending customer password reset notification:", error);
      throw new Error("Failed to send customer password reset notification");
    }
  }
)