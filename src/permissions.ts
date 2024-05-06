export enum Permissions {
  // Users
  UsersRead = "users:read",
  UsersWrite = "users:write",
  UsersDelete = "users:delete",
  UsersUpdate = "users:update",

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
  STSManagerVehicleRead = "sts_manager_vehicle:read",
  STSVehicleTodaysFleetRead = "sts_vehicle_todays_fleet:read",
  STSVehicleTodaysFleetWrite = "sts_vehicle_todays_fleet:write",
  STSVehicleTodaysFleetDelete = "sts_vehicle_todays_fleet:delete",

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

  // Profile
  ProfileRead = "profile:read",
  ProfileUpdate = "profile:update",

} 
