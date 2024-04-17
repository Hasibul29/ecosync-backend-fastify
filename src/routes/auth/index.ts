import { FastifyPluginAsync } from "fastify";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/login", async function (request, reply) {
    
    return { auth: true };
  });
  fastify.post("/logout", async function (request, reply) {
    return { auth: true };
  });
};

export default auth;
