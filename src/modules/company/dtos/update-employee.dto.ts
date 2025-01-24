import { EmployeeDTO } from "./employee.dto";

export interface UpdateEmployeeDTO extends Partial<EmployeeDTO> {
  id: string;
}