import { defineRouteConfig } from "@medusajs/admin-sdk";
import { DocumentSeries } from "@medusajs/icons";
import { Container, Heading, Table, Text, Toaster } from "@medusajs/ui";
import { useDocuments } from "../../hooks/documents";
import { DocumentDTO } from "../../../modules/document/dtos";
import { DocumentCreateDrawer } from "../../components/documents/document-create-drawer";
import { DocumentActionsMenu } from "../../components/documents";

const Documents = () => {
  const { data, loading, refetch } = useDocuments();

  return (
    <>
      <Container className="flex flex-col p-0 overflow-hidden">
        <div className="p-6 flex justify-between">
          <Heading>Documents</Heading>
          <DocumentCreateDrawer refetch={refetch} />
        </div>
        {loading && <Text>Loading...</Text>}
        <Table>
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell>URL</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {data?.documents && (
            <Table.Body>
              {data.documents.map((document: DocumentDTO) => (
                <Table.Row
                  key={document.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    (window.location.href = document.url)
                  }
                >
                  <Table.Cell>{document.url}</Table.Cell>
                  <Table.Cell onClick={(e) => e.stopPropagation()}>
                    <DocumentActionsMenu document={document} refetch={refetch} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table>
      </Container>
      <Toaster />
    </>
  );
};

export const config = defineRouteConfig({
  label: "Documents",
  icon: DocumentSeries,
});


export default Documents;