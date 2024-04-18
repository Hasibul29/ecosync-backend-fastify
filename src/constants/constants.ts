import nodemailer from "nodemailer";
require("dotenv").config();

const errorResponse = {
  success: false,
  message:
    "An unexpected error has occurred. Please contact the system administrator.",
} as ApiResponse<null>;

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

export { errorResponse, type ApiResponse, transporter };
