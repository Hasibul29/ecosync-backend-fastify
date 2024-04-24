import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../utils/client";
import { errorResponse } from "../constants/constants";

const permissionMiddleware = (permissions: string) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const userId = request.user.id;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          roleId: true,
        },
      });

      const data = await prisma.role.findUnique({
        where: {
          id: user?.roleId,
        },
        include: {
          permissions: {
            where: {
              name: permissions,
            },
          },
        },
      });

      if (!data || data.permissions.length === 0) {
        return reply.code(403).send({ success: false, message: "Forbidden" });
      }
    } catch (error) {
      console.log("Permission Check:", error);
      return reply.status(500).send(errorResponse);
    }
  };
};

export default permissionMiddleware;
