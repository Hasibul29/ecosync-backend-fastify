import { PrismaClient, Role, User, Permission } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

export type { Role, User, Permission };
