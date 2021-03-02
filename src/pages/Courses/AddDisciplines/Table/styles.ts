import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../../../styles';

export const Container = styled.div``;

export const Content = styled.div`
  margin-top: 30px;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;
      &:hover {
        background: ${shade(0.2, '#7159c1')};
      }
    }
  }
`;

export const ContentTable = styled.table`
  border-collapse: collapse;
  width: 10%;
  max-width: 350px;
  min-width: 200px;

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
