import styled from 'styled-components';

import { colors } from '../../../styles';

export const TextareaBlock = styled.div`
  position: relative;
  width: 100%;

  && {
    margin-top: 1.4rem;
  }

  label {
    font-size: 1rem;
    color: ${colors.colorTextcomplement};
  }

  textarea {
    width: 100%;
    height: 2rem;
    min-height: 1.5rem;

    border-radius: 0.4rem;
    background: ${colors.colorInputBackground};
    border: 1px solid ${colors.colorLineInWhite};
    outline: 0;
    resize: vertical;
    padding: 0.4rem;
    font: 0.8rem Poppins;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.08rem;
    color: ${colors.colorTextTitle};
  }

  &:focus-within::after {
    width: calc(100% - 1.5rem);
    height: 2px;
    content: '';
    background: ${colors.colorPrimaryLight};
    position: absolute;

    left: 0.6rem;
    right: 0.6rem;
    bottom: 7px;
  }
`;
