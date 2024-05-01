import { FastifyPluginAsync } from "fastify";
import prisma from "../../utils/client";
import { ApiResponse, errorResponse } from "../../constants/constants";
import { Prisma, STS, User, Vehicle } from "@prisma/client";
// import { Permissions } from "../../permissions";

const sts: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.STSRead),
      ],
    },
    async function (request, reply) {
      try {
        const data = await prisma.sTS.findMany({});

        return reply.status(200).send({
          success: true,
          message: "STS List.",
          data: data,
        } as ApiResponse<STS[]>);
      } catch (error) {
        console.log("Get STS List:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.post(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.STSWrite),
      ],
    },
    async function (request, reply) {
      try {
        const { name, wardNo, capacity, latitude, longitude } =
          request.body as STS;
        const data = await prisma.sTS.create({
          data: {
            name: name,
            wardNo: wardNo,
            capacity: capacity,
            latitude: latitude,
            longitude: longitude,
          },
        });

        return reply.status(201).send({
          success: true,
          message: "STS Registered.",
          data: data,
        } as ApiResponse<STS>);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            return reply.status(400).send({
              success: false,
              message: "STS already exist.",
            } as ApiResponse);
          }
        }
        console.log("Get Vehicle List:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.put(
    "/:stsId",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.STSUpdate),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId } = request.params as { stsId: string };
        const {name, wardNo, capacity, latitude, longitude } =
          request.body as Partial<STS>;
        const updatedData: Partial<STS> = {};

        if(name !== undefined) {
          updatedData.name = name;
        }

        if (wardNo !== undefined) {
          updatedData.wardNo = wardNo;
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

        const data = await prisma.sTS.update({
          where: {
            id: stsId,
          },
          data: updatedData,
        });

        return reply.status(200).send({
          success: true,
          message: "STS Updated.",
          data: data,
        } as ApiResponse<STS>);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return reply.status(404).send({
              success: false,
              message: "STS not found.",
            } as ApiResponse);
          }
        }
        console.log("Update STS:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.delete(
    "/:stsId",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.STSDelete),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId } = request.params as { stsId: string };

        await prisma.sTS.delete({
          where: {
            id: stsId,
          },
        });

        return reply.status(200).send({
          success: true,
          message: "STS Deleted.",
        } as ApiResponse);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return reply.status(404).send({
              success: false,
              message: "STS not found.",
            } as ApiResponse);
          }
        }
        console.log("Delete STS:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.post(
    "/vehicle",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.STSVehicleWrite),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId, vehicleId } = request.body as {
          stsId: string;
          vehicleId: string;
        };

        const vehicle = await prisma.vehicle.findUnique({
          where: {
            id: vehicleId,
          },
        });

        if (vehicle?.stsId !== undefined) {
          return reply.status(400).send({
            success: false,
            message: "Vehicle already added to another STS.",
          } as ApiResponse);
        }

        await prisma.sTS.update({
          where: {
            id: stsId,
          },
          data: {
            Vehicle: {
              connect: {
                id: vehicleId,
              },
            },
          },
        });

        return reply.status(201).send({
          success: true,
          message: "Vehicle Added.",
        } as ApiResponse);
      } catch (error) {
        console.log("Add Vehicle:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );
  fastify.get(
    "/vehicle/:stsId",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.STSVehicleRead),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId } = request.params as { stsId: string };

        const data = await prisma.vehicle.findMany({
          where: {
            stsId: stsId,
          },
        });
        data;
        return reply.status(200).send({
          success: true,
          message: "Vehicle List.",
          data: data,
        } as ApiResponse<Vehicle[]>);
      } catch (error) {
        console.log("Get STS Vehicle List:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.delete(
    "/vehicle/:stsId/:vehicleId",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.STSVehicleDelete),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId, vehicleId } = request.params as {
          stsId: string;
          vehicleId: string;
        };

        await prisma.sTS.update({
          where: {
            id: stsId,
          },
          data: {
            Vehicle: {
              disconnect: {
                id: vehicleId,
              },
            },
          },
        });

        return reply.status(200).send({
          success: true,
          message: "STS Vehicle Deleted.",
        } as ApiResponse);
      } catch (error) {
        console.log("Delete STS Vehicle:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.post(
    "/manager",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.STSManagerWrite),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId, userId } = request.body as {
          stsId: string;
          userId: string;
        };

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
        if(user?.stsId !== undefined) {
          return reply.status(400).send({
            success: false,
            message: "Manager already added to another STS.",
          } as ApiResponse);
        }

        await prisma.sTS.update({
          where: {
            id: stsId,
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
    "/manager/:stsId",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.STSManagerRead),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId } = request.params as { stsId: string };

        const data = await prisma.user.findMany({
          where: {
            stsId: stsId,
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
        console.log("Get STS Manager List:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.delete(
    "/manager/:stsId/:userId",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.STSManagerDelete),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId, userId } = request.params as {
          stsId: string;
          userId: string;
        };

        await prisma.sTS.update({
          where: {
            id: stsId,
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
          message: "STS Manager Deleted.",
        } as ApiResponse);
      } catch (error) {
        console.log("Delete STS manager:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );
};

export default sts;
