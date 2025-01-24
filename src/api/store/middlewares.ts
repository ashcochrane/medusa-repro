import { MiddlewareRoute } from "@medusajs/framework";
import { storeCompaniesMiddleware } from "./companies/middlewares";
import { storeCartsMiddlewares } from "./carts/middlewares";

export const storeMiddlewares: MiddlewareRoute[] = [
  ...storeCompaniesMiddleware,
  ...storeCartsMiddlewares
]