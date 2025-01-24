import { INotificationModuleService } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { createStep } from "@medusajs/framework/workflows-sdk";

interface SendUserCreatedStepInput {
  id: string;
}

export const sendUserCreatedStep = createStep(
  "send-user-created",
  async (
    input: SendUserCreatedStepInput,
    { container }
  ): Promise<void> => {
    const notificationService = container.resolve<INotificationModuleService>(Modules.NOTIFICATION);
    const userService = container.resolve(Modules.USER);

    try {
      const user = await userService.retrieveUser(input.id);

      if (!user.email) {
        throw new Error(`No email found for user ${input.id}`);
      }

      await notificationService.createNotifications({
        to: user.email,
        channel: "email",
        template: process.env.SENDGRID_USER_CREATED_TEMPLATE_ID,
        data: {
          user: user
        }
      });

    } catch (error) {
      console.error("Error sending user created email:", error);
      throw new Error("Failed to send user created email");
    }
  }
)