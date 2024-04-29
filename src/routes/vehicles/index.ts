import { FastifyPluginAsync } from "fastify";
import prisma from "../../utils/client";
import { ApiResponse, errorResponse } from "../../constants/constants";
import { Prisma, Vehicle } from "@prisma/client";
import { Permissions } from "../../permissions";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.VehiclesRead),
      ],
    },
    async function (request, reply) {
      try {
        const data = await prisma.vehicle.findMany({});

        return reply.status(200).send({
          success: true,
          message: "Vehicle List.",
          data: data,
        } as ApiResponse<Vehicle[]>);
      } catch (error) {
        console.log("Get Vehicle List:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.post(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.VehiclesWrite),
      ],
    },
    async function (request, reply) {
      try {
        const {
          vehicleNumber,
          vehicleType,
          capacity,
          fuelCostLoaded,
          fuelCostUnloaded,
        } = request.body as Vehicle;
        const data = await prisma.vehicle.create({
          data: {
            vehicleNumber: vehicleNumber,
            vehicleType: vehicleType,
            capacity: capacity,
            fuelCostLoaded: fuelCostLoaded,
            fuelCostUnloaded: fuelCostUnloaded,
          },
        });

        return reply.status(201).send({
          success: true,
          message: "Vehicle Registered.",
          data: data,
        } as ApiResponse<Vehicle>);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            return reply.status(404).send({
              success: false,
              message: "Vehicle already exist.",
            } as ApiResponse);
          }
        }
        console.log("Get Vehicle List:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.put(
    "/:vehicleId",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.VehiclesUpdate),
      ],
    },
    async function (request, reply) {
      try {
        
        const { vehicleId } = request.params as { vehicleId: string };
        const { fuelCostLoaded, fuelCostUnloaded } =
          request.body as Partial<Vehicle>;
        const updatedData: Partial<Vehicle> = {};

        if (fuelCostLoaded !== undefined)
          updatedData.fuelCostLoaded = fuelCostLoaded;
        if (fuelCostUnloaded !== undefined)
          updatedData.fuelCostUnloaded = fuelCostUnloaded;

        const data = await prisma.vehicle.update({
          where: {
            id: vehicleId,
          },
          data: updatedData,
        });

        return reply.status(200).send({
          success: true,
          message: "Vehicle Updated.",
          data: data,
        } as ApiResponse<Vehicle>);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return reply.status(404).send({
              success: false,
              message: "Vehicle not found.",
            } as ApiResponse);
          }
        }
        console.log("Update Vehicle:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.delete(
    "/:vehicleId",
    {
      preHandler: [
        fastify.authenticate,
        // fastify.permission(Permissions.VehiclesDelete),
      ],
    },
    async function (request, reply) {
      try {
        const { vehicleId } = request.params as { vehicleId: string };

        await prisma.vehicle.delete({
          where: {
            id: vehicleId,
          },
        });

        return reply.status(200).send({
          success: true,
          message: "Vehicle Deleted.",
        } as ApiResponse);

      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return reply.status(404).send({
              success: false,
              message: "Vehicle not found.",
            } as ApiResponse);
          }
        }
        console.log("Delete Vehicle:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );
};

export default root;
