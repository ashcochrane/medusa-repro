import { createWorkflow } from "@medusajs/framework/workflows-sdk";
import { sendOrderPlacedStep } from "../steps";

interface WorkflowInput {
  orderId: string;
}

export const sendOrderPlacedWorkflow = createWorkflow(
  "send-order-placed",
  function (input: WorkflowInput): void {
    sendOrderPlacedStep(input);
  }
)