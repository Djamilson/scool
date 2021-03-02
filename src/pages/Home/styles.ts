import { Link } from 'react-router-dom';

import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../styles';

export const Box = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 140vh;
  margin-top: 0;
  margin-bottom: 0rem;
  padding: 0 3rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    padding: 3rem;
    margin-top: 0rem;
    height: 70vh;
  }

  color: ${colors.colorTextInPrimary};
  background: ${colors.colorPrimary};

  img {
    width: 100%;
    background-size: cover;
    @media (min-width: 1024px) {
      width: 33rem;
      margin-top: 4rem;
      margin-bottom: 2rem;
      border: 0;
      margin-left: -2.5rem;
    }
  }
`;

export const ContainerLogo = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10rem;

  width: 100%;

  @media (min-width: 1024px) {
    margin-top: 5rem;
    padding: 0 40px;
  }

  > img {
    margin-top: -10rem;
    height: 5rem;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h2 {
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2rem;

      @media (min-width: 1024px) {
        text-align: center;
        font-size: 1.6rem;
      }

      @media (min-width: 768px) {
        flex-direction: column;
      }

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
    h2 + h2 {
      margin-left: 6rem;
      @media (min-width: 1024px) {
        margin-left: 0.5rem;
      }
    }

    h2:first-child {
      margin-top: 2rem;
      @media (min-width: 1024px) {
        margin-top: 0rem;
      }
    }

    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }

  @media (min-width: 1100px) {
    grid-area: logo;
    align-self: center;
    margin: 0;
  }

  @media (max-width: 700px) {
    margin-top: 300px;
  }
`;

export const Footer = styled.div`
  width: 100%;

  max-width: 1440px;
  height: 80vh;
  font-weight: 500;
  font-size: 1.6rem;
  border: 0;

  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;

  @media (min-width: 1024px) {
    flex-direction: row;
    height: 50vh;
    justify-content: center;

    margin-top: 0rem;
  }

  section {
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: center;
    border: 0;

    h2 {
      font-weight: 500;
      font-size: 0.9rem;
      color: ${colors.colorTextTitle};
      margin-bottom: 0.1rem;

      @media (min-width: 1024px) {
        text-align: initial;
        font-size: 1.6rem;
        margin-right: 0.5rem;
        margin-bottom: 0rem;
      }
    }
    strong {
      font-weight: 700;
      font-size: 0.9rem;
      color: ${colors.colorTextTitle};

      margin-bottom: 1rem;

      @media (min-width: 1024px) {
        text-align: center;
        font-size: 1.6rem;
        margin-right: 0rem;
        margin-bottom: 0rem;
      }
    }

    @media (max-width: 768px) {
      margin-left: 0rem;
    }
  }

  span {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: 0.8rem;
    margin-left: 2.5rem;
    margin-bottom: 2rem;

    font-weight: 500;
    font-size: 0.8rem;
    color: ${colors.colorTextTitle};

    @media (min-width: 1024px) {
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      margin-left: 0rem;
    }

    strong {
      margin-left: 1rem;
      > img {
        height: 0.8rem;
        margin-left: 1rem;
        @media (min-width: 1100px) {
          height: 100%;
        }
      }
    }
  }

  a {
    width: 15rem;
    height: 4rem;
    min-height: 4rem;
    border-radius: 0.4rem;
    font: 700 1.4rem Poppins;

    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    color: ${colors.colorButtonText};
    margin-bottom: 2rem;

    transition: background-color 0.2s;
    margin: 1rem;
  }
`;

export const LinkStudy = styled(Link)`
  background: ${colors.colorPrimaryLighter};
  img {
    height: 30px;
    margin-right: 16px;
  }
  &:hover {
    background: ${shade(0.2, `${colors.colorPrimaryLight}`)};
  }
`;

export const LinkGiveClasses = styled(Link)`
  background: ${colors.colorSecundary};
  img {
    margin-right: 16px;
    height: 30px;
  }
  &:hover {
    color: ${colors.colorButtonText};

    background: ${shade(0.2, `${colors.colorSecundaryDark}`)};
  }
`;
