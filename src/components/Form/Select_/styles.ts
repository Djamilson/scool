import styled, { css } from 'styled-components';

import { colors } from '../../../styles';
import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const SelectBlock = styled.div`
  display: flex;
  flex-direction: column;

  && {
    margin-top: 1.4rem;
  }

  label {
    font-size: 0.9rem;
    color: ${colors.colorTextcomplement};
    font-weight: bold;
    margin-bottom: 0.2rem;
  }
`;

export const Container = styled.div<ContainerProps>`
  background: ${colors.colorInputBackground};
  border: 1px solid ${colors.colorLineInWhite};

  border-radius: 5px;
  padding: 0px 5px 0px 5px;
  width: 100%;

  color: #666360;
  transition: 0.2s;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isFocused &&
    css`
      > svg {
        color: #009ee2;
      }
      border-color: #009ee2;
    `}

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: ${colors.colorPrimaryDarker};
    `}


  > div {
    width: 100%;
    border: 0;

    > div {
      flex: 1;

      border: 0;
      transition: background-color 5000s ease-in-out 0s;
      background: transparent;
      -webkit-text-fill-color: ${colors.colorTextcomplement};

      &::placeholder {
        color: ${colors.colorTextInPrimary};
      }

      .react-select__option {
        border: 0;
        color: ${colors.colorPrimary};
        background-color: #fff;
      }
    }
  }

  > svg {
    margin: 0 10px 0 5px;
  }
`;

export const Error = styled(Tooltip)`
  width: 11% !important;
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }
`;
