import { TravelRoute, Vehicle } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";
import prisma from "../../utils/client";
import { ApiResponse, errorResponse } from "../../constants/constants";

interface RouteRegist extends TravelRoute {
  stsId: string;
  landfillId: string;
  vehicleList: Vehicle[];
}

const map: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", async function (request, reply) {
    try {
      const {
        routeList,
        totalDistance,
        totalTime,
        wayPoints,
        landfillId,
        stsId,
        vehicleList,
      } = request.body as RouteRegist;

      const data = await prisma.travelRoute.create({
        data: {
          totalTime: totalTime,
          totalDistance: totalDistance,
          routeList: JSON.stringify(routeList),
          wayPoints: JSON.stringify(wayPoints),
          vehicle: {
            connect: vehicleList.map((vehicle) => ({ id: vehicle.id })),
          },
          landfill: {
            connect: {
              id: landfillId,
            },
          },
          sts: {
            connect: {
              id: stsId,
            },
          },
        },
      });

      return reply.send({ success: true, message: "Route added successfully." ,data: data } as ApiResponse<TravelRoute>);
    } catch (error) {
      console.log(error);
      return reply.status(500).send(errorResponse);
    }
  });
};

export default map;
