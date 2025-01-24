import { EmployeeDTO } from "./employee.dto";

export interface CreateEmployeeDTO
  extends Omit<Partial<EmployeeDTO>, "id" | "createdAt" | "updatedAt"> {
}