import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/workflows-sdk";
import { ModuleUpdateEmployee, QueryEmployee } from "@ashtoncochrane/types";
import { removeAdminRoleStep, updateEmployeeStep } from "../steps";
import { when } from "@medusajs/framework/workflows-sdk";

export const updateEmployeeWorkflow = createWorkflow(
  "update-employees",
  (
    input: WorkflowData<ModuleUpdateEmployee>
  ): WorkflowResponse<QueryEmployee> => {
    const updatedEmployee = updateEmployeeStep(input);

    when(updatedEmployee, ({ is_admin }) => {
      return is_admin === false;
    }).then(() => {
      removeAdminRoleStep({
        email: updatedEmployee.customer.email,
      });
    });

    return new WorkflowResponse(updatedEmployee);
  }
);