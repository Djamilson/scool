import styled from 'styled-components';

import { colors } from '../../../../styles';

export const ContentTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-width: 510px;
  min-width: 200px;
  margin-bottom: 70px;

  thead th {
    color: #999;
    text-align: center;
    font-size: 12px;
    border-bottom: 1px solid ${colors.colorLineInWhite};
    padding: 15px 5px;
  }

  tbody td {
    border-bottom: 1px solid #eee;
    padding: 0 10px;
  }

  h2 {
    font-size: 16px;
    color: ${colors.colorTextcomplement};
    display: block;
  }

  strong {
    padding: 10px 0;
    display: block;
    font-size: 12px;
    color: ${colors.colorTextcomplement};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    font-size: 12px;
    strong {
      color: ${colors.colorTextcomplement};
      display: block;
    }
    strong + strong {
      margin-left: 10px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;
  }
`;
