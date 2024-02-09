import { FastifyReply, FastifyRequest } from "fastify";
import { createApplicationBody } from "./applications.schemas";
import { createApplication, getApplications } from "./applications.services";

export async function createApplicationHandler(
  request: FastifyRequest<{
    Body: createApplicationBody;
  }>,
  reply: FastifyReply
) {
  const { name } = request.body;

  const application = await createApplication({ name });

  return { application };
}

export async function getApplicationsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const applications = await getApplications();

  return { applications };
}
