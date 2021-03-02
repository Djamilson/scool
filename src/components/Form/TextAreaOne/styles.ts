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
  margin: 0rem 0rem 0rem 1rem;

  && {
    margin-top: -0.5rem;
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
  padding: 4px 15px 4px 15px;
  width: 100%;
  color: ${colors.colorTextInWhite};

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


  textarea {
    width: 100%;
    border: 0;
    font-size: 0.9rem;
    height: 3rem;
    min-height: 2.5rem;
    resize: vertical;
    transition: background-color 5000s ease-in-out 0s;
    background: transparent;
    
    font-family: 'Poppins', sans-serif;
    
    &::placeholder {
      color: ${colors.colorTextInWhite};
    }
    color:${colors.colorTextcomplement};
 
  }

  &:focus-within::after {
    width: calc(100% - 2.9rem);
    height: 2px;
    content: '';
    background: ${colors.colorPrimaryLight};
    position: absolute;
    font-size: 11px;
    color: ${colors.colorTextcomplement};
    left: 1rem;
    right: 0.5rem;
    bottom: 4px;
    letter-spacing: 0.06rem;
  }

  svg {
    margin-right: 10px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: ${colors.fourth};
    color: ${colors.sixth};
    &::before {
      border-color: ${colors.fourth} transparent;
    }
  }
`;
