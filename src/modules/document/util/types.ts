import { BaseFilterable, Context, FindConfig, IModuleService, RestoreReturn } from "@medusajs/framework/types";

// TODO: Should I move these types to engage/types?

// TODO: TOMORROW CHANGE THE DOCUMENT EITHER HOLD TITLE OR NOT HOLD TITLE

export interface ModuleDocumentFilters
  extends BaseFilterable<ModuleDocumentFilters> {
  q?: string;
  id?: string | string[];
}

export type ModuleDocument = {
  id: string;
  url: string;
  created_at: Date;
  updated_at: Date;
}

export type ModuleDeleteDocument = {
  id: string;
};

export interface ModuleUpdateDocument extends Partial<ModuleCreateDocument> {
  id: string;
}

export type ModuleCreateDocument = {
  url: string;
}

export interface IDocumentModuleService extends IModuleService {
  createDocuments(
    data: ModuleCreateDocument,
    sharedContext?: Context
  ): Promise<ModuleDocument>;

  listDocuments(
    filters?: ModuleDocumentFilters,
    config?: FindConfig<ModuleDocument>,
    sharedContext?: Context
  ): Promise<ModuleDocument[]>;

  deleteDocuments(ids: string[], sharedContext?: Context): Promise<void>;

  softDeleteDocuments(ids: string[], sharedContext?: Context): Promise<void>;

  restoreDocuments<TReturnableLinkableKeys extends string = string>(
    ids: string[],
    config?: RestoreReturn<TReturnableLinkableKeys>,
    sharedContext?: Context
  ): Promise<Record<TReturnableLinkableKeys, string[]> | void>;
}