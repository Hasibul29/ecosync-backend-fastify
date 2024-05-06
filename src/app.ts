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
import permissionMiddleware from "./middleware/permissionsMiddleware";
import cors from "@fastify/cors";
import helmet from '@fastify/helmet';

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
  fastify.register(helmet);

  const secret = fs.readFileSync(join(__dirname, "secret-key"));
  fastify.register(require('@fastify/secure-session'), {
    sessionName: 'session',
    cookieName: 'session',
    key: secret,
    expiry: 24 * 60 * 60, // 1 day
    cookie: { 
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60, // 1 day
    }
  })
  fastify.register(require('@fastify/csrf-protection'), { sessionPlugin: '@fastify/secure-session' })

  await fastify.register(cors, {
    origin: "http://localhost:5173",
    credentials: true,
  });

  fastify.register(fjwt, { secret });
  fastify.addHook("preHandler", (req, _, next) => {
    req.jwt = fastify.jwt;
    return next();
  });

  fastify.decorate("permission", permissionMiddleware);

  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = req.session.get("access_token");
  
      if (!token) {
        return reply
          .status(403)
          .send({ success: false, message: "Authentication required" });
      }
      try {
        const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
        req.user = decoded;
      } catch {
        return reply
          .status(403)
          .send({ success: false, message: "Invalid or expired token" });
      }
    }
  );

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  await fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });
  // This loads all plugins defined in routes
  // define your routes in one of these
  await fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

export default app;
export { app, options };
