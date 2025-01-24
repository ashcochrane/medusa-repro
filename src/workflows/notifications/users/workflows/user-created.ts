import { createWorkflow } from '@medusajs/framework/workflows-sdk';
import { sendUserCreatedStep } from '../steps';

interface WorkflowInput {
  id: string
}

export const sendUserCreatedWorkflow = createWorkflow(
  "send-user-created",
  function (input: WorkflowInput): void {
    sendUserCreatedStep(input);
  }
)