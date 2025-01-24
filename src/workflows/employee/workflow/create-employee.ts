import { when, transform } from "@medusajs/framework/workflows-sdk";
import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk";
import { ModuleCreateEmployee, ModuleEmployee } from "@ashtoncochrane/types";
import {
  createEmployeeStep,
  linkEmployeeToCustomerStep,
  setAdminRoleStep,
} from "../steps";
import { createCustomerAccountWorkflow } from "@medusajs/medusa/core-flows";
import { createAuthIdentityStep } from "../steps/create-auth-identity";
import { AdminCreateCustomer } from "@medusajs/framework/types";

// TODO: Update engage/types to work correctly
export interface ModuleCreateEmployeeT extends AdminCreateCustomer {
  customer_id: string;
  spending_limit: number;
  is_admin: boolean;
  company_id: string;
};

type WorkflowInput = {
  employeeData: ModuleCreateEmployeeT;
};

export const createEmployeeWorkflow = createWorkflow(
  "create-employees",
  function (input: WorkflowInput): WorkflowResponse<ModuleEmployee> {

    const authIdentity = createAuthIdentityStep({ email: input.employeeData.email });

    const customer = createCustomerAccountWorkflow.runAsStep({
      input: {
        authIdentityId: authIdentity.id,
        customerData: {
          email: input.employeeData.email,
          first_name: input.employeeData.first_name,
          last_name: input.employeeData.last_name,
          phone: input.employeeData.phone,
          company_name: input.employeeData.company_name
        }
      }
    })

    const employee = createEmployeeStep({
      customer_id: customer.id,
      ...input.employeeData
    });
    
    linkEmployeeToCustomerStep({
      employeeId: employee.id,
      customerId: customer.id
    })
    
    when(employee, (employee) => {
      return !!employee.is_admin;
    }).then(() => {
        setAdminRoleStep({
        employeeId: employee.id,
        customerId: customer.id,
      });    })

    return new WorkflowResponse(employee);
  }
);