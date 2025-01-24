import { DocumentDTO } from "../../../modules/document/dtos";
import { DropdownMenu, IconButton, toast } from '@medusajs/ui';
import { EllipsisHorizontal, Trash } from '@medusajs/icons';
import { useState } from "react";
import { DeletePrompt } from "../common";
import { useDeleteDocument } from "../../hooks";
import { useNavigate } from "react-router-dom";

interface DocumentActionsMenuProps {
  document: DocumentDTO,
  refetch: () => void
}

export const DocumentActionsMenu = ({
  document,
  refetch
}:DocumentActionsMenuProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { mutate, loading } = useDeleteDocument(document.id);

  const navigate = useNavigate();
  const handleDelete = async () => {
    await mutate();
    navigate("/documents");
    refetch();
    toast.success(`Document ${document.id} deleted successfully`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <IconButton variant="transparent">
            <EllipsisHorizontal />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            className="gap-x-2"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash />
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
      <DeletePrompt
        handleDelete={handleDelete}
        loading={loading}
        open={deleteOpen}
        setOpen={setDeleteOpen}
      />
    </>
  );
}