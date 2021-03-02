import { shade } from 'polished';
import styled from 'styled-components';

import { Header } from '../_layout/styles';
import { colors } from '../../../styles';

export const ContainerForm = styled.div`
  border: 0;
  background: ${colors.colorBoxBase};
  width: 100%;
  max-width: 94rem;
  border-radius: 0rem;
  margin-top: 20px;
  padding-top: 0.4rem;
  overflow: hidden;
  padding: 0 3rem;

  > fieldset {
    border: 0;
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

    main {
      margin-top: 3rem;
      > fieldset {
        border: 0;
        padding: 0rem;
        margin-top: 0;

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
    }
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

export const Box = styled.div`
  position: relative;
  right: 0;
  left: 0;
  bottom: 0;
  min-width: 60%;
  min-height: 50%;
`;

export const ContetMovie = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: initial;
  margin: 0;
  border: 0;
  padding: 0;
`;

export const CustonHeader = styled(Header)`
  margin-left: -3rem;
`;

export const ContentComment = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 5px;
  list-style: none;

  border: 0;
  width: 100%;
  margin: 20px auto;
  padding: auto 40px;
`;
