import { Form as Unform } from '@unform/web';
import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../styles';

export const Container = styled.div`
  width: 100%;
  margin: 0px auto;
  display: flex;
`;

export const Form = styled(Unform)`
  background: ${colors.colorBoxBase};
  width: 100%;

  border-radius: 0.4rem;
  padding-top: 0.4rem;
  overflow: hidden;

  fieldset {
    font-family: 'Poppins', sans-serif;

    border: 0;
    padding: 0rem;
    width: 100%;

    margin: 2rem auto;
    display: flex;

    legend {
      font-family: 'Poppins', sans-serif;
      font: 700 1rem Poppins;
      color: ${colors.colorTextTitle};
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px solid ${colors.colorLineInWhite};

      button {
        width: 35%;
        height: 2.8rem;
        background: ${colors.colorSecundary};
        color: ${colors.colorButtonText};
        border: 0;
        border-radius: 0.4rem;

        font: 700 0.8rem Poppins;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: background-color 0.2s;
        margin-top: 0.2rem;
        margin-bottom: 1.2rem;

        span {
          display: block;
          background: rgba(0, 0, 0, 0.08);
          width: 52px;
          height: 2.8rem;
          border-radius: 0.6rem 0 0 0.6rem;

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
  }
`;
