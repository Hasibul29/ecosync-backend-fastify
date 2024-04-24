import { JWT } from "@fastify/jwt";
import { Session } from "@fastify/secure-session";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
    permission: any;
    session: Session;
  }
}

type UserPayload = {
  id: string;
  email: string;
};
declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserPayload;
  }
}
