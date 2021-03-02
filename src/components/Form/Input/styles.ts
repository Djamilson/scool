import styled, { css } from 'styled-components';

import { colors } from '../../../styles';
import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const InputBlock = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 0 10px 0px 10px;

  && {
    margin-top: 1.4rem;
  }

  label {
    font-size: 0.9rem;
    color: ${colors.colorTextcomplement};
    margin-bottom: 0.2rem;
    font-weight: bold;
  }
`;

export const Container = styled.div<ContainerProps>`
  background: ${colors.colorInputBackground};
  border-radius: 7px;
  border: 1px solid ${colors.colorLineInWhite};
  padding: 8px 15px 8px 10px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: ${colors.fourth};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: ${colors.colorPrimary};
      border-color: ${colors.colorPrimaryDarker};
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: ${colors.colorPrimaryDarker};
    `}


  input {
    margin-left: 22px;
    flex: 1;
    border: 0;
    font-size: 0.9rem;
    color: ${colors.colorPrimary};
    transition: background-color 5000s ease-in-out 0s;
    background: transparent;
    -webkit-text-fill-color: ${colors.colorTextcomplement};

    &::placeholder {
      color: ${colors.colorTextInPrimary};
    }

    &:active,
    &:focus {
      text-align: left;
    }
  }

  svg {
    margin-right: -15px;
  }
`;

export const Error = styled(Tooltip)`
  z-index: 99;
  height: 20px;
  margin-left: 0px;

  svg {
    margin: 0px;
  }

  span {
    background: ${colors.fourth};
    color: ${colors.sixth};

    &::before {
      z-index: 100;
      border-color: ${colors.fourth} transparent;
    }
  }
`;
