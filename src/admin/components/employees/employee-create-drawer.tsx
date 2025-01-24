import { HttpTypes } from "@medusajs/types";
import { Button, Drawer, toast } from "@medusajs/ui";
import { AdminCreateEmployee } from "@ashtoncochrane/types";
import { useState } from "react";
import { CompanyDTO } from "src/modules/company/dtos";
import { useCreateEmployee } from "../../hooks";
import { EmployeesCreateForm } from "./employee-create-form";

export function EmployeeCreateDrawer({
  company,
  refetch,
}: {
  company: CompanyDTO;
  refetch: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    mutate: createEmployee,
    loading: createEmployeeLoading,
    error: createEmployeeError,
  } = useCreateEmployee(company.id);

  const handleSubmit = async (
    formData: AdminCreateEmployee & HttpTypes.AdminCreateCustomer
  ) => {

    const employee = await createEmployee({
      email: formData.email!,
      first_name: formData.first_name!,
      last_name: formData.last_name!,
      phone: formData.phone!,
      company_name: company.name,
      spending_limit: formData.spending_limit!,
      is_admin: formData.is_admin!,
    });

    if (!employee) {
      toast.error("Failed to create employee");
      return;
    }

    refetch();
    setOpen(false);
    toast.success(
      `Employee ${employee?.first_name} ${employee?.last_name} created successfully`
    );
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button variant="secondary" size="small">
          Add
        </Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Add Company Customer</Drawer.Title>
        </Drawer.Header>
        <EmployeesCreateForm
          handleSubmit={handleSubmit}
          loading={createEmployeeLoading}
          error={createEmployeeError}
          company={company}
        />
      </Drawer.Content>
    </Drawer>
  );
}