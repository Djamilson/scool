import { UserRoles } from '../../enum/role';

const userRoles = {
  roleAdmins: [String(UserRoles.roleSuperAdmin), String(UserRoles.roleAdmin)],
  roleUsers: [String(UserRoles.roleUser)],
  roleStudent: [String(UserRoles.roleStudent)],
  roleTeacher: [String(UserRoles.roleTeacher)],
  roleAdminsRoleTeacher: [
    String(UserRoles.roleSuperAdmin),
    String(UserRoles.roleAdmin),
    String(UserRoles.roleTeacher),
  ],

  roleAdminRoleStudent: [
    String(UserRoles.roleSuperAdmin),
    String(UserRoles.roleAdmin),
    String(UserRoles.roleStudent),
  ],
  all: [
    String(UserRoles.roleSuperAdmin),
    String(UserRoles.roleAdmin),
    String(UserRoles.roleUser),
    String(UserRoles.roleStudent),
    String(UserRoles.roleTeacher),
  ],
};

export default userRoles;
