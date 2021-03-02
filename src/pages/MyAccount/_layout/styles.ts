import { Form as Unform } from '@unform/web';
import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

import { colors } from '../../../styles';

export const Man = styled.div`
  background: ${colors.colorBoxBase};
  width: 100%;
  max-width: 94rem;
  border-radius: 0rem;
  margin-top: 0px;
  padding-top: 0.4rem;
  overflow: hidden;
`;

export const NavButton = styled.div`
  background: ${colors.colorBoxFooter};
  border-bottom: 1px solid ${colors.colorLineInWhite};
  width: 100%;
  max-width: 100rem;
  border-radius: 0rem;
  margin-top: -10px;
  overflow: hidden;
  height: 8rem;

  header {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0rem;
    height: 8rem;
    padding: 0px 4% 0px 4%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      margin-bottom: 18px;
      font-family: 'Poppins', sans-serif;
      color: ${colors.colorTextTitle};
      line-height: 2.8rem;
      font-weight: bold;
      margin-top: 20px;
    }

    a {
      width: 35%;
      height: 2.8rem;
      background: ${colors.colorSecundary};
      color: ${colors.colorButtonText};
      border: 0;
      border-radius: 0rem;

      font: 700 1rem Poppins;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: background-color 0.2s;

      span {
        display: block;
        background: rgba(0, 0, 0, 0.08);
        width: 42px;
        height: 2.8rem;
        border-radius: 0rem 0 0 0rem;

        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
        svg {
          color: #fff;
          width: 20px;
          height: 20px;
        }
      }

      strong {
        flex: 1;
        text-align: center;
        color: #fff;
      }

      &:hover {
        background: ${shade(0.2, `${colors.colorSecundary}`)};
      }
    }
  }
`;

export const ContainerDate = styled.div`
  height: auto;
  display: flex;
  align-items: stretch;
`;

export const SideMenu = styled.div`
  display: flex;
  justify-content: initial;
  align-items: flex-start;

  width: 23vw;
  min-width: 20vw;
  height: auto;
  background: none;
  margin-top: 10px;
  padding: 10px;
  border-right: 1px solid ${colors.colorLineInWhite};

  div {
    display: flex;
    width: 23vw;
    min-width: 20vw;
    height: 90vh;

    flex-direction: column;
    justify-content: inherit;
    align-items: flex-start;
    background: none;

    ul {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 5px;
      list-style: none;
      width: 21vw;
      min-width: 20vw;
    }
  }
`;

export const ItemLI = styled.li`
  width: 17.5vw;
  > a {
    padding: 10px 0px 10px 30px;
    width: 17.5vw;
    border-radius: 0px;
    background: none;
    border-bottom: 1px solid ${colors.colorLineInWhite};

    display: flex;
    justify-content: initial;
    align-items: center;

    text-decoration: none;
    transition: transform 0.3s ease-in-out;

    svg {
      width: 1.5rem;
      height: auto;
      margin-right: 15px;
      margin-top: -3px;
    }

    span {
      display: block;
      color: ${colors.colorTextBase};
      font-size: 16px;
      font-weight: normal;
      text-align: center;
    }
    &:hover,
    &.active {
      border-bottom: 1px solid #fa4;
      font-weight: bold;
      opacity: 0.6;
      //transform: translateY(-5px);
      transition: all 0.2s;
      background: ${colors.colorLineInWhite};

      &:after {
        opacity: 1;
        width: 100%;
      }
    }
  }
`;

export const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  min-width: 70%;
  z-index: 6;
  background: ${colors.colorBoxBase};
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
  width: 100%;
  min-width: 70%;
  z-index: 6;
`;

export const Form = styled(Unform)`
  width: 100%;
  min-width: 70%;

  padding: 0px 30px 60px;
  display: flex;
  flex-direction: column;

  background: ${colors.colorBoxBase};

  fieldset {
    border: 0;
    padding: 0rem;

    legend {
      font: 700 1.3rem Poppins;
      color: ${colors.colorTextTitle};
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px solid ${colors.colorLineInWhite};
    }
  }

  fieldset + fieldset {
    margin-top: 3.4rem;
  }
`;

export const Header = styled.header`
  width: 47vw;
  min-width: 40%;
  margin-top: 0;

  margin-bottom: 5rem;
  height: 8rem;
  padding: 0px 4% 0px 4%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border-bottom: 1px solid ${colors.colorLineInWhite};

  h1 {
    margin-bottom: 18px;
    font-family: 'Poppins', sans-serif;
    color: ${colors.colorTextTitle};
    line-height: 2.8rem;
    font-weight: bold;
    margin-top: 20px;
  }

  h2 {
    margin-bottom: 18px;
    font-family: 'Poppins', sans-serif;
    color: ${colors.colorTextTitle};
    line-height: 2.8rem;
    font-weight: bold;
    margin-top: 20px;
  }

  a {
    border: 0;
    line-height: 2.5;
    font-size: 1rem;
    text-align: center;

    border: 0;
    border-radius: 0rem;
    width: 35%;
    min-width: 25%;
    height: 2.8rem;

    text-decoration: none;
    transition: background-color 0.2s;
    text-shadow: 1px 1px 1px #000;
    background-color: ${colors.colorSecundary};

    background-image: linear-gradient(
      to top left,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.2) 30%,
      rgba(0, 0, 0, 0)
    );

    box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.6),
      inset -2px -2px 3px rgba(0, 0, 0, 0.1);

    font: 700 1rem Poppins;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: background-color 0.2s;

    &:active {
      box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6);
    }

    span {
      display: block;
      background: rgba(0, 0, 0, 0.08);
      width: 52px;
      height: 2.8rem;
      border-radius: 0rem 0 0 0rem;

      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      svg {
        color: #fff;
        width: 20px;
        height: 20px;
      }
    }

    strong {
      flex: 1;
      text-align: center;
      color: #fff;
    }

    &:hover {
      background: ${shade(0.2, `${colors.colorSecundary}`)};
    }
  }
`;
