import fastify from "fastify";
import { logger } from "./logger";
import { applciationsRoutes } from "../modules/applications/applications.routes";
import { usersRoutes } from "../modules/users/users.routes";

export async function buildServer() {
  const app = fastify({ logger });

  app.register(applciationsRoutes, { prefix: "/api/applications" });
  app.register(usersRoutes, { prefix: "/api/users" });

  return app;
}
