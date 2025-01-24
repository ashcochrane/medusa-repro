import { createSelectParams } from "@medusajs/medusa/api/utils/validators";
import z from "zod";

export type AdminGetDocumentParamsType = z.infer<typeof AdminGetDocumentParams>;
export const AdminGetDocumentParams = createSelectParams();

export type AdminLinkProductsDocumentType = z.infer<typeof AdminLinkProductsDocument>;
export const AdminLinkProductsDocument = z.object({
  productIds: z.string().array()
})
.strict()