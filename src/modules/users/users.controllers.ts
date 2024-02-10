import { FastifyReply, FastifyRequest } from "fastify";
import { createUserBody } from "./users.schemas";
import { SYSTEM_ROLES } from "../../config/permissions";
import { getRoleByName } from "../roles/roles.services";
import {
  assignRoleToUser,
  createUser,
  getUsersByApplication,
} from "./users.services";

export async function createUserHandler(
  request: FastifyRequest<{
    Body: createUserBody;
  }>,
  reply: FastifyReply
) {
  const { initialUser, ...data } = request.body;

  const roleName = initialUser
    ? SYSTEM_ROLES.SUPER_ADMIN
    : SYSTEM_ROLES.APPLICATION_USER;

  if (roleName === SYSTEM_ROLES.SUPER_ADMIN) {
    const appUsers = await getUsersByApplication(data.applicationId);

    if (appUsers.length > 0) {
      return reply.code(400).send({
        message: "Application already has a super admin",
        extentions: {
          code: "APPLICATION_ALREADY_HAS_SUPER_ADMIN",
          applicationId: data.applicationId,
        },
      });
    }
  }

  const role = await getRoleByName({
    name: roleName,
    applicationId: data.applicationId,
  });

  if (!role) {
    return reply.code(404).send({
      message: "Role not found",
      extentions: {
        code: "ROLE_NOT_FOUND",
        roleName,
        applicationId: data.applicationId,
      },
    });
  }

  try {
    const user = await createUser(data);

    await assignRoleToUser({
      usersId: user.id,
      rolesId: role.id,
      applicationId: data.applicationId,
    });

    return user;
  } catch (error) {}
}
