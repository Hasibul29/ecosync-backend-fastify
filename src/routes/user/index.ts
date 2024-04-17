import { FastifyPluginAsync } from "fastify";
import prisma, { User } from "../../client";

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/create", async (request, reply) => {
    const body: User = request.body as User;

    const data = await prisma.user
      .create({
        data: {
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          role: {
            connect: {
              id: "95368932-006f-48eb-bcb0-24bc2e90580b",
            },
          },
        },
      })
      .catch((e) => e);
    return reply.status(201).send(data);
  });

  fastify.get("/", async (request, reply) => {
    const data = await prisma.user
      .findMany({
        include: {
          role: true,
        },
      })
      .catch((e) => e);
    return reply.status(200).send(data);
  });
};

export default user;
