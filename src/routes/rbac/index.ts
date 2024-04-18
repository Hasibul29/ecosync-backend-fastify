import { FastifyPluginAsync } from "fastify";

const rbac: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return { rbac: true };
  });
};

export default rbac;
