import { FastifyPluginAsync } from "fastify";
import prisma, { User } from "../../utils/client";
import { Prisma } from "@prisma/client";
import { hash } from "../../utils/hashing";
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

interface UserRegistration extends User {
  password: string;
}

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    { preHandler: fastify.authenticate },
    async (request, reply) => {
      try {
        const data = await prisma.user
          .findMany({
            include: {
              role: true,
            },
          })
          .catch((e) => e);
        return reply.status(200).send({
          success: true,
          message: "User List.",
          data: data,
        } as ApiResponse<User[]>);
      } catch (error) {
        console.log("Get User List:", error);
        return reply.status(500).send({
          success: false,
          message:
            "An unexpected error has occurred. Please contact the system administrator.",
        } as ApiResponse<null>);
      }
    }
  );

  fastify.post(
    "/",
    { preHandler: fastify.authenticate },
    async (request, reply) => {
      try {
        const body = request.body as UserRegistration;
        const passwordHash = await hash(body.password);
        const data = await prisma.user.create({
          data: {
            password: {
              create: {
                passwordHash: passwordHash,
              },
            },
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            role: {
              connect: {
                id: "95368932-006f-48eb-bcb0-24bc2e90580b",
              },
            },
          },
        });

        return reply.status(201).send({
          success: true,
          message: "User Registration Successful.",
          data: data,
        } as ApiResponse<User>);
      } catch (error) {
        console.log("Create User:", error);
        return reply.status(500).send({
          success: false,
          message:
            "An unexpected error has occurred. Please contact the system administrator.",
        } as ApiResponse<null>);
      }
    }
  );

  fastify.put(
    "/",
    { preHandler: fastify.authenticate },
    async (request, reply) => {
      try {
        const { id, firstName, lastName, roleId } =
          request.body as Partial<User>;

        if (id === undefined)
          return reply.status(400).send({ message: "ID is required" });

        const updatedData: Partial<User> = {};

        if (firstName !== undefined) updatedData.firstName = firstName;
        if (lastName !== undefined) updatedData.lastName = lastName;
        if (roleId !== undefined) updatedData.roleId = roleId;

        const data = await prisma.user.update({
          where: {
            id: id,
          },
          data: updatedData,
        });
        return reply.status(200).send({
          success: true,
          message: "User information updated successfully.",
          data: data,
        });
      } catch (error) {
        console.log("User update :", error);
        return reply.status(500).send({
          success: false,
          message:
            "An unexpected error has occurred. Please contact the system administrator.",
        } as ApiResponse<null>);
      }
    }
  );

  fastify.delete(
    "/:id",
    { preHandler: fastify.authenticate },
    async (request, reply) => {
      try {
        const { id } = request.params as User;
        await prisma.user.delete({
          where: {
            id: id,
          },
        });
        return reply.status(200).send({
          success: true,
          message: "User deleted Successfully.",
        } as ApiResponse<null>);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return reply.status(404).send({
              success: false,
              message: "User not found.",
            } as ApiResponse<null>);
          }
        }
        console.log("User delete :", error);
        return reply.status(500).send({
          success: false,
          message:
            "An unexpected error has occurred. Please contact the system administrator.",
        } as ApiResponse<null>);
      }
    }
  );
};

export default user;
