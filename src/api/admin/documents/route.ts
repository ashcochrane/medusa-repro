import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework';
import { ContainerRegistrationKeys, MedusaError } from '@medusajs/framework/utils';
import { createDocumentWorkflow } from 'src/workflows/document/workflow';
import { uploadFilesWorkflow } from '@medusajs/medusa/core-flows';
import { CreateDocumentDTO } from 'src/modules/document/dtos';

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data: documents, metadata } = await query.graph({
    entity: "documents",
    fields: ['id', 'url'],
    filters: req.filterableFields,
    pagination: {
      ...req.remoteQueryConfig.pagination
    },
  });

  res.json({
    documents,
    count: metadata!.count,
    offset: metadata!.skip,
    limit: metadata!.take,
  });
}

export const POST = async (
  req: AuthenticatedMedusaRequest<CreateDocumentDTO>,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  
  const input = req.file as Express.Multer.File;
  
  if (!input) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "No documents were uploaded"
    )
  }

  const { result } = await uploadFilesWorkflow(req.scope).run({
    input: {
      files: [{
        filename: input.originalname,
        mimeType: input.mimetype,
        content: input.buffer.toString("binary"),
        access: "public",
      }],
    },
  });

  // TODO: Add multiple files in at once
  const { result: createdDocument } = await createDocumentWorkflow.run({
    input: {   
      url: result[0].url
    },
    container: req.scope,
  });

  const {
    data: [document],
  } = await query.graph(
    {
      entity: "documents",
      fields: req.remoteQueryConfig.fields,
      filters: { id: createdDocument.id },
    },
    {
      throwIfKeyNotFound: true
    }
  );

  res.json({ document });
}