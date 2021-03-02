import React, { useRef } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import authRoutes from '../../../../routes/Routes/AuthRoutes';

import { colors } from '../../../../styles';
import IMenu from '../../../../types/menu';
import {
  Background,
  Container,
  OrderLI,
  NavigationLink,
  Badge,
  ModalWrapper,
} from './styles';

interface IProps {
  handleToggleMenu(): void;
  handleSignOut(): void;
  menus: IMenu[];
  isOpen: boolean;
}

const Modal: React.FC<IProps> = ({
  isOpen,
  handleToggleMenu,
  menus,
  handleSignOut,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `translateY(0%)` : `translateY(-100%)`,
  });

  return (
    <Background visible={isOpen} onClick={handleToggleMenu} ref={modalRef}>
      <animated.div style={animation}>
        <ModalWrapper showModal={isOpen}>
          <Container>
            {menus?.map((menu: IMenu) => {
              return (
                <OrderLI key={menu.path}>
                  <NavigationLink
                    to={menu.path}
                    aria-label={menu.label}
                    onClick={handleToggleMenu}
                    selected={menu.selected}
                  >
                    <span>{menu.label}</span>
                  </NavigationLink>
                </OrderLI>
              );
            })}

            <OrderLI>
              <NavigationLink
                to={authRoutes.profile}
                aria-label="Meu perfil"
                onClick={() => handleToggleMenu()}
              >
                <span>Meu Perfil</span>
              </NavigationLink>
            </OrderLI>

            <OrderLI>
              <Badge onClick={handleSignOut} title="Sair">
                <FaSignOutAlt color={colors.third} size={28} />
              </Badge>
            </OrderLI>
          </Container>
        </ModalWrapper>
      </animated.div>
    </Background>
  );
};

export default Modal;
