export enum Permissions {
  // Users
  UsersRead = "users:read",
  UsersReadOwn = "users:read_own",
  UsersWrite = "users:write",
  UsersDelete = "users:delete",
  UsersEditAll = "users:edit_all",
  UsersEditOwn = "users:edit_own",

  // Roles
  RolesRead = "roles:read",
  RolesWrite = "roles:write",
  RolesDelete = "roles:delete",
  RolesPermission = "roles_permission:write",
  RolesPermissionDelete = "roles_permission:delete",

  // Permissions
  PermissionsRead = "permissions:read",

  // Users Roles
  UsersRolesDelete = "users_roles:delete",
  UsersRolesWrite = "users_roles:write",
  UsersRoleReadAll = "users_roles:read_all",
  UsersRoleUpdate = "users_roles:update",
} 