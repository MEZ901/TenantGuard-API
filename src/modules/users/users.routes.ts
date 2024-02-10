import { FastifyInstance } from "fastify";
import { createUserHandler } from "./users.controllers";
import { createUSerJsonSchema } from "./users.schemas";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", { schema: createUSerJsonSchema }, createUserHandler);
}
