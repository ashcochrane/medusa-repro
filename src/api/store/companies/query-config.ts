
/* Store Company Query Config */
export const storeCompanyFields = [
  "id",
  "name",
  "email",
  "phone",
  "address_1",
  "address_2",
  "city",
  "province",
  "postal_code",
  "country",
  "currency_code",
  "*employees",
];

export const storeCompanyQueryConfig = {
  list: {
    defaults: storeCompanyFields,
    isList: true,
  },
  retrieve: {
    defaults: storeCompanyFields,
    isList: false,
  },
};

/* Store Employee Query Config */
export const storeEmployeeFields = [
  "id",
  "spending_limit",
  "is_admin",
  "customer_id",
  "*customer",
  "company_id",
  "*company",
];

export const storeEmployeeQueryConfig = {
  list: {
    defaults: storeEmployeeFields,
    isList: true,
  },
  retrieve: {
    defaults: storeEmployeeFields,
    isList: false,
  },
};