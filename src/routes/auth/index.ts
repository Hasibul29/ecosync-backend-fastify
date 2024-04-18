import { FastifyPluginAsync } from "fastify";
import prisma from "../../utils/client";
import { hash, compare } from "../../utils/hashing";
import nodemailer from "nodemailer";
import { errorResponse } from "../../constants/constants";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "",
    pass: "",
  },
});

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
    } catch (error) {
      console.log("Login", error);
      return reply.status(500).send(errorResponse);
    }
  });

  fastify.post("/logout", async function (request, reply) {
    try {
      reply.clearCookie("access_token");
      return reply.send({ message: "Logout successful" });
    } catch (error) {
      console.log("logout", error);
      return reply.status(500).send(errorResponse);
    }
  });

  fastify.get("/reset-password/initiate", async function (request, reply) {
    try {
      const { otp, email } = request.body as { otp: number; email: string };
      const mailOptions = {
        form: {
          name: "",
          address: "",
        },
        to: email,
        subject: "",
        text: otp.toString(),
        html: "",
      };

      transporter.sendMail(mailOptions);

      return reply.send({
        success: true,
        message: "An email was sent to the user.",
      });
    } catch (error) {
      console.log("Reset initiate", error);
      return reply.status(500).send(errorResponse);
    }
  });

  fastify.get("/reset-password/confirm", async function (request, reply) {
    try {
      const { newPassword, confirmPassword, id } = request.body as {
        newPassword: string;
        confirmPassword: string;
        id: string;
      };
      if (newPassword !== confirmPassword) {
        return reply
          .status(400)
          .send({ success: false, message: "Password didn't match" });
      }

      const passwordHash = await hash(newPassword);
      prisma.auth.update({
        data: {
          passwordHash: passwordHash,
        },
        where: {
          userId: id,
        },
      });

      return reply
        .status(200)
        .send({ success: true, message: "Password reset successful" });
    } catch (error) {
      console.log("Reset confirm", error);
      return reply.status(500).send(errorResponse);
    }
  });
};

export default auth;
