import { createWorkflow } from '@medusajs/framework/workflows-sdk';
import { sendUserPasswordResetStep } from '../steps';

interface WorkflowInput {
  entity_id: string;
  token: string
}

export const sendUserPasswordResetWorkflow = createWorkflow(
  "send-user-password-reset",
  function (input: WorkflowInput): void {
    sendUserPasswordResetStep(input);
  }
)