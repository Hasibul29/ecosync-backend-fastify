import { FastifyPluginAsync } from "fastify";
import prisma, { Role, Permission } from "../../utils/client";
import { ApiResponse, errorResponse } from "../../constants/constants";
import { Prisma, User } from "@prisma/client";
import { Permissions } from "../../permissions";

const rbac: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/roles",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.RolesRead),
      ],
    },
    async function (request, reply) {
      try {
        const data = await prisma.role.findMany({});
        return reply.send({
          success: true,
          message: "Roles list with permissions.",
          data: data,
        } as ApiResponse<Role[]>);
      } catch (error) {
        console.log("Roles", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.post(
    "/roles",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.RolesWrite),
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
            return reply.status(400).send({
              success: false,
              message: "Role already exist.",
            } as ApiResponse);
          }
        }
        console.log("Role add :", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.put(
    "/roles",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.RolesUpdate),
      ],
    },
    async function (request, reply) {
      try {
        const { id, name, description } = request.body as {
          id: string;
          name: string;
          description: string;
        };
        const data = await prisma.role.update({
          where: {
            id: id,
          },
          data: {
            name: name,
            description: description,
          },
        });
        return reply.send({
          success: true,
          message: "Role updated Successfully.",
          data: data,
        } as ApiResponse<Role>);
      } catch (error) {
        console.log("Role add :", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.delete(
    "/roles/:roleId",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.RolesDelete),
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2003") {
            return reply.status(400).send({
              success: false,
              message: "Role cannot be deleted. Associated users exist.",
            } as ApiResponse);
          }
        }
        console.log("Role delete :", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );
  fastify.get(
    "/:roleId/permissions",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.RolesPermissionRead),
      ],
    },
    async function (request, reply) {
      try {
        const { roleId } = request.params as { roleId: string };
      
        const data = await prisma.permission.findMany({
          where: {
            roles: {
              some: {
                id: roleId,
              }
            }
          },
        });
        return reply.send({
          success: true,
          message: "Permissions list.",
          data: data,
        } as ApiResponse<Permission[]>);
      } catch (error) {
        console.log("Permission get :", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.post(
    "/:roleId/permissions",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.RolesPermissionWrite),
      ],
    },
    async function (request, reply) {
      try {
        const { roleId } = request.params as { roleId: string };
        const { permissionIdList } = request.body as {
          permissionIdList: string[];
        };

        const role = await prisma.role.findUnique({
          where: {
            id: roleId,
          },
          include: {
            permissions: true,
          },
        }); 
        
        const permissionIdListInRole = role?.permissions.map((permission) => {
          return permission.id;
        })

        const permissionIdListNotInRole = permissionIdListInRole?.filter((permissionId) => {
          return !permissionIdList.includes(permissionId);
        }) ?? [];

        if (permissionIdListNotInRole.length > 0) {
          await prisma.role.update({
            where: {
              id: roleId,
            },
            data: {
              permissions: {
                disconnect: permissionIdListNotInRole.map((id) => {
                  return { id };
                }),
              },
            },
          });
        }

        const data = await prisma.role.update({
          data: {
            permissions: {
              connect: permissionIdList.map((id) => {
                return { id };
              }),
            },
          },
          where: {
            id: roleId,
          },
        });
        return reply.send({
          success: true,
          message: "Permissions added Successfully.",
          data: data,
        } as ApiResponse<Role>);
      } catch (error) {
        console.log("Permission add :", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.delete(
    "/:roleId/:permissionId",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.RolesPermissionDelete),
      ],
    },
    async function (request, reply) {
      try {
        const { roleId, permissionId } = request.params as {
          roleId: string;
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
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.get(
    "/permissions",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.PermissionsRead),
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
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.get(
    "/:roleId/users",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.RolesUsersRead),
      ],
    }
    ,
    async function (request, reply) {
      try {
        const { roleId } = request.params as { roleId: string };
        const data = await prisma.user.findMany({
          where: {
            role: {
              id: {
                equals: roleId,
              }
            },
          },
        });
        return reply.send({
          success: true,
          message: "Users list.",
          data: data,
        } as ApiResponse<User[]>);
      } catch (error) {
        return reply.status(500).send(errorResponse);
      }
    }
  )

};

export default rbac;
