import { FastifyPluginAsync } from "fastify";
import prisma from "../../utils/client";
import { ApiResponse, errorResponse } from "../../constants/constants";
import { Landfill, Prisma, User } from "@prisma/client";
import { Permissions } from "../../permissions";

const landfill: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.LandfillRead),
      ],
    },
    async function (request, reply) {
      try {
        const data = await prisma.landfill.findMany({});

        return reply.status(200).send({
          success: true,
          message: "Landfill List.",
          data: data,
        } as ApiResponse<Landfill[]>);
      } catch (error) {
        console.log("Get Landfill List:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.post(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.LandfillWrite),
      ],
    },
    async function (request, reply) {
      try {
        const { name,latitude,longitude,capacity,operationalTimespan } =
          request.body as Landfill;
        const data = await prisma.landfill.create({
          data: {
            name: name,
            capacity: capacity,
            latitude: latitude,
            longitude: longitude,
            operationalTimespan: operationalTimespan,
          },
        });

        return reply.status(201).send({
          success: true,
          message: "Landfill Registered.",
          data: data,
        } as ApiResponse<Landfill>);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            return reply.status(400).send({
              success: false,
              message: "Landfill already exist.",
            } as ApiResponse);
          }
        }
        console.log("regist Landfill:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.put(
    "/:landfillId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.LandfillUpdate),
      ],
    },
    async function (request, reply) {
      try {
        const { landfillId } = request.params as { landfillId: string };
        const {name, capacity, latitude, longitude,operationalTimespan } =
          request.body as Partial<Landfill>;
        const updatedData: Partial<Landfill> = {};

        if(name !== undefined) {
          updatedData.name = name;
        }
        if (capacity !== undefined) {
          updatedData.capacity = capacity;
        }
        if (latitude !== undefined) {
          updatedData.latitude = latitude;
        }
        if (longitude !== undefined) {
          updatedData.longitude = longitude;
        }
        if(operationalTimespan !== undefined) {
          updatedData.operationalTimespan = operationalTimespan;
        }

        const data = await prisma.landfill.update({
          where: {
            id: landfillId,
          },
          data: updatedData,
        });

        return reply.status(200).send({
          success: true,
          message: "Landfill Updated.",
          data: data,
        } as ApiResponse<Landfill>);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return reply.status(404).send({
              success: false,
              message: "Landfill not found.",
            } as ApiResponse);
          }
        }
        console.log("Update Landfill:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.delete(
    "/:landfillId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.LandfillDelete),
      ],
    },
    async function (request, reply) {
      try {
        const { landfillId } = request.params as { landfillId: string };

        await prisma.landfill.delete({
          where: {
            id: landfillId,
          },
        });

        return reply.status(200).send({
          success: true,
          message: "Landfill Deleted.",
        } as ApiResponse);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return reply.status(404).send({
              success: false,
              message: "Landfill not found.",
            } as ApiResponse);
          }
        }
        console.log("Delete Landfill:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.post(
    "/manager",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.LandfillManagerWrite),
      ],
    },
    async function (request, reply) {
      try {
        const { landfillId, userId } = request.body as {
          landfillId: string;
          userId: string;
        };

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        if(user?.landfillId !== null) {
          return reply.status(400).send({
            success: true,
            message: "Manager Already Added to another Landfill.",
          } as ApiResponse);
        }

        await prisma.landfill.update({
          where: {
            id: landfillId,
          },
          data: {
            User: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return reply.status(201).send({
          success: true,
          message: "Manager Added.",
        } as ApiResponse);
      } catch (error) {
        console.log("Add Manager:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );
  fastify.get(
    "/manager/:landfillId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.LandfillManagerRead),
      ],
    },
    async function (request, reply) {
      try {
        const { landfillId } = request.params as { landfillId: string };

        const data = await prisma.user.findMany({
          where: {
            landfillId: landfillId,
          },
          include: {
            role: true,
          }
        });
        data;
        return reply.status(200).send({
          success: true,
          message: "Manager List.",
          data: data,
        } as ApiResponse<User[]>);
      } catch (error) {
        console.log("Get Landfill Manager List:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.delete(
    "/manager/:landfillId/:userId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.LandfillManagerDelete),
      ],
    },
    async function (request, reply) {
      try {
        const { landfillId, userId } = request.params as {
          landfillId: string;
          userId: string;
        };

        await prisma.landfill.update({
          where: {
            id: landfillId,
          },
          data: {
            User: {
              disconnect: {
                id: userId,
              },
            },
          },
        });

        return reply.status(200).send({
          success: true,
          message: "Landfill Manager Deleted.",
        } as ApiResponse);
      } catch (error) {
        console.log("Delete Landfill manager:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );
};

export default landfill;
