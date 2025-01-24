import { createWorkflow } from '@medusajs/framework/workflows-sdk';
import { sendCustomerPasswordResetStep } from '../steps';

interface WorkflowInput {
  entity_id: string;
  token: string
}

export const sendCustomerPasswordResetWorkflow = createWorkflow(
  "send-customer-password-reset",
  function (input: WorkflowInput): void {
    sendCustomerPasswordResetStep(input);
  }
)