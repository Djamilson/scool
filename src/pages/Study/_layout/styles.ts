import styled from 'styled-components';

import { colors } from '../../../styles';

export const Header = styled.header`
  width: 72vw;
  margin-top: 0;
  margin-bottom: 5rem;
  height: 8rem;
  padding: 0px 4% 0px 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.colorBoxFooter};
  border-bottom: 1px solid ${colors.colorLineInWhite};

  h2 {
    margin-bottom: 18px;
    font-family: 'Poppins', sans-serif;
    color: ${colors.colorTextTitle};
    line-height: 2.8rem;
    font-weight: bold;
    margin-top: 20px;
  }
`;
