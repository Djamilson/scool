import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { colors } from '../../../styles';

export const Navigation = styled.ul`
  border: 0;
  display: none;
  flex-direction: column;
  &.active {
    display: flex;
  }

  li + li {
    margin-left: 20px;
  }
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

interface Props {
  selected?: boolean;
}

export const MenuLI = styled.li`
  display: flex;
  justify-content: center;
  border: none;
  background: none;
  list-style-type: none;
  max-width: 220px;
  transition: transform 0.3s ease-in-out;

  height: 2.6rem;

  strong {
    display: block;
    color: #7159c1;
    font-size: 18px;
    font-weight: normal;
    text-align: center;
  }
  &:hover,
  &.active {
    font-weight: bold;
    opacity: 0.6;
    transform: translateY(-5px);
    transition: all 0.2s;

    &:after {
      opacity: 1;
      width: 100%;
    }
  }
`;

export const NavigationLink = styled(Link)<Props>`
  color: ${(props) =>
    props.selected
      ? `${colors.colorTextInWhite}`
      : `${colors.colorButtonText}`};

  position: relative;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  background: none;

  display: flex;
  align-items: baseline;
  justify-content: center;
  transition: background-color 0.2s;
  text-decoration: none;

  span {
    display: block;
    background: rgba(0, 0, 0, 0);
    width: 22px;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    svg {
      color: #fff;
      width: 20px;
      height: 20px;
    }
  }

  &.active {
    font-weight: bold;
    transform: translateY(-5px);

    &:after {
      opacity: 1;
      width: 100%;
    }
  }
`;
