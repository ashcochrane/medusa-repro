import { model } from "@medusajs/framework/utils";
import { Employee } from "./employee";

export const Company = model.define("company", {
  id: model
    .id({
      prefix: "comp",
    })
    .primaryKey(),
  name: model.text(),
  email: model.text(),
  phone: model.text().nullable(),
  address_1: model.text().nullable(),
  address_2: model.text().nullable(),
  city: model.text().nullable(),
  province: model.text().nullable(),
  postal_code: model.text().nullable(),
  country: model.text().nullable(),
  currency_code: model.text().nullable(),
  spending_limit_reset_frequency: model
    .enum(["never", "daily", "weekly", "monthly", "yearly"])
    .default("monthly"),
  employees: model.hasMany(() => Employee),
});
