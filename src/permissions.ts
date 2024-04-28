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
} 
