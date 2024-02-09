import fastify from "fastify";
import { logger } from "./logger";
import { applciationsRoutes } from "../modules/applications/applications.routes";

export async function buildServer() {
  const app = fastify({ logger });

  app.register(applciationsRoutes, { prefix: "/api/applications" });

  return app;
}
