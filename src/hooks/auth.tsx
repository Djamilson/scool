import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../_services/api';
import userMenu from '../components/Header/Menu/menu';
import { UserRoles } from '../enum/role';
import IMenu from '../types/menu';

interface Person {
  id: string;
  name: string;
  email: string;
  status: boolean;
  privacy: boolean;
  avatar?: string;
  avatar_url?: string;
  address_id_main?: string;
  phone_id_man?: string;
}
interface IGroup {
  id: string;
  name: string;
  description: string;
}
interface User {
  id: string;
  is_verified: boolean;
  user_groups: IGroup[];
  person: Person;
  menus: IMenu[];
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<User>;
  signOut(): void;
  updateUser(user: User): void;
  loadMenus(groups: IGroup[]): IMenu[];
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Movie:token');
    const user = localStorage.getItem('@Movie:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const loadMenus = useCallback((groups) => {
    const myRetorn = Array<{
      selected: boolean;
      label: string;
      path: string;
    }>();

    groups.forEach((group) => {
      if (group.id === UserRoles.roleSuperAdmin) {
        myRetorn.push(
          ...userMenu.menuSuperAdmins.map((menuTeacher) => {
            return { ...menuTeacher, selected: false };
          }),
        );
      }

      if (group.id === UserRoles.roleAdmin) {
        myRetorn.push(
          ...userMenu.menuAdmins.map((menuAdmin) => {
            return { ...menuAdmin, selected: false };
          }),
        );
      }

      if (group.id === UserRoles.roleStudent) {
        myRetorn.push(
          ...userMenu.menuStudent.map((menuStudent) => {
            return { ...menuStudent, selected: false };
          }),
        );
      }

      if (group.id === UserRoles.roleUser) {
        myRetorn.push(
          ...userMenu.menuUsers.map((menuUser) => {
            console.log('Estoiuo,n,n>> ', menuUser);
            return { ...menuUser, selected: false };
          }),
        );
      }

      if (group.id === UserRoles.roleTeacher) {
        myRetorn.push(
          ...userMenu.menuTeacher.map((menuTeacher) => {
            return { ...menuTeacher, selected: false };
          }),
        );
      }
    });
    return myRetorn.filter(
      (power, toThe, yellowVests) =>
        yellowVests
          .map((updateDemocracy) => updateDemocracy.label)
          .indexOf(power.label) === toThe,
    );
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const res = await api.post('sessions', { email, password });

    const { token, user } = res.data;

    localStorage.setItem('@Movie:token', token);
    localStorage.setItem('@Movie:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
    return user;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Movie:token');
    localStorage.removeItem('@Movie:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Movie:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, loadMenus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth mus be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
