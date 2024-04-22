import { FastifyPluginAsync } from "fastify";
import prisma, { Role, Permission } from "../../utils/client";
import { ApiResponse, errorResponse } from "../../constants/constants";
import { Prisma } from "@prisma/client";
import { Permissions } from "../../permissions";

const rbac: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/roles",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.RolesRead)
      ],
    },
    async function (request, reply) {
      try {
        const data = await prisma.role.findMany({
          include: {
            permissions: true,
          },
        });
        return reply.send({
          success: true,
          message: "Roles list with permissions.",
          data: data,
        } as ApiResponse<Role[]>);
      } catch (error) {
        console.log("Roles", error);
        return reply.status(200).send(errorResponse);
      }
    }
  );

  fastify.post(
    "/roles",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.RolesWrite)
      ],
    },
    async function (request, reply) {
      try {
        const { name, description } = request.body as {
          name: string;
          description: string;
        };
        const data = await prisma.role.create({
          data: {
            name: name,
            description: description,
          },
        });
        return reply.send({
          success: true,
          message: "Role added Successfully.",
          data: data,
        } as ApiResponse<Role>);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            return reply.status(404).send({
              success: false,
              message: "Role already exist.",
            } as ApiResponse<null>);
          }
        }
        console.log("Role add :", error);
        return reply.status(200).send(errorResponse);
      }
    }
  );

  fastify.delete(
    "/roles/:roleId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.RolesDelete)
      ],
    },
    async function (request, reply) {
      try {
        const { roleId } = request.params as {
          roleId: string;
        };
        const data = await prisma.role.delete({
          where: {
            id: roleId,
          },
        });
        return reply.send({
          success: true,
          message: "Role deleted Successfully.",
          data: data,
        } as ApiResponse<Role>);
      } catch (error) {
        console.log("Role delete :", error);
        return reply.status(200).send(errorResponse);
      }
    }
  );

  fastify.post(
    "/:roleId/permissions",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.RolesPermission)
      ],
    },
    async function (request, reply) {
      try {
        const { roleId } = request.params as { roleId: string };
        const { permissionId } = request.body as {
          permissionId: string;
        };
        const data = await prisma.role.update({
          data: {
            permissions: {
              connect: {
                id: permissionId,
              },
            },
          },
          where: {
            id: roleId,
          },
        });
        return reply.send({
          success: true,
          message: "Permission added Successfully.",
          data: data,
        } as ApiResponse<Role>);
      } catch (error) {
        console.log("Permission add :", error);
        return reply.status(200).send(errorResponse);
      }
    }
  );

  fastify.delete(
    "/:roleId/permissions",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.RolesPermissionDelete)
      ],
    },
    async function (request, reply) {
      try {
        const { roleId } = request.params as { roleId: string };
        const { permissionId } = request.body as {
          permissionId: string;
        };
        const data = await prisma.role.update({
          data: {
            permissions: {
              disconnect: {
                id: permissionId,
              },
            },
          },
          where: {
            id: roleId,
          },
        });
        return reply.send({
          success: true,
          message: "Permission deleted Successfully.",
          data: data,
        } as ApiResponse<Role>);
      } catch (error) {
        console.log("Permission delete :", error);
        return reply.status(200).send(errorResponse);
      }
    }
  );

  fastify.get(
    "/permissions",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.PermissionsRead)
      ],
    },
    async function (request, reply) {
      try {
        const data = await prisma.permission.findMany();
        return reply.send({
          success: true,
          message: "Permissions list.",
          data: data,
        } as ApiResponse<Permission[]>);
      } catch (error) {
        console.log("Roles", error);
        return reply.status(200).send(errorResponse);
      }
    }
  );
};

export default rbac;
