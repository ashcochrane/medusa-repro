import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import DocumentModule from "../modules/document";

export default defineLink(
  ProductModule.linkable.product,
  DocumentModule.linkable.document
)