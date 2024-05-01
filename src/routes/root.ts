import { FastifyPluginAsync } from "fastify";
import prisma from "../utils/client";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {

    await prisma.sTSEntry.create({
      data: {
        arrivalTime: new Date(),
        departureTime: new Date(),
        wasteVolume: 0,
        // vehicleId
        stsId: "1bf232b1-2e6f-4f8b-b2a2-22351a5dcfc2",
        vehicleId: "5730ffac-0d5f-4843-949e-4e1d3f14d379",
        // stsId: "1bf232b1-2e6f-4f8b-b2a2-22351a5dcfc2",
        // vehicle: {
        //   connect: {
        //     vehicleNumber:"3453",
        //     // stsId: "63ea238d-5153-4d15-bbeb-feacb4171c79"
        //   }
        // },
      }
    })
    const data  = await prisma.sTSEntry.findMany({
      include: {
        // vehicle: {
        //   include: {
        //     sts: true
        //   }
        // }
        sts: {
          include: {
            Vehicle: true
          }
        }
      }
    })
    return { root: data };
  });
};

export default root;
