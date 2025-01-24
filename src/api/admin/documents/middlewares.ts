import { MiddlewareRoute, validateAndTransformBody, validateAndTransformQuery } from "@medusajs/framework";
import multer from "multer";
import { adminDocumentQueryConfig } from "./query-config";
import { AdminGetDocumentParams, AdminLinkProductsDocument } from "./validators";

const upload = multer({ storage: multer.memoryStorage() })

export const adminDocumentMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admin/documents",
    middlewares: [
      validateAndTransformQuery(
        AdminGetDocumentParams, 
        adminDocumentQueryConfig.list
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/documents",
    middlewares: [
      upload.single('file'),
      validateAndTransformQuery(AdminGetDocumentParams, adminDocumentQueryConfig.retrieve),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/admin/documents/:id",
    middlewares: [],
  },
  {
    method: ["POST"],
    matcher: "/admin/documents/:id/link",
    middlewares: [
      validateAndTransformBody(AdminLinkProductsDocument),
    ],
  },
]
