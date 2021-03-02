import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  right: 0;
  left: 0;
  bottom: 0;
  min-width: 75%;
  min-height: 65%;
`;

export const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
