export enum Permissions {
  // Users
  UsersRead = "users:read",
  UsersReadOwn = "users:read_own",
  UsersWrite = "users:write",
  UsersDelete = "users:delete",
  UsersUpdateAll = "users:update_all",
  UsersUpdateOwn = "users:update_own",

  // Roles
  RolesRead = "roles:read",
  RolesWrite = "roles:write",
  RolesUpdate = "roles:update",
  RolesDelete = "roles:delete",
  RolesPermissionRead = "roles_permission:read",
  RolesPermissionWrite = "roles_permission:write",
  RolesPermissionDelete = "roles_permission:delete",
  RolesUsersRead = "roles_users:read",
  
  // Permissions
  PermissionsRead = "permissions:read",

  // Users Roles
  UsersRolesDelete = "users_roles:delete",
  UsersRolesWrite = "users_roles:write",
  UsersRoleReadAll = "users_roles:read_all",
  UsersRoleUpdate = "users_roles:update",

  // Vehicles
  VehiclesRead = "vehicles:read",
  VehiclesWrite = "vehicles:write",
  VehiclesDelete = "vehicles:delete",
  VehiclesUpdate = "vehicles:update",

  // STS
  STSRead = "sts:read",
  STSWrite = "sts:write",
  STSDelete = "sts:delete",
  STSUpdate = "sts:update",
  STSManagerWrite = "sts_manager:write",
  STSVehicleWrite = "sts_vehicle:write",
  STSVehicleRead = "sts_vehicle:read",
  STSManagerRead = "sts_manager:read",
  STSManagerDelete = "sts_manager:delete",
  STSVehicleDelete = "sts_vehicle:delete",
  STSEntryRead = "sts_entry:read",
  STSEntryWrite = "sts_entry:write",

  // Landfill
  LandfillRead = "landfill:read",
  LandfillWrite = "landfill:write",
  LandfillDelete = "landfill:delete",
  LandfillUpdate = "landfill:update",
  LandfillManagerWrite = "landfill_manager:write",
  LandfillManagerRead = "landfill_manager:read",
  LandfillManagerDelete = "landfill_manager:delete",
  LandfillEntryRead = "landfill_entry:read",
  LandfillEntryWrite = "landfill_entry:write",

} 
