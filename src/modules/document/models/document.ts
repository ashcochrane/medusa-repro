import { model } from "@medusajs/framework/utils";

export const Document = model.define("document", {
  id: model
    .id({
      prefix: "doc",
    })
    .primaryKey(),
  url: model.text(),
})