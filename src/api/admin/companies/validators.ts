import { createSelectParams } from "@medusajs/medusa/api/utils/validators";
import company from "src/modules/company";
import { z } from "zod";

/* Company Validators */
export type AdminGetCompanyParamsType = z.infer<typeof AdminGetCompanyParams>;
export const AdminGetCompanyParams = createSelectParams();

export type AdminCreateCompanyType = z.infer<typeof AdminCreateCompany>;
export const AdminCreateCompany = z
  .object({
    name: z.string(),
    email: z.string(),
    currency_code: z.string(),
    phone: z.string().optional(),
    address_1: z.string().optional(),
    address_2: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional(),
  })
  .strict();

export type AdminUpdateCompanyType = z.infer<typeof AdminUpdateCompany>;
export const AdminUpdateCompany = z
  .object({
    name: z.string().optional(),
    email: z.string().optional(),
    currency_code: z.string().optional(),
    phone: z.string().optional(),
    address_1: z.string().optional(),
    address_2: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional(),
  })
  .strict();

/* Employee Validators */

export type AdminGetEmployeeParamsType = z.infer<typeof AdminGetEmployeeParams>;
export const AdminGetEmployeeParams = createSelectParams();

export type AdminCreateEmployeeType = z.infer<typeof AdminCreateEmployee>;
export const AdminCreateEmployee = z
  .object({
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    phone: z.string(),
    company_name: z.string(),
    spending_limit: z.number().optional(),
    raw_spending_limit: z
      .object({
        value: z.number().optional(),
        precision: z.number().optional(),
      })
      .optional(),
    is_admin: z.boolean().optional(),
    
  })
  .strict();

export type AdminUpdateEmployeeType = z.infer<typeof AdminUpdateEmployee>;
export const AdminUpdateEmployee = z
  .object({
    id: z.string(),
    spending_limit: z.number().optional(),
    raw_spending_limit: z
      .object({
        value: z.number().optional(),
        precision: z.number().optional(),
      })
      .optional(),
    is_admin: z.boolean().optional(),
  })
  .strict();