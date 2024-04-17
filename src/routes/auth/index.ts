import { FastifyPluginAsync } from "fastify";
import prisma from "../../utils/client";
import { compare } from "../../utils/hashing";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/login", async function (request, reply) {
    try {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          password: true,
        },
      });

      const isMatch =
        user && compare(password, user.password?.passwordHash as string);
      if (!user || !isMatch) {
        return reply.code(401).send({
          message: "Invalid email or password",
        });
      }
      const payload = {
        id: user.id,
        email: user.email,
      };
      const token = request.jwt.sign(payload);

      reply.setCookie("access_token", token, {
        path: "/",
        httpOnly: true,
        secure: true,
      });

      return { accessToken: token };
    } catch (error) {}
  });
  fastify.post("/logout", async function (request, reply) {
    reply.clearCookie("access_token");

    return reply.send({ message: "Logout successful" });
  });
};

export default auth;
