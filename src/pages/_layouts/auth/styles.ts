import { Form as Unform } from '@unform/web';
import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../../styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px;
  border: 0;

  @media (min-width: 700px) {
    max-width: 100vw;
  }
`;

export const Content = styled.div`
  max-width: 100vw;
  margin-top: 17rem;
  padding: 0rem 10rem;
`;

export const Form = styled(Unform)`
  padding: 0px 60px;
  display: flex;
  flex-direction: column;
  background: ${colors.colorBoxBase};
  padding-bottom: 50px;

  fieldset {
    border: 0;
    padding: 0rem;
    padding-bottom: 60px;

    legend {
      font: 700 1rem Poppins;
      color: ${colors.colorTextTitle};
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px solid ${colors.colorLineInWhite};
    }

    a {
      width: 35%;
      height: 2.8rem;
      background: ${colors.colorSecundary};
      color: ${colors.colorTitleInPrimary};
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
    }

    fieldset + fieldset {
      margin-top: 3rem;
    }

    footer {
      width: 72vw;
      margin-left: -3.75rem;
      padding: 2.4rem;
      height: 120px;
      background: ${colors.colorBoxFooter};
      border-top: 1px solid ${colors.colorLineInWhite};
      margin-top: 10rem;

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
  }
`;

export const Header = styled.header`
  width: 72vw;
  margin-top: 0;
  margin-left: -3.75rem;
  margin-bottom: 5rem;
  height: 8rem;
  padding: 0px 4% 0px 4%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.colorBoxFooter};
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

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    line-height: 1.6rem;
    color: ${colors.colorTextcomplement};
  }
`;

export const Footer = styled.footer`
  width: 72vw;
  margin-top: 0;
  margin-left: 0rem;
  margin-bottom: 5rem;
  height: 8rem;
  padding: 0px 4% 0px 4%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.colorBoxFooter};
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
    margin-bottom: 16px;
    font-family: 'Poppins', sans-serif;
    color: ${colors.colorTextTitle};
    line-height: 2.8rem;
    font-weight: bold;
    margin-top: 20px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    line-height: 1.6rem;
    color: ${colors.colorTextcomplement};

    h2 {
      color: ${colors.colorTextcomplement};
      font: 700 1rem Poppins;
      margin-left: 10px;
    }

    strong {
      color: ${colors.colorTextTitle};
      margin-left: 15px;
      font: 700 1.2rem Poppins;
    }
  }
`;
export const ScheduleItem = styled.div`
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 2fr 2fr;
    column-gap: 1.6rem;
  }
`;

export const ScheduleItemEdit = styled.div`
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 6fr 2fr;
    column-gap: 1.6rem;

    button {
      margin-top: 44px;
      width: 30%;
      min-width: 25%;
      height: 2.4rem;
      margin-right: 20px;

      border: 0;
      border-radius: 0rem;

      font: 700 1rem Poppins;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: background-color 0.2s;
      background: ${colors.colorTextcomplement};

      span {
        display: block;
        background: rgba(0, 0, 0, 0.08);
        width: 52px;
        height: 2.4rem;
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

      &:hover {
        background: ${shade(0.2, `${colors.colorTextcomplement}`)};
      }
    }
  }
`;

export const GroupButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  min-width: 50%;
  border: 0;
`;

export const GobackButton = styled.button`
  width: 30%;
  min-width: 25%;
  height: 2.8rem;
  margin-right: 20px;

  border: 0;
  border-radius: 0rem;

  font: 700 1rem Poppins;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;
  background: ${colors.colorTextcomplement};

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
    background: ${shade(0.2, `${colors.colorTextcomplement}`)};
  }
`;
