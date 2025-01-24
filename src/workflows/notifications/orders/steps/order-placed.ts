import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createStep } from "@medusajs/framework/workflows-sdk";
import { INotificationModuleService } from "@medusajs/framework/types";

interface SendOrderCreatedStepInput {
  orderId: string
}

export const sendOrderPlacedStep = createStep(
  "send-order-placed",
  async (
    input: SendOrderCreatedStepInput,
    { container }
  ): Promise<void> => {

    const notificationService = container.resolve<INotificationModuleService>(Modules.NOTIFICATION);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    try {

      const {
        data: [order],
      } = await query.graph(
        {
          entity: "order",
          fields: [
            "*",
            "items.id",
            "items.title",
            "items.quantity",
            "items.unit_price",
            "items.variant.product.title"
          ],
          filters: {
            id: input.orderId
          },
        },
        { throwIfKeyNotFound: true }
      );
  
      if (!order.email) {
        throw new Error(`No email found for order ${input.orderId}`);
      }
    
      await notificationService.createNotifications({
        to: order.email,
        channel: "email",
        template: process.env.SENDGRID_ORDER_PLACED_ID,
        data: {
          order: order
        }
      });

    } catch (error) {
      console.error("Error sending order placed email:", error);
      throw new Error("Failed to send order placed email");
    }
  }
)