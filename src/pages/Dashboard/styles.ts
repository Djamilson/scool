import { Link } from 'react-router-dom';

import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../styles';

export const CourseList = styled.ul`
  margin-top: 30px;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
  list-style: none;
`;

export const OpenDetails = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: #edfff6;
`;

export const OpenOnWeekends = styled.div`
  background: linear-gradient(154.16deg, #edfff6 7.85%, #ffffff 91.03%);
  border: 1px solid #a1e9c5;
  color: #37c77f;
  width: 300px;
  border-radius: 5px;
  padding: 30px;

  svg {
    display: block;
    margin-bottom: 20px;
  }
`;

export const OpenButton = styled.div`
  background: linear-gradient(154.16deg, #edfff6 7.85%, #ffffff 91.03%);
  border: 1px solid #a1e9c5;
  color: #37c77f;
  padding: 20px 30px 30px 30px;
  width: 300px;
  border-radius: 5px;

  > a {
    margin-top: 10px;
    width: 15rem;
    height: 3rem;
    border-radius: 0.4rem;
    font: 700 1.2rem Poppins;

    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    color: ${colors.colorButtonText};

    transition: background-color 0.2s;
  }

  a:first-child {
    margin-right: 1.6rem;
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
