import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../../styles';

export const ListDisciplineButton = styled.button`
  width: 185px;
  height: 2.8rem;

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
  }

  background: ${colors.colorPrimary};
  color: #fff;

  &:hover {
    background: ${shade(0.2, `${colors.colorPrimary}`)};
  }
`;
