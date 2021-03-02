import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

import signInBackgroundImg from '../../../../assets/backgroundLogin.png';
import { colors } from '../../../../styles';

export const Container = styled.div`
  height: auto;
  display: flex;
  margin-left: 0;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    margin-left: -2.5rem;
  }

  @media (min-width: 768px) {
    align-items: stretch;
    flex-direction: row;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;
  order: 1;

  max-width: 700px;
  margin-top: 5rem;
  margin-bottom: 0rem;
  width: 50%;

  @media (min-width: 1024px) {
    margin-top: 0rem;
  }

  @media (min-width: 768px) {
    order: 2;
  }
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

const appearImageLeft = keyframes`
  from{
    opacity:0;
    transform: translateX(50px);
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

  form {
    margin-top: 60px;
    margin-bottom: 30px;
    width: 340px;
    text-align: center;
    font-family: 'Poppins', sans-serif;

    h1 {
      margin-bottom: 24px;
      font-family: 'Poppins', sans-serif;
      color: ${colors.colorTextTitle};
    }

    a {
      color: ${colors.colorTextcomplement};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      padding-bottom: -110px;
      font-family: 'Poppins', sans-serif;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    display: block;
    bottom: 80px;
    text-decoration: none;
    transition: color 0.2s;
    font-family: 'Poppins', sans-serif;
    color: ${colors.colorTextTitle};

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }
    &:hover {
      color: ${shade(0.2, colors.colorTextTitle)};
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${colors.colorPrimary};
  height: auto;
  min-width: 380px;

  @media (min-width: 1024px) {
    width: 60%;
    border: 0;
  }

  div {
    border: 0;
    display: flex;
    width: 100%;
    min-width: 45vw;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: url(${signInBackgroundImg}) no-repeat center;
    background-size: 65% auto;
    animation: ${appearImageLeft} 1s;

    @media (min-width: 1024px) {
      min-width: 45vw;
    }

    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 10rem;
        height: auto;
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
