import { Button, Drawer } from "@medusajs/ui";
import { useState } from "react";
import { useCreateDocument } from "../../hooks";
import DocumentForm, { DocumentFormData } from "./document-form";

interface DocumentCreateDrawerProps {
  refetch: () => void
}

export function DocumentCreateDrawer({ refetch }: DocumentCreateDrawerProps) {
  const [open, setOpen] = useState(false);
  const { mutate, loading, error } = useCreateDocument();

  const handleSubmit = async (formData: DocumentFormData) => {
    
    await mutate(formData as any);
    setOpen(false);
    refetch();
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button variant="secondary" size="small">
          Create
        </Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Create Document</Drawer.Title>
        </Drawer.Header>
        <DocumentForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </Drawer.Content>
    </Drawer>
  );
}