/* Company Query Config */
export const adminCompanyFields = [
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

export const adminCompanyQueryConfig = {
  list: {
    defaults: adminCompanyFields,
    isList: true,
  },
  retrieve: {
    defaults: adminCompanyFields,
    isList: false,
  },
};

/* Employee Query Config */
export const adminEmployeeFields = [
  "id",
  "spending_limit",
  "is_admin",
  "customer_id",
  "*customer",
  "company_id",
  "*company",
];

export const adminEmployeeQueryConfig = {
  list: {
    defaults: adminEmployeeFields,
    isList: true,
  },
  retrieve: {
    defaults: adminEmployeeFields,
    isList: false,
  },
};