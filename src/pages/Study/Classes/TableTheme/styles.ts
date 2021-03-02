import styled from 'styled-components';

import { colors } from '../../../../styles';

export const Container = styled.div``;

export const Content = styled.div`
  margin-top: 30px;
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  background: ${colors.colorBoxBase};
  width: 100%;
  max-width: 94rem;
  border-radius: 0rem;
  margin-top: 20px;
  padding-top: 0.4rem;
  overflow: hidden;

  header {
    background: ${colors.colorBoxFooter};
    border-bottom: 1px solid ${colors.colorLineInWhite};
    width: 85vw;
    height: 3.5rem;

    margin-top: -0.4rem;
    margin-bottom: 5rem;
    margin-left: -2.4rem;

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
      font-size: 1rem;
      line-height: 1.6rem;
      color: ${colors.colorTextcomplement};

      img {
        margin-right: 1rem;
      }
    }
  }

  footer {
    width: 85vw;
    padding: 4rem 2.4rem;
    background: ${colors.colorBoxFooter};
    border-top: 1px solid ${colors.colorLineInWhite};
    margin-top: 6.4rem;
    margin-left: -2.4rem;

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

export const ContentTable = styled.table`
  width: 100%;
  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }
  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    button {
      display: flex;
      align-items: center;

      strong {
        font-size: 12px;
        margin-left: 5px;
        color: #3b3a3a;
      }
    }
  }
  img {
    height: 100px;
  }
  strong {
    color: #333;
    display: block;
  }
  span {
    color: #333;
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }
  div {
    display: flex;
    align-items: center;
    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }
  button {
    background: none;
    border: 0;
    padding: 6px;
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;
  span {
    color: #999;
    font-weight: bold;
  }
  strong {
    font-size: 28px;
    margin-left: 5px;
    color: #3b3a3a;
  }
`;
