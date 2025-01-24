import { Module } from "@medusajs/framework/utils";
import DompanyModuleService from "./service";

export const DOCUMENT_MODULE = "document";

export default Module(DOCUMENT_MODULE, {
  service: DompanyModuleService,
});