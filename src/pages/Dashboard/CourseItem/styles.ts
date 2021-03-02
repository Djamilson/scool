import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../../styles';

export const Container = styled.li`
  display: flex;
  flex-direction: row;
  background: #fff;
  border-radius: 4px;
  padding: 1rem 1.5rem 1rem 1.5rem;

  width: 100%;
  height: 9.8rem;

  align-items: center;
  justify-content: space-around;

  img {
    width: 130px;
    height: 130px;
    border-radius: 65%;
  }

  div {
    margin-left: 3rem;
    display: flex;
    flex-direction: row;
    width: 100%;

    section {
      width: 60%;
      > strong {
        font-size: 19px;
        display: block;
        color: ${colors.colorTextTitle};
      }

      > span {
        font-size: 18px;
        color: ${colors.colorTextcomplement};
      }
    }
    a {
      width: 40%;
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
