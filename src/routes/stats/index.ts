import { FastifyPluginAsync } from "fastify";
import prisma from "../../utils/client";
import { statsSchema } from "./schema";
import { errorResponse } from "../../constants/constants";

const stats: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    {
      schema: statsSchema,
    },
    async function (request, reply) {
      try {
        const totalVehicle = await prisma.vehicle.count();
        const totalSts = await prisma.sTS.count();
        const totalLandfill = await prisma.landfill.count();
        const totalUser = await prisma.user.count();
        const totalGurbadgeCollected = (
          await prisma.sTSEntry.findMany({})
        ).reduce((acc, cur) => acc + cur.wasteVolume, 0.0);
        const totalGurbadgeDisposed = (
          await prisma.landfillEntry.findMany({})
        ).reduce((acc, cur) => acc + cur.wasteVolume, 0.0);
        // const totalCost = 0;
  
        const landfill = (await prisma.landfill.findMany({})).map((landfill) => {
          return {
            name: landfill.name,
            capacity: landfill.capacity,
            latitude: landfill.latitude,
            longitude: landfill.longitude,
          };
        });
        const sts = (await prisma.sTS.findMany({})).map((sts) => {
          return {
            name: sts.name,
            capacity: sts.capacity,
            latitude: sts.latitude,
            longitude: sts.longitude,
          };
        });
        
        return reply.code(200).send({ 
          success: true,
          message: "Stats data fetched successfully",
          data: {
            totalVehicle,
            totalSts,
            totalLandfill,
            totalUser,
            totalGurbadgeCollected,
            totalGurbadgeDisposed,
            landfill,
            sts,
          },
        }) 
      } catch (error) {
        console.log("Stats data error ",error);
        return reply.code(500).send(errorResponse);
      }
    }
  );
};

export default stats;

// billing
