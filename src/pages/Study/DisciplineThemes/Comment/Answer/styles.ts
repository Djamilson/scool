import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../../../../styles';

export const Container = styled.li`
  margin-top: 0rem;

  fieldset {
    border: 0;
    border-top: 1px solid ${colors.colorLineInWhite};
    margin-top: 0rem;
    padding: 0rem 1rem;
    width: 100%;
    margin-bottom: 0rem;

    section {
      padding: 0;
      display: flex;
      flex-flow: row;
      text-align: center;
      background: ${colors.colorBoxBase};
      > span {
        background: none;
        flex: 1;
        padding: 10px;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin-top: 5px;
        }
      }
      article {
        background: none;
        text-align: left;

        padding: 10px;
        display: flex;
        flex-direction: column;

        header {
          padding: 5px 0px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          span {
            font-size: 13px;
            font-weight: normal;
            color: ${colors.colorTextBase};
            margin-right: 10px;
          }

          strong {
            width: 100%;
            display: flex;
            color: ${colors.colorTextInWhite};
          }
        }

        p {
          font-size: 13px;
          line-height: 18px;
          color: ${colors.colorTextSecundary};
        }

        flex: 5;
      }
      aside {
        flex: 1;
        flex-direction: row-reverse;
        display: flex;
        align-items: flex-end;

        padding: 0;
        > span {
          background: none;
          flex-direction: row;
          display: flex;
          padding: 0;
          margin-bottom: 10px;

          button {
            background: none;
            color: #7159c1;
            border: 0;
            border-radius: 2px;
            width: auto;
            overflow: hidden;
            margin-top: auto;
            display: flex;
            align-items: center;
            transition: background 0.02s;

            &:hover {
              color: ${shade(0.2, '#7159c1')};
              transform: translateY(-2px);
              border-radius: 2px;
            }

            strong {
              font-size: 11px;
              flex: 1;
              text-align: center;
              font-weight: bold;
            }
          }
          button + button {
            margin-left: 10px;
          }
        }
      }
    }
  }
`;
