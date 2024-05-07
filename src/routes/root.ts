import { FastifyPluginAsync } from "fastify";
// import prisma from "../utils/client";
// import { Permissions } from "../permissions";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    // await prisma.permission.createMany({
    //   data: [
    //     { name: Permissions.UsersRead, description: 'Permission to read users information' },
    //     { name: Permissions.UsersWrite, description: 'Permission to write users information' },
    //     { name: Permissions.UsersDelete, description: 'Permission to delete users' },
    //     { name: Permissions.UsersUpdate, description: 'Permission to update users' },
        
    //     { name: Permissions.RolesRead, description: 'Permission to read roles information' },
    //     { name: Permissions.RolesWrite, description: 'Permission to write roles information' },
    //     { name: Permissions.RolesUpdate, description: 'Permission to update roles' },
    //     { name: Permissions.RolesDelete, description: 'Permission to delete roles' },
    //     { name: Permissions.RolesPermissionRead, description: 'Permission to read roles permissions' },
    //     { name: Permissions.RolesPermissionWrite, description: 'Permission to write roles permissions' },
    //     { name: Permissions.RolesPermissionDelete, description: 'Permission to delete roles permissions' },
    //     { name: Permissions.RolesUsersRead, description: 'Permission to read roles assigned to users' },
        
    //     { name: Permissions.PermissionsRead, description: 'Permission to read permissions information' },

    //     { name: Permissions.UsersRolesWrite, description: 'Permission to write roles assigned to users' },
    //     { name: Permissions.UsersRolesDelete, description: 'Permission to delete roles assigned to users' },
    //     { name: Permissions.UsersRoleUpdate, description: 'Permission to update roles assigned to users' },
    //     { name: Permissions.UsersRoleReadAll, description: 'Permission to read all roles assigned to users' },


    //     { name: Permissions.VehiclesRead, description: 'Permission to read vehicles information' },
    //     { name: Permissions.VehiclesWrite, description: 'Permission to write vehicles information' },
    //     { name: Permissions.VehiclesDelete, description: 'Permission to delete vehicles' },
    //     { name: Permissions.VehiclesUpdate, description: 'Permission to update vehicles' },

        
    //     { name: Permissions.STSRead, description: 'Permission to read STS information' },
    //     { name: Permissions.STSWrite, description: 'Permission to write STS information' },
    //     { name: Permissions.STSDelete, description: 'Permission to delete STS' },
    //     { name: Permissions.STSUpdate, description: 'Permission to update STS' },
    //     { name: Permissions.STSManagerWrite, description: 'Permission to write STS manager information' },
    //     { name: Permissions.STSVehicleWrite, description: 'Permission to write STS vehicle information' },
    //     { name: Permissions.STSVehicleRead, description: 'Permission to read STS vehicle information' },
    //     { name: Permissions.STSManagerRead, description: 'Permission to read STS manager information' },
    //     { name: Permissions.STSManagerDelete, description: 'Permission to delete STS manager information' },
    //     { name: Permissions.STSVehicleDelete, description: 'Permission to delete STS vehicle information' },
    //     { name: Permissions.STSEntryRead, description: 'Permission to read STS entry information' },
    //     { name: Permissions.STSEntryWrite, description: 'Permission to write STS entry information' },
    //     { name: Permissions.STSManagerVehicleRead, description: 'Permission to read STS manager vehicle information' },
    //     { name: Permissions.STSVehicleTodaysFleetRead, description: 'Permission to read STS vehicle todays fleet information' },
    //     { name: Permissions.STSVehicleTodaysFleetWrite, description: 'Permission to write STS vehicle todays fleet information' },
    //     { name: Permissions.STSVehicleTodaysFleetDelete, description: 'Permission to delete STS vehicle todays fleet information' },

    //     { name: Permissions.LandfillRead, description: 'Permission to read landfill information' },
    //     { name: Permissions.LandfillWrite, description: 'Permission to write landfill information' },
    //     { name: Permissions.LandfillDelete, description: 'Permission to delete landfill' },
    //     { name: Permissions.LandfillUpdate, description: 'Permission to update landfill' },
    //     { name: Permissions.LandfillManagerWrite, description: 'Permission to write landfill manager information' },
    //     { name: Permissions.LandfillManagerRead, description: 'Permission to read landfill manager information' },
    //     { name: Permissions.LandfillManagerDelete, description: 'Permission to delete landfill manager information' },
    //     { name: Permissions.LandfillEntryRead, description: 'Permission to read landfill entry information' },
    //     { name: Permissions.LandfillEntryWrite, description: 'Permission to write landfill entry information' },

    //     { name: Permissions.ProfileRead, description: 'Permission to read profile information' },
    //     { name: Permissions.ProfileUpdate, description: 'Permission to update profile information' },

    //     { name: Permissions.BillingRead, description: 'Permission to read billing information' },
    //       { name :Permissions.Login, description: 'Permission to login' },
    //       { name :Permissions.ChangePassword, description: 'Permission to change password' },
    // ],
    // });
    return { root: "root" };
  });
};

export default root;
