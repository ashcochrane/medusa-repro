import { MedusaService } from "@medusajs/framework/utils";
import { Document } from "./models";

class DocumentModuleService extends MedusaService({
  Document,
}) {}

export default DocumentModuleService;