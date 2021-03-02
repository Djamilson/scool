interface IProps {
  rolesUser: string[];
  requiredRoles: string[] | undefined;
  userHasRequiredRole: boolean;
}

export const checkAuth = ({
  rolesUser,
  requiredRoles,
  userHasRequiredRole,
}: IProps): boolean => {
  let hasRequiredRole = userHasRequiredRole;

  if (!userHasRequiredRole) {
    requiredRoles?.forEach((role) => {
      const x = rolesUser?.some((item) => item === role);
      if (x) {
        hasRequiredRole = true;
      }
    });
  }

  return hasRequiredRole;
};
