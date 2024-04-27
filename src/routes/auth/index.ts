import { FastifyPluginAsync } from "fastify";
import prisma, { User } from "../../utils/client";
import { hash, compare } from "../../utils/hashing";
import { ApiResponse, errorResponse } from "../../constants/constants";
import transporter from "../../utils/mailSender";
import {
  passwordResetConfirm,
  resetPassword,
} from "../../utils/accountCreateEmail";
import generateOTP from "../../utils/generateOTP";

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
      console.log(user);
      const isMatch =
        user &&
        (await compare(password, user.password?.passwordHash as string));
      console.log(isMatch);
      if (!user || !isMatch) {
        return reply.code(401).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      const payload = {
        id: user.id,
        email: user.email,
      };
      const token = request.jwt.sign(payload);

      request.session.set('access_token', token);

      return reply.status(200).send({
        success: true,
        message: "Login Successful",
        data: user,
      } as ApiResponse<User>);
    } catch (error) {
      console.log("Login", error);
      return reply.status(500).send(errorResponse);
    }
  });

  fastify.get(
    "/authenticated",
    { preHandler: fastify.authenticate },
    (request, reply) => {
      return reply.status(200).send({
        success: true,
        message: "User is authenticated.",
      } as ApiResponse);
    }
  );

  fastify.post("/logout", async function (request, reply) {
    try {
      request.session.delete();
      return reply.send({
        success: true,
        message: "Logout successful",
      } as ApiResponse);
    } catch (error) {
      console.log("logout", error);
      return reply.status(500).send(errorResponse);
    }
  });

  fastify.post("/reset-password/initiate", async function (request, reply) {
    try {
      const { id } = request.body as { id: string };

      const data = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!data)
        return reply.status(400).send({
          success: false,
          message: "User not exist",
        } as ApiResponse);
      const otp = generateOTP();
      const otpData = await prisma.oTP.findUnique({
        where: {
          userId: id,
        },
      });
      if (!otpData) {
        await prisma.oTP.create({
          data: {
            code: otp,
            userId: id,
            expiration: new Date(Date.now() + 5 * 60 * 1000), //5min
          },
        });
      } else {
        await prisma.oTP.update({
          data: {
            code: otp,
            expiration: new Date(Date.now() + 5 * 60 * 1000), //5min
          },
          where: {
            userId: id,
          },
        });
      }

      const mailOptions = {
        from: {
          name: "EcoSync",
          address: process.env.SENDER_EMAIL || "",
        },
        to: data?.email,
        subject: "Password reset for EcoSync.",
        html: resetPassword({
          name: `${data?.firstName} ${data?.lastName}`,
          otp: otp,
        }),
      };

      transporter.sendMail(mailOptions);

      return reply.send({
        success: true,
        message: "An email was sent to the user.",
      } as ApiResponse);
    } catch (error) {
      console.log("Reset initiate", error);
      return reply.status(500).send(errorResponse);
    }
  });

  fastify.post("/reset-password/confirm", async function (request, reply) {
    try {
      const { newPassword, confirmPassword, id, otp, step } = request.body as {
        newPassword: string;
        confirmPassword: string;
        id: string;
        otp: string;
        step: "0" | "1";
      };

      if (step === "0") {
        const data = await prisma.oTP.findUnique({
          where: {
            userId: id,
          },
        });
        const currentTimestamp = new Date();
        if (data?.code !== otp || currentTimestamp > data?.expiration) {
          return reply.status(400).send({
            success: false,
            message: "Invalid OTP or OTP expired.",
          } as ApiResponse);
        }
        return reply.send({
          success: true,
          message: "OTP verified successfully.",
        } as ApiResponse);
      } else if (step === "1") {
        if (newPassword !== confirmPassword) {
          return reply.status(400).send({
            success: false,
            message: "Password didn't match.",
          } as ApiResponse);
        }
        const passwordHash = await hash(newPassword);
        await prisma.auth.update({
          data: {
            passwordHash: passwordHash,
          },
          where: {
            userId: id,
          },
        });

        const data = await prisma.user.findUnique({
          where: {
            id: id,
          },
        });
        const mailOptions = {
          from: {
            name: "EcoSync",
            address: process.env.SENDER_EMAIL || "",
          },
          to: data?.email,
          subject: "Password reset Successful.",
          html: passwordResetConfirm({
            name: `${data?.firstName} ${data?.lastName}`,
          }),
        };

        transporter.sendMail(mailOptions);
        return reply.status(200).send({
          success: true,
          message: "Password reset successful.",
        } as ApiResponse);
      } else {
        return reply.status(400).send({
          success: false,
          message: "Invalid request.",
        } as ApiResponse);
      }
    } catch (error) {
      console.log("Reset confirm", error);
      return reply.status(500).send(errorResponse);
    }
  });
};

export default auth;
