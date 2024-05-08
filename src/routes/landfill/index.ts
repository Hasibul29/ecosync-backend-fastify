import { FastifyPluginAsync } from "fastify";
import prisma from "../../utils/client";
import { ApiResponse, errorResponse } from "../../constants/constants";
import {
  BillingSlip,
  Landfill,
  LandfillEntry,
  Prisma,
  User,
  Vehicle,
} from "@prisma/client";
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
        const { name, latitude, longitude, capacity, operationalTimespan } =
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
        const { name, capacity, latitude, longitude, operationalTimespan } =
          request.body as Partial<Landfill>;
        const updatedData: Partial<Landfill> = {};

        if (name !== undefined) {
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
        if (operationalTimespan !== undefined) {
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

        if (user?.landfillId !== null) {
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
          },
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

  fastify.post(
    "/entry/:userId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.LandfillEntryWrite),
      ],
    },
    async function (request, reply) {
      try {
        const { userId } = request.params as { userId: string };

        const { arrivalTime, wasteVolume, departureTime } =
          request.body as LandfillEntry;
        const { vehicleNumber } = request.body as Vehicle;

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            role: true,
          },
        });

        if (user?.landfillId === null) {
          return reply.status(400).send({
            success: false,
            message: "User is not assigned to any Landfill.",
          });
        }

        const data = await prisma.landfillEntry.create({
          data: {
            arrivalTime: new Date(arrivalTime),
            departureTime: new Date(departureTime),
            wasteVolume: wasteVolume,
            landfill: {
              connect: {
                id: user?.landfillId,
              },
            },
            vehicle: {
              connect: {
                vehicleNumber: vehicleNumber,
              },
            },
          },
        });

        const vehicle = await prisma.vehicle.findUnique({
          where: {
            vehicleNumber: vehicleNumber,
          },
        });
        const landfill = await prisma.landfill.findUnique({
          where: {
            id: user?.landfillId,
          },
        });

        const stsEntry = await prisma.sTSEntry.findMany({
          where: {
            vehicleId: vehicle?.id,
          },
          orderBy: {
            departureTime: "desc",
          },
        });

        const stsId = stsEntry.length > 0 ? stsEntry[0].stsId : vehicle?.stsId;

        const sts = await prisma.sTS.findUnique({
          where: {
            id: stsId ?? "",
          },
        });

        const travelRoute = await prisma.travelRoute.findMany({
          where: {
              sts:{ 
                every: {
                  id: stsId ?? "",
                }
              },
              landfill: {
                every: {
                  id: user?.landfillId
                }
              },
          },
          orderBy: {
            createdAt: "desc",
          }
        });

        const distance = travelRoute.length > 0 ? travelRoute[0].totalDistance : 28;
        const fuelCostLoaded = vehicle?.fuelCostLoaded ?? 0;
        const fuelCostUnloaded = vehicle?.fuelCostUnloaded ?? 0;
        const fuelCost = fuelCostUnloaded + (3/5) * (fuelCostLoaded - fuelCostUnloaded);

        await prisma.billingSlip.create({
          data: {
            wasteVolume: wasteVolume,
            vehicleNumber: vehicle?.vehicleNumber ?? "",
            landfillName: landfill?.name ?? "",
            stsName: sts?.name ?? "",
            fuelCost: distance * fuelCost,
          },
        });

        return reply.status(200).send({
          success: true,
          message: "Landfill Entry Created.",
          data: data,
        } as ApiResponse<LandfillEntry>);
      } catch (error) {
        console.log("Create Landfill Entry:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.get(
    "/entry/:userId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.LandfillEntryRead),
      ],
    },
    async function (request, reply) {
      try {
        const { userId } = request.params as { userId: string };

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            role: true,
          },
        });

        if (user?.landfillId === null && user.role.name !== "Admin") {
          return reply.status(400).send({
            success: false,
            message: "User is not assigned to any Landfill.",
          });
        }

        let whereCondition = {};

        if (user?.landfillId !== null) {
          whereCondition = {
            landfillId: user?.landfillId,
          };
        }

        const data = await prisma.landfillEntry.findMany({
          where: whereCondition,
          include: {
            vehicle: true,
            landfill: true,
          },
        });

        return reply.status(200).send({
          success: true,
          message: "Landfill Entry List.",
          data: data,
        } as ApiResponse<LandfillEntry[]>);
      } catch (error) {
        console.log("Get Landfill Entry:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.get(
    "/billing/:userId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.BillingRead),
      ],
    },
    async function (request, reply) {
      try {
        const { userId } = request.params as { userId: string };

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            role: true,
          },
        });

        if (user?.landfillId === null && user.role.name !== "Admin") {
          return reply.status(400).send({
            success: false,
            message: "User is not assigned to any Landfill.",
          });
        }

        let whereCondition = {};

        if (user?.landfillId !== null) {
          const landfill = await prisma.landfill.findUnique({
            where: {
              id: user?.landfillId,
            },
          })

          whereCondition = {
            landfillName: landfill?.name,
          };
        }

        const data = await prisma.billingSlip.findMany({
          where: whereCondition,
        });

        return reply.status(200).send({
          success: true,
          message: "Billing List.",
          data: data,
        } as ApiResponse<BillingSlip[]>);
      } catch (error) {
        console.log("Get Billing:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );
};

export default landfill;
