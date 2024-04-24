import { FastifyPluginAsync } from "fastify";
import prisma, { User, Role } from "../../utils/client";
import { Prisma } from "@prisma/client";
import { hash } from "../../utils/hashing";
import { errorResponse, ApiResponse } from "../../constants/constants";
import transporter from "../../utils/mailSender";
import { accountRegistration } from "../../utils/accountCreateEmail";
import { Permissions } from "../../permissions";

interface UserRegistration extends User {
  password: string;
}

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.UsersRead),
      ],
    },
    async (request, reply) => {
      try {
        const data = await prisma.user.findMany({
          include: {
            role: true,
          },
        });

        return reply.status(200).send({
          success: true,
          message: "User List.",
          data: data,
        } as ApiResponse<User[]>);
      } catch (error) {
        console.log("Get User List:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.get(
    "/:id",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.UsersReadOwn),
      ],
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };

        const data = await prisma.user.findUnique({
          include: {
            role: true,
          },
          where: {
            id: id,
          },
        });

        return reply.status(200).send({
          success: true,
          message: "User Data.",
          data: data,
        } as ApiResponse<User>);
      } catch (error) {
        console.log("Get User Data:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.post(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.UsersWrite),
      ],
    },
    async (request, reply) => {
      try {
        const body = request.body as UserRegistration;
        const passwordHash = await hash(body.password);

        const role = await prisma.role.findUnique({
          select: {
            id: true,
          },
          where: {
            name: "Unassigned",
          },
        });

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
                id: role?.id,
              },
            },
          },
        });

        const mailOptions = {
          from: {
            name: "EcoSync",
            address: process.env.SENDER_EMAIL || "",
          },
          to: body.email,
          subject: "Account registration for EcoSync.",
          html: accountRegistration({
            name: `${body.firstName} ${body.lastName}`,
            email: body.email,
            password: body.password,
          }),
        };

        transporter.sendMail(mailOptions);

        return reply.status(201).send({
          success: true,
          message: "User Registration Successful.",
          data: data,
        } as ApiResponse<User>);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            return reply.status(404).send({
              success: false,
              message: "User already exist.",
            } as ApiResponse);
          }
        }
        console.log("Create User:", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.put(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.UsersEditOwn),
      ],
    },
    async (request, reply) => {
      try {
        const { id, firstName, lastName } = request.body as Partial<User>;

        if (id === undefined)
          return reply.status(400).send({
            success: false,
            message: "ID is required.",
          } as ApiResponse);

        const updatedData: Partial<User> = {};

        if (firstName !== undefined) updatedData.firstName = firstName;
        if (lastName !== undefined) updatedData.lastName = lastName;

        const data = await prisma.user.update({
          where: {
            id: id,
          },
          data: updatedData,
        });
        return reply.status(200).send({
          success: true,
          message: "User information update successful.",
          data: data,
        } as ApiResponse<User>);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return reply.status(404).send({
              success: false,
              message: "User not found.",
            } as ApiResponse);
          }
        }
        console.log("User update :", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.UsersDelete),
      ],
    },
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
          message: "User data deletion Successful.",
        } as ApiResponse);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return reply.status(404).send({
              success: false,
              message: "User not found.",
            } as ApiResponse);
          }
        }
        console.log("User delete :", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.get(
    "/roles",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.UsersRoleReadAll),
      ],
    },
    async (request, reply) => {
      try {
        const data = await prisma.role.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        return reply.code(200).send({
          success: true,
          message: "Role List.",
          data: data,
        } as ApiResponse<Role[]>);
      } catch (error) {
        console.log("Role List :", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );

  fastify.put(
    "/:userId/roles",
    {
      preHandler: [
        fastify.authenticate,
        fastify.permission(Permissions.UsersRoleUpdate),
      ],
    },
    async (request, reply) => {
      try {
        const { roleId } = request.body as { roleId: string };
        const { userId } = request.params as { userId: string };

        const role = await prisma.role.findUnique({ where: { id: roleId } });

        if (!role)
          return reply.status(400).send({
            success: false,
            message: "Invalid roleId.",
          } as ApiResponse);

        await prisma.user.update({
          data: {
            roleId: roleId,
          },
          where: {
            id: userId,
          },
        });

        return reply.status(200).send({
          success: true,
          message: "User role update successful",
        } as ApiResponse);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return reply.status(404).send({
              success: false,
              message: "User not found.",
            } as ApiResponse);
          }
        }
        console.log("Update user role :", error);
        return reply.status(500).send(errorResponse);
      }
    }
  );
};

export default user;
