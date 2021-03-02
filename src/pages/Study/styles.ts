import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../styles';
import { Header } from './_layout/styles';

export const ContainerForm = styled.div`
  background: ${colors.colorBoxBase};
  width: 100%;
  max-width: 94rem;
  border-radius: 0rem;
  margin-top: 20px;
  padding-top: 0.4rem;
  overflow: hidden;
  padding: 0 6.4rem;

  fieldset {
    border: 0;
    padding: 0rem;
    margin-top: -2rem;

    legend {
      font: 700 1.3rem Poppins;
      color: ${colors.colorTextTitle};
      margin-bottom: 1.4rem;
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
        border-radius: 0rem;

        font: 700 1.1rem Poppins;
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
  }

  @media (min-width: 700px) {
  }

  fieldset + fieldset {
    margin-top: 3.4rem;
  }

  footer {
    width: 85vw;
    margin-left: -6.4rem;
    padding: 4rem 2.4rem;
    background: ${colors.colorBoxFooter};
    border-top: 1px solid ${colors.colorLineInWhite};
    margin-top: 6.4rem;

    @media (min-width: 700px) {
      padding: 4rem 6.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    p {
      @media (min-width: 700px) {
        justify-content: space-between;
      }
    }

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      line-height: 1.4rem;
      color: ${colors.colorTextcomplement};

      img {
        margin-right: 2rem;
      }
    }
  }
`;

export const CustonHeader = styled(Header)`
  margin-left: -6.4rem;
`;
