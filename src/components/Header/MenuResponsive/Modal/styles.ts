import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { colors } from '../../../../styles';

export const Container = styled.ul`
  z-index: 11;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0px;
  margin-top: 20px;

  padding: 10px 40px;
`;

export const OrderLI = styled.li`
  border: 0;
  border-radius: 0px;
  height: 40px;
  background: none;
  width: 220px;
  list-style-type: none;
  transition: transform 0.3s ease-in-out;
  border-bottom: 1px solid ${colors.colorLineInWhite};
  margin-bottom: 10px;

  span {
    border: none;
    display: block;
    color: #7159c1;
    font-size: 16px;
    font-weight: normal;
    text-align: left;
    margin-left: 20px;
  }
  &:hover,
  &.active {
    font-weight: bold;
    opacity: 0.6;
    transform: translateY(-5px);
    transition: all 0.2s;

    &:after {
      opacity: 1;
      bottom: -10px;
      width: 100%;
    }
  }
`;
interface IProps {
  selected?: boolean;
}

export const NavigationLink = styled(Link)<IProps>`
  color: ${(props) =>
    props.selected
      ? `${colors.colorTextInWhite}`
      : `${colors.colorButtonText}`};
  text-decoration: none;
  font-weight: bold;
  text-align: center;

  &:hover,
  &.active {
    font-weight: bold;
    opacity: 0.6;
    /* transform: translateY(-5px);*/
    transition: all 0.2s;
  }
`;

export const Badge = styled.button`
  background: none;
  border-left: 1px solid #eee;
  margin-left: 20px;
  border: 0;
  position: relative;
  right: 0;
  top: 0;
`;

interface IVisible {
  visible: boolean;
}
export const Background = styled.div<IVisible>`
  margin-top: -2.8rem;
  margin-left: -2.8rem;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  display: ${(props) => (props.visible ? 'flex' : 'none')};

  justify-content: flex-start;
  align-items: center;
`;

interface IPropss {
  showModal: boolean;
}
export const ModalWrapper = styled.div<IPropss>`
  width: 300px;
  height: calc(100% +100px);
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;

  display: flex;
  justify-content: flex-start;
  align-items: initial;
  z-index: 10;
  margin-right: 0;
  border-radius: 2px;
  border: 0;
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  z-index: 10;
  border: 2px solid ${colors.colorLineInWhite};
  border-radius: 50%;
  padding: 5px;
`;
