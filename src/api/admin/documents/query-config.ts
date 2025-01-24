export const defaultAdminDocumentFields = ["id", "url"];

export const adminDocumentQueryConfig = {
  list: {
    defaults: defaultAdminDocumentFields,
    isList: true,
  },
  retrieve: {
    defaults: defaultAdminDocumentFields,
    isList: false,
  }
}
