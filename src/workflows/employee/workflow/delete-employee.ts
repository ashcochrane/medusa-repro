import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/workflows-sdk";
import { deleteEmployeeStep } from "../steps";

export const deleteEmployeeWorkflow = createWorkflow(
  "delete-employees",
  (input: WorkflowData<string | string[]>): WorkflowResponse<string> => {
    deleteEmployeeStep(input);

    return new WorkflowResponse("Company customers deleted");
  }
);