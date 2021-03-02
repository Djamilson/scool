import React, { ButtonHTMLAttributes } from 'react';

import * as S from './styled';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  handleClick(): void;
  isActive: boolean;
};

const ButtonMenu: React.FC<ButtonProps> = ({ handleClick, isActive }) => (
  <S.ButtonHamburger
    visible={!isActive}
    onClick={handleClick}
    className={isActive ? 'active' : ''}
  >
    <span />
  </S.ButtonHamburger>
);

export default ButtonMenu;
