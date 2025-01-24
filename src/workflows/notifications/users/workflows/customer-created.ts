import { createWorkflow } from '@medusajs/framework/workflows-sdk';
import { sendCustomerCreatedStep } from '../steps';

interface WorkflowInput {
  id: string
}

export const sendCustomerCreatedWorkflow = createWorkflow(
  "send-customer-created",
  function (input: WorkflowInput): void {
    sendCustomerCreatedStep(input);
  }
)