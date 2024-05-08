import { FastifyPluginAsync } from "fastify";
import prisma from "../../utils/client";
import { ApiResponse, errorResponse } from "../../constants/constants";
import {
  Prisma,
  STS,
  STSEntry,
  TodaysFleet,
  User,
  Vehicle,
} from "@prisma/client";
import { Permissions } from "../../permissions";

interface SuggestedVehicle extends Vehicle {
  isSuggested: boolean;
}

const sts: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.STSRead),
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
        fastify.permission(Permissions.STSWrite),
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
        fastify.permission(Permissions.STSUpdate),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId } = request.params as { stsId: string };
        const { name, wardNo, capacity, latitude, longitude } =
          request.body as Partial<STS>;
        const updatedData: Partial<STS> = {};

        if (name !== undefined) {
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
        fastify.permission(Permissions.STSDelete),
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
        fastify.permission(Permissions.STSVehicleWrite),
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

        if (vehicle?.stsId !== null) {
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
        fastify.permission(Permissions.STSVehicleRead),
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
        fastify.permission(Permissions.STSVehicleDelete),
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
        fastify.permission(Permissions.STSManagerWrite),
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
        if (user?.stsId !== null) {
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
        fastify.permission(Permissions.STSManagerRead),
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
          },
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
        fastify.permission(Permissions.STSManagerDelete),
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

  fastify.post(
    "/entry/:userId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.STSEntryWrite),
      ],
    },
    async function (request, reply) {
      try {
        const { userId } = request.params as { userId: string };

        const { arrivalTime, wasteVolume, departureTime } =
          request.body as STSEntry;
        const { vehicleNumber } = request.body as Vehicle;

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            role: true,
          },
        });

        if (user?.stsId === null) {
          return reply.status(400).send({
            success: false,
            message: "User is not assigned to any STS.",
          });
        }

        const data = await prisma.sTSEntry.create({
          data: {
            arrivalTime: new Date(arrivalTime),
            departureTime: new Date(departureTime),
            wasteVolume: wasteVolume,
            sts: {
              connect: {
                id: user?.stsId,
              },
            },
            vehicle: {
              connect: {
                vehicleNumber: vehicleNumber,
              },
            },
          },
        });
        return reply.status(200).send({
          success: true,
          message: "STS Entry Created.",
          data: data,
        } as ApiResponse<STSEntry>);
      } catch (error) {
        console.log("Create STS Entry:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.get(
    "/entry/:userId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.STSEntryRead),
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

        if (user?.stsId === null && user.role.name !== "Admin") {
          return reply.status(400).send({
            success: false,
            message: "User is not assigned to any STS.",
          });
        }

        let whereCondition = {};

        if (user?.stsId !== null) {
          whereCondition = {
            stsId: user?.stsId,
          };
        }

        const data = await prisma.sTSEntry.findMany({
          where: whereCondition,
          include: {
            vehicle: true,
            sts: true,
          },
        });

        return reply.status(200).send({
          success: true,
          message: "STS Entry List.",
          data: data,
        } as ApiResponse<STSEntry[]>);
      } catch (error) {
        console.log("Get STS Entry:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.get(
    "/manager/vehicle/:stsId",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.STSManagerVehicleRead),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId } = request.params as { stsId: string };

        if(!stsId) {
          return reply.status(400).send({
            success: false,
            message: "User is not assigned to any STS.",
          });
        }
        
        const vehicle = await prisma.vehicle.findMany({
          where: {
            stsId: stsId,
          },
        });

        let data: SuggestedVehicle[] = [];
        const wasteVolume = await prisma.sTS
          .findUnique({
            where: {
              id: stsId,
            },
            select: {
              capacity: true,
            },
          })
          .then((res) => res?.capacity || 0);

        const sleectedFleet = await prisma.todaysFleet.findUnique({
          where: {
            date_stsId: {
              date: new Date().toISOString().split("T")[0],
              stsId: stsId,
            },
          },
          include: {
            vehicles: true,
          },
        });

        const fleet = optimizedFleet(vehicle, wasteVolume);

        data = vehicle
          .map((vehicle) => {
            return {
              ...vehicle,
              isSuggested: fleet.includes(vehicle),
            };
          })
          .sort((a, b) => (a.isSuggested ? -1 : 1));
        if (sleectedFleet) {
          console.log("sleectedFleet", sleectedFleet);
          // remove the sleectedFleet from fleet
          data = data.filter((vehicle) => {
            return !sleectedFleet.vehicles
              .map((vehicle) => vehicle.vehicleNumber)
              .includes(vehicle.vehicleNumber);
          });
        }

        return reply.status(200).send({
          success: true,
          message: "Vehicle List.",
          data: data,
        } as ApiResponse<SuggestedVehicle[]>);
      } catch (error) {
        console.log("Get STS Vehicle List:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.post(
    "/:stsId/todays-fleet",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.STSVehicleTodaysFleetWrite),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId } = request.params as { stsId: string };
        const { vehicles } = request.body as {
          vehicles: Partial<SuggestedVehicle>[];
        };
        console.log(request.body);

        const data = await prisma.todaysFleet.upsert({
          create: {
            date: new Date().toISOString().split("T")[0],
            stsId: stsId,
            vehicles: {
              connect: [
                ...vehicles.map((vehicle) => ({
                  vehicleNumber: vehicle.vehicleNumber,
                })),
              ],
            },
          },
          update: {
            vehicles: {
              connect: [
                ...vehicles.map((vehicle) => ({
                  vehicleNumber: vehicle.vehicleNumber,
                })),
              ],
            },
          },
          where: {
            date_stsId: {
              date: new Date().toISOString().split("T")[0],
              stsId: stsId,
            },
          },
          include: {
            vehicles: true,
          },
        });
        return reply.status(200).send({
          success: true,
          message: "Todays Fleet Created.",
          data: data,
        } as ApiResponse<TodaysFleet>);
      } catch (error) {
        console.log("Create Todays Fleet:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.get(
    "/:stsId/todays-fleet",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.STSVehicleTodaysFleetRead),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId } = request.params as { stsId: string };

        if(!stsId) {
          return reply.status(400).send({
            success: false,
            message: "User is not assigned to any STS.",
          });
        }

        const data = await prisma.todaysFleet.findUnique({
          where: {
            date_stsId: {
              date: new Date().toISOString().split("T")[0],
              stsId: stsId,
            },
          },
          include: {
            vehicles: true,
          },
        });
        return reply.status(200).send({
          success: true,
          message: "Todays Fleet.",
          data: data,
        } as ApiResponse<TodaysFleet>);
      } catch (error) {
        console.log("Get Todays Fleet:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.delete(
    "/:stsId/todays-fleet/:vehicleNumber",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.STSVehicleTodaysFleetDelete),
      ],
    },
    async function (request, reply) {
      try {
        const { stsId, vehicleNumber } = request.params as {
          stsId: string;
          vehicleNumber: string;
        };
        await prisma.todaysFleet.update({
          where: {
            date_stsId: {
              date: new Date().toISOString().split("T")[0],
              stsId: stsId,
            },
          },
          data: {
            vehicles: {
              disconnect: {
                vehicleNumber: vehicleNumber,
              },
            },
          },
        });
        return reply.status(200).send({
          success: true,
          message: "Vehicle Deleted From Fleet.",
        } as ApiResponse);
      } catch (error) {
        console.log("Delete Vehicle:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );
};

function optimizedFleet(vehicles: Vehicle[], wasteVolume: number): Vehicle[] {
  const n = vehicles.length;
  const memo: { [key: string]: Vehicle[] } = {};

  function dp(
    remainingWasteVolume: number,
    currentIndex: number,
    trips: number[]
  ): Vehicle[] {
    if (currentIndex === n) {
      return [];
    }

    const memoKey = `${remainingWasteVolume},${currentIndex}`;
    if (memo.hasOwnProperty(memoKey)) {
      return memo[memoKey];
    }

    const currentVehicle = vehicles[currentIndex];

    const maxTrips = Math.min(
      3 - trips[currentIndex],
      Math.floor(remainingWasteVolume / wastePerTrip(currentVehicle))
    );

    let bestOption: Vehicle[] = [];

    let bestWasteCollected = 0;
    let bestFuelCost = Infinity;
    let bestNumTrucks = Infinity;

    for (let numTrips = 0; numTrips <= maxTrips; numTrips++) {
      const nextWasteVolume =
        remainingWasteVolume - numTrips * wastePerTrip(currentVehicle);

      const option = dp(nextWasteVolume, currentIndex + 1, trips.slice());

      const currentOption = Array(numTrips).fill(currentVehicle);
      const currentTotalOption = [...currentOption, ...option];

      const currentWasteCollected = getTotalWasteCollected(currentTotalOption);
      const currentFuelCost = getTotalFuelCost(currentTotalOption);
      const currentNumTrucks = currentOption.length;

      if (
        currentWasteCollected > bestWasteCollected ||
        (currentWasteCollected === bestWasteCollected &&
          currentFuelCost < bestFuelCost) ||
        (currentWasteCollected === bestWasteCollected &&
          currentFuelCost === bestFuelCost &&
          currentNumTrucks < bestNumTrucks)
      ) {
        bestOption = currentTotalOption;
        bestWasteCollected = currentWasteCollected;
        bestFuelCost = currentFuelCost;
        bestNumTrucks = currentNumTrucks;
      }
    }

    memo[memoKey] = bestOption;
    return bestOption;
  }

  function wastePerTrip(vehicle: Vehicle): number {
    return vehicle.capacity;
  }

  function getTotalWasteCollected(vehicleList: Vehicle[]): number {
    return vehicleList.reduce(
      (totalWaste, vehicle) => totalWaste + wastePerTrip(vehicle),
      0
    );
  }

  function getTotalFuelCost(vehicleList: Vehicle[]): number {
    return vehicleList.reduce(
      (totalCost, vehicle) => totalCost + vehicle.fuelCostLoaded,
      0
    );
  }

  const initialTrips = Array(n).fill(0);
  return dp(wasteVolume, 0, initialTrips);
}

export default sts;
