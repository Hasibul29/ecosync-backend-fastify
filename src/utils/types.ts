import { JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
    session: any
  }
  export interface FastifyInstance {
    authenticate: any;
    permission: any;
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
