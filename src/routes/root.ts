import { FastifyPluginAsync } from "fastify";
// import prisma from "../utils/client";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    // await prisma.permission.createMany({
    //   data: [
    //     { name: 'users:read', description: 'Permission to read users information' },
    //     { name: 'users:write', description: 'Permission to write users information' },
    //     { name: 'users:delete', description: 'Permission to delete users' },
    //     { name: 'users:update', description: 'Permission to update users' },
    //     { name: 'roles:read', description: 'Permission to read roles information' },
    //     { name: 'roles:write', description: 'Permission to write roles information' },
    //     { name: 'roles:update', description: 'Permission to update roles' },
    //     { name: 'roles:delete', description: 'Permission to delete roles' },
    //     { name: 'roles_permission:read', description: 'Permission to read roles permissions' },
    //     { name: 'roles_permission:write', description: 'Permission to write roles permissions' },
    //     { name: 'roles_permission:delete', description: 'Permission to delete roles permissions' },
    //     { name: 'roles_users:read', description: 'Permission to read roles assigned to users' },
    //     { name: 'roles_users:write', description: 'Permission to write roles assigned to users' },
    //     { name: 'roles_users:delete', description: 'Permission to delete roles assigned to users' },
    //     { name: 'roles_users:update', description: 'Permission to update roles assigned to users' },
    //     { name: 'vehicles:read', description: 'Permission to read vehicles information' },
    //     { name: 'vehicles:write', description: 'Permission to write vehicles information' },
    //     { name: 'vehicles:delete', description: 'Permission to delete vehicles' },
    //     { name: 'vehicles:update', description: 'Permission to update vehicles' },
    //     { name: 'sts:read', description: 'Permission to read STS information' },
    //     { name: 'sts:write', description: 'Permission to write STS information' },
    //     { name: 'sts:delete', description: 'Permission to delete STS' },
    //     { name: 'sts:update', description: 'Permission to update STS' },
    //     { name: 'sts_manager:write', description: 'Permission to write STS manager information' },
    //     { name: 'sts_vehicle:write', description: 'Permission to write STS vehicle information' },
    //     { name: 'sts_vehicle:read', description: 'Permission to read STS vehicle information' },
    //     { name: 'sts_manager:read', description: 'Permission to read STS manager information' },
    //     { name: 'sts_manager:delete', description: 'Permission to delete STS manager information' },
    //     { name: 'sts_vehicle:delete', description: 'Permission to delete STS vehicle information' },
    //     { name: 'sts_entry:read', description: 'Permission to read STS entry information' },
    //     { name: 'sts_entry:write', description: 'Permission to write STS entry information' },
    //     { name: 'sts_manager_vehicle:read', description: 'Permission to read STS manager vehicle information' },
    //     { name: 'sts_vehicle_todays_fleet:read', description: 'Permission to read STS vehicle todays fleet information' },
    //     { name: 'sts_vehicle_todays_fleet:write', description: 'Permission to write STS vehicle todays fleet information' },
    //     { name: 'sts_vehicle_todays_fleet:delete', description: 'Permission to delete STS vehicle todays fleet information' },
    //     { name: 'landfill:read', description: 'Permission to read landfill information' },
    //     { name: 'landfill:write', description: 'Permission to write landfill information' },
    //     { name: 'landfill:delete', description: 'Permission to delete landfill' },
    //     { name: 'landfill:update', description: 'Permission to update landfill' },
    //     { name: 'landfill_manager:write', description: 'Permission to write landfill manager information' },
    //     { name: 'landfill_manager:read', description: 'Permission to read landfill manager information' },
    //     { name: 'landfill_manager:delete', description: 'Permission to delete landfill manager information' },
    //     { name: 'landfill_entry:read', description: 'Permission to read landfill entry information' },
    //     { name: 'landfill_entry:write', description: 'Permission to write landfill entry information' },
    //     { name: 'profile:read', description: 'Permission to read profile information' },
    //     { name: 'profile:update', description: 'Permission to update profile information' },
    // ],
    // });
    return { root: "root" };
  });
};

export default root;
