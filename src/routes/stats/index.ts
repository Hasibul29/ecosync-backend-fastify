import { FastifyPluginAsync } from "fastify";
import prisma from "../../utils/client";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    const totalVehicle = await prisma.vehicle.count();
    const totalSts = await prisma.sTS.count();
    const totalLandfill = await prisma.landfill.count();
    const totalUser = await prisma.user.count();
    const totalGurbadgeCollected = (await prisma.sTSEntry.findMany({})).reduce(
      (acc, cur) => acc + cur.wasteVolume, 0.0
    );
    const totalGurbadgeDisposed = (await prisma.landfillEntry.findMany({})).reduce(
        (acc, cur) => acc + cur.wasteVolume, 0.0
    );
    // const totalCost = 0;

    const landfillLocation = (await prisma.landfill.findMany({})).map(landfill => {
      return {
        latitude: landfill.latitude,
        longitude: landfill.longitude
      }
    });
    const stsLocation = (await prisma.sTS.findMany({})).map(sts => {
      return {
        latitude: sts.latitude,
        longitude: sts.longitude
      }
    })

    
    return {
      data: {
        totalVehicle,
        totalSts,
        totalLandfill,
        totalUser,
        totalGurbadgeCollected,
        totalGurbadgeDisposed,
        landfillLocation,
        stsLocation
      },
    };
  });
};

export default root;

// billing