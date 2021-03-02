import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../../styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0.5rem;
  width: 350px;
  border-bottom: 1px solid ${colors.colorLineInWhite};

  > strong {
    color: ${colors.colorTextBase};
    font-weight: 5000;
    font-size: 0.8rem;
    font-family: 'Poppins', sans-serif;
  }

  span {
    display: block;
    background: rgba(0, 0, 0, 0.08);
    width: 45px;
    height: 2.3rem;
    border-radius: 0rem 0 0 0rem;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    svg {
      color: ${colors.colorPrimaryDark};
      width: 20px;
      height: 20px;
    }
  }

  a {
    line-height: 2.5;
    font-size: 1rem;
    text-align: center;

    border: 0;
    border-radius: 0rem;
    width: 45%;
    min-width: 25%;
    height: 2.3rem;

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
      width: 45px;
      height: 2.3rem;
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

  section {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
