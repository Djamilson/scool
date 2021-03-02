import styled from 'styled-components';

import { colors } from '../../../../../styles';

export const ContentTable = styled.table`
  border-collapse: collapse;
  width: 90%;
  margin: 40px;

  thead th {
    color: #999;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid ${colors.colorLineInWhite};
    padding: 15px 5px;
  }

  tbody td {
    border-bottom: 1px solid #eee;
    padding: 0 10px;
  }

  strong {
    padding: 10px 0;
    display: block;
    font-size: 14px;
    color: ${colors.colorTextcomplement};
  }
`;
