import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../styles';

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

    h1 {
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
