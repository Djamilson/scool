import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

import signInBackgroundImg from '../../../../../assets/backgroundLogin.png';
import { colors } from '../../../../../styles';

export const Container = styled.div`
  height: auto;
  display: flex;
  align-items: stretch;
  margin-left: -2.5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from{
    opacity:0;
    transform: translateX(-50px);
  }
  to{
    opacity:1;
    transform: translateX(0px)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${appearFromLeft} 1s;
  justify-content: center;

  h1 {
    margin-bottom: 24px;
    font-family: 'Poppins', sans-serif;
    color: ${colors.colorTextTitle};
  }

  a {
    margin-top: 20px;
    background: ${colors.colorSecundary};
    border-radius: 7px;
    height: 4rem;
    border: 0;
    padding: 10px 16px;
    width: 95%;
    color: ${colors.colorTitleInPrimary};
    font-weight: 5000;
    font-size: 1.1rem;
    font-family: 'Poppins', sans-serif;
    transition: background-color 0.2s;

    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 2rem;
      height: auto;
      margin-right: 25px;
    }

    &:hover {
      background: ${shade(0.2, colors.colorSecundary)};
    }
  }
`;

export const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60vw;
  height: auto;
  background: ${colors.colorPrimary};

  div {
    display: flex;
    width: 45vw;
    min-width: 45vw;
    height: 90vh;
    margin: 2rem;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: url(${signInBackgroundImg}) no-repeat center;
    background-size: contain;

    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      svg {
        width: 7rem;
        height: auto;
        color: ${colors.colorSecundary};
      }
      > span {
        font-weight: 500;
        font-size: 1.3rem;
        line-height: 4.6rem;
        margin-top: 0.8rem;

        @media (min-width: 1100px) {
          text-align: initial;
          font-size: 1.6rem;
        }
      }
    }
  }
`;
