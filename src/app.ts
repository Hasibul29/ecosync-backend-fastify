import { join } from "path";
import fs from "node:fs";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import {
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from "fastify";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";
import permissionMiddleware from "./middleware/permissionsMiddleware";
import cors from "@fastify/cors";

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!

  fastify.register(fCookie).register(require("@fastify/secure-session"), {
    secretKey: fs.readFileSync(join(__dirname, "secret-key")), // Replace with a strong secret
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    },
  });

  await fastify.register(cors, {
    origin: "*",
    credentials: true,
  });

  fastify.register(fjwt, {
    secret: fs.readFileSync(join(__dirname, "secret-key")),
  });
  fastify.addHook("preHandler", (req, res, next) => {
    req.jwt = fastify.jwt;
    return next();
  });

  fastify.decorate("permission", permissionMiddleware);

  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = req.cookies.access_token;
      if (!token) {
        return reply
          .status(401)
          .send({ success: false, message: "Authentication required" });
      }
      try {
        const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
        req.user = decoded;
      } catch (error) {
        return reply
          .status(401)
          .send({ success: false, message: "Invalid or expired token" });
      }
    }
  );

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });
  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

export default app;
export { app, options };
