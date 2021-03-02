import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import IMenu from '../../../types/menu';
import { NavigationLink, Navigation, MenuLI } from './styles';

interface IProps {
  menus: IMenu[];
}

const MeNavigation: React.FC<IProps> = ({ menus }) => {
  const location = useLocation();

  const [serealizableList, setSerealizableList] = useState<IMenu[]>(() => {
    return [] as IMenu[];
  });

  const load = useCallback(() => {
    function handlerIsActive(link: string) {
      if (location.pathname.localeCompare('/dashboard') === 0) {
        return !location.pathname.indexOf(link);
      }

      if (location.pathname.length < 2 && link.length < 2) {
        return !location.pathname.indexOf(link);
      }

      if (location.pathname.length > 1 && link.length > 1) {
        return !location.pathname.indexOf(link);
      }

      return Boolean(false);
    }

    setSerealizableList(
      menus?.map((menu: IMenu) => {
        return { ...menu, selected: handlerIsActive(menu.path) };
      }),
    );
  }, [location, menus]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Navigation>
      {serealizableList?.map((menu: IMenu) => {
        return (
          <MenuLI key={menu.path}>
            <NavigationLink
              to={menu.path}
              aria-label={menu.label}
              selected={menu.selected}
            >
              {menu.label}
            </NavigationLink>
          </MenuLI>
        );
      })}
    </Navigation>
  );
};

export default MeNavigation;
