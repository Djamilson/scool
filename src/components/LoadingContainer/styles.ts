import styled, { css } from 'styled-components';

interface ContainerProps {
  load: number;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  right: 0;
  top: 0;
  padding: 0;
  overflow: hidden;
  z-index: 9;

  ${(props) =>
    !props.load &&
    css`
      display: none !important;
    `}
  ${(props) =>
    props.load &&
    css`
      display: flex !important;
    `}
`;
