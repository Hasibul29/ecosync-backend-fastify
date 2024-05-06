import { User } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";
import { ApiResponse, errorResponse } from "../../constants/constants";
import { Permissions } from "../../permissions";
import prisma from "../../utils/client";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {


    fastify.get("/",async function (request, reply) {
        return "Hello World"
    })


  fastify.get(
    "/:userId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.ProfileRead),
      ],
    },
    async function (request, reply) {
      try {
        const { userId } = request.params as { userId: string };

        if (userId !== request.user.id) {
          return reply.status(403).send({
            success: false,
            message: "Forbidden",
          } as ApiResponse<User>);
        }

        const data = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            role: {
              include: {
                permissions: true,
              },
            },
          },
        });
        reply.status(200).send({
          success: true,
          message: "Profile Data",
          data: data,
        } as ApiResponse<User>);
      } catch (error) {
        console.log(error);
        reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.put(
    "/:userId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.ProfileUpdate),
      ],
    },
    async function (request, reply) {
      try {
        const { userId } = request.params as { userId: string };
        const { firstName, lastName } = request.body as User;

        if (userId !== request.user.id) {
          return reply.status(403).send({
            success: false,
            message: "Forbidden",
          } as ApiResponse<User>);
        }

        const data = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            firstName: firstName,
            lastName: lastName,
          },
          include: {
            role: {
              include: {
                permissions: true,
              },
            },
          },
        });

        reply.status(200).send({
          success: true,
          message: "Profile Updated",
          data: data,
        } as ApiResponse<User>);
      } catch (error) {
        reply.status(500).send(errorResponse);
      }
    }
  );
};

export default root;
