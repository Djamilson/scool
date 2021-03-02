import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../../styles';

export const Container = styled.div`
  border: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0rem;
  margin-bottom: 20px;
  padding: 0 30px;
  justify-content: center;
  align-items: center;

  ul {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    border: 0;
    width: 100%;
  }
`;

export const Header = styled.header`
  width: 100%;
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
`;

interface IPropsDetail {
  detail: boolean;
}
export const Item = styled.li<IPropsDetail>`
  width: 100%;
  height: ${(props) => (props.detail ? '80vh' : '32vh')};
  padding: 10px 15px;
  border-radius: 0px;
  background: ${colors.colorTitleInPrimary};

  border: 1px solid ${colors.colorLineInWhite};
  border-left: 10px solid ${colors.colorPrimaryDarker};

  transition: transform 0.3s ease-in-out;
  strong {
    display: block;
    color: #7159c1;
    font-size: 18px;
    font-weight: normal;
    text-align: center;
  }
`;

export const HeaderItem = styled.header`
  width: 100%;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border-bottom: 1px solid ${colors.colorLineInWhite};

  h3 {
    display: block;
    color: ${colors.colorTextBase};
    font-size: 16px;
    font-weight: normal;
    text-align: center;
  }

  button {
    border: 0;
    line-height: 2.5;
    font-size: 1rem;

    border: 0;
    border-radius: 0rem;
    width: 50%;
    min-width: 25%;
    height: 2.8rem;

    transition: background-color 0.2s;
    background: none;

    font: 700 1rem Poppins;
    display: flex;
    align-items: center;
    justify-content: left;
    transition: background-color 0.2s;

    &:active {
      box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6);
    }

    span {
      width: 52px;
      height: 2.8rem;
      border-radius: 0rem 0 0 0rem;

      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      svg {
        color: ${colors.colorTextInWhite};
        width: 25px;
        height: 25px;
      }
    }

    strong {
      flex: 1;
      text-align: left;
      color: ${colors.colorTextInWhite};
    }

    &:hover {
      opacity: 0.6;
    }
  }
`;

export const ContentItem = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  border-radius: 4px;
  padding: 1rem 1.5rem 1rem 1.5rem;

  width: 100%;
  height: 7rem;
  margin-bottom: 1rem;

  align-items: center;
  justify-content: space-around;

  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }

  > div {
    display: flex;
    margin-left: 30px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    border: 0;

    > strong {
      font-size: 14px;
      display: block;
      color: ${colors.colorTextTitle};
    }

    > span {
      font-size: 14px;
      color: ${colors.colorTextcomplement};
    }
    button {
      width: 100%;
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

export const ContentDetail = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  padding: 1rem 1.5rem;

  width: 100%;
  height: 8rem;
  margin-bottom: 1rem;

  align-items: center;
  justify-content: space-around;
  border: 0;

  article {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    border: 0;
    height: 10vh;

    > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border: 0;

      z-index: 1;
      margin-top: 10px;
      strong {
        height: 40px;
        width: 40px;

        padding: 6px;
        text-align: center;

        background: ${colors.colorTitleInPrimary};
        border-radius: 50%;
        border: 2px solid ${colors.colorSecundaryDark};
        svg {
          width: 22px;
          height: 22px;
          color: ${colors.colorSecundaryDark};
        }
      }
      span {
        height: 15px;
        width: 15px;
        background-color: ${colors.colorSecundaryDark};
        border-radius: 50%;
        display: inline-block;
        border: 0;
      }
    }

    hr {
      height: 3px;
      width: 100%;
      margin: -20px auto;

      background-image: linear-gradient(
        to right,
        ${colors.colorSecundary} 0,
        ${colors.colorSecundary} 50%,
        ${colors.colorLineInWhite} 50%
      );
      background-size: 202% 100%;
      //background-position: 66% 0;
      //background-position: 36% 0;
      //background-position: 100% 0;
      border: 0;
    }

    > strong {
      font-size: 14px;
      display: block;
      color: ${colors.colorTextTitle};
    }

    > span {
      font-size: 14px;
      color: ${colors.colorTextcomplement};
    }
  }

  > section {
    display: flex;
    margin-top: 50px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 110%;
    border: 0;

    div {
      > strong {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        span {
          font-size: 12px;
          display: block;
          color: ${colors.colorTextTitle};
        }
      }

      > span {
        font-size: 12px;
        color: ${colors.colorTextcomplement};
        font-style: italic;
        font-weight: bold;
      }
    }
  }
`;

export const ButtonDetail = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  border-radius: 4px;
  padding: 1rem 1.5rem;

  width: 100%;
  height: 8rem;
  margin-bottom: 1rem;

  align-items: center;
  justify-content: space-around;
  border: 0;

  button {
    color: ${colors.colorButtonText};
    text-decoration: none;
    border: none;
    line-height: 2.7;
    text-align: center;
    border-radius: 0rem;
    width: 100%;
    min-width: 25%;
    height: 2.7rem;
    background: ${colors.colorButtonBackground};
    font: 700 0.8rem Poppins;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    span {
      display: block;
      background: none;
      width: 32px;
      height: 2.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      svg {
        color: ${colors.colorButtonText};
        width: 20px;
        height: 20px;
      }
    }

    strong {
      flex: 1;
      text-align: center;
      color: ${colors.colorButtonText};
    }

    &:hover {
      color: ${shade(0.2, `${colors.colorButtonText}`)};
      background: ${shade(0.2, `${colors.colorButtonBackground}`)};
      border-radius: 8px;
    }
  }

  button + a {
    margin-left: 20px;
  }

  a {
    color: ${colors.colorButtonBackground};
    text-decoration: none;
    border: 2px solid ${colors.colorButtonBackground};
    line-height: 2.5;
    text-align: center;
    border-radius: 0rem;
    width: 100%;
    min-width: 25%;
    height: 2.7rem;
    background: ${colors.colorBoxBase};
    font: 700 0.8rem Poppins;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    span {
      display: block;
      background: none;
      width: 32px;
      height: 2.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      svg {
        color: ${colors.colorButtonBackground};
        width: 20px;
        height: 20px;
      }
    }

    strong {
      flex: 1;
      text-align: center;
      color: ${colors.colorButtonBackground};
    }

    &:hover {
      border-radius: 8px;

      color: ${shade(0.2, `${colors.colorBoxBase}`)};
    }
  }
`;
