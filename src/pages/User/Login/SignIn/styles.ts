import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

import signInBackgroundImg from '../../../../assets/backgroundLogin.png';
import Button from '../../../../components/Button';
import { colors } from '../../../../styles';

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 0;

  @media (min-width: 1024px) {
    align-items: stretch;
    flex-direction: row;
    margin-left: -2.5rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  max-width: 700px;
  margin-top: 5rem;
  margin-bottom: 0rem;
  width: 50%;

  @media (min-width: 1024px) {
    margin-top: 0rem;
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

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${appearFromLeft} 1s;

  form {
    width: 340px;
    min-width: 340px;
    text-align: center;
    font-family: 'Poppins', sans-serif;

    margin-top: 60px;
    margin-bottom: 2rem;

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

    transition: color 0.2s;
    font-family: 'Poppins', sans-serif;
    color: ${colors.colorTextTitle};
    text-decoration: none;
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

    animation: ${appearImageLeft} 1s;

    background: url(${signInBackgroundImg}) no-repeat center;
    background-size: 65% auto;

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

export const MyButton = styled(Button)`
  width: 70%;
  border-radius: 4px;
  margin: 30px 15% 0 15%;
`;
