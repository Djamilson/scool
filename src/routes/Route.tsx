import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import NotFound from '../pages/NotFound';
import authRoutes from './Routes/AuthRoutes';
import { checkAuth } from './Routes/checkAuth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  requiredRoles?: string[];
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  requiredRoles,
  ...rest
}) => {
  const { user } = useAuth();

  const rolesUser = user?.user_groups.map((group) => group.id);

  let userHasRequiredRole = false;
  if (
    typeof user !== typeof undefined &&
    typeof requiredRoles !== typeof undefined
  ) {
    userHasRequiredRole = checkAuth({
      rolesUser,
      requiredRoles,
      userHasRequiredRole,
    });
  }

  const myComponent = () => {
    if (isPrivate && !userHasRequiredRole) {
      return <NotFound />;
    }

    return <Component />;
  };

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        //document.querySelectorAll(' p * div ');

        return isPrivate === !!user ? (
          <>{myComponent()}</>
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? authRoutes.home : authRoutes.dashboard,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
