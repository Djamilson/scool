import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { shade } from 'polished';
import styled from 'styled-components';

import Button from '../../../../components/Button';
import { colors } from '../../../../styles';
import { px2vw } from '../../../../utils/px2vw';

export const Container = styled.div`
  bottom: 0;
  margin: 0;
  height: 100%;
  width: 240px;
  border-left: 1px solid ${colors.colorLineInWhite};
`;

export const Title = styled.span`
  margin-top: 0rem;
  justify-content: center;
  display: flex;

  span {
    color: ${colors.colorTextTitle};
    padding-bottom: 3rem;
    line-height: 20px;
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: ${px2vw(390)};
  padding: 5px 0 5px 15px;
  margin-bottom: 20px;
`;

export const Item = styled(Button)`
  width: 100%;
  background: none;
  border: 0;
  border-bottom: 1px solid ${colors.colorLineInWhite};
  box-shadow: none;
  font-size: 1rem;
  text-shadow: none;
  margin-bottom: 5px;

  strong {
    flex: 1;
    text-align: center;
    color: ${colors.colorTextBase};
  }

  span {
    width: 40px;
    background: ${colors.colorSecundary};
  }

  &:hover {
    background: none;
    opacity: 0.6;
    border-bottom: 2px solid ${shade(0.2, `${colors.colorSecundary}`)};

    strong {
      //color: ${colors.colorTitleInPrimary};
      transform: translateY(-5px);
      transition: all 0.2s;
    }
    span {
      background: ${shade(0.2, `${colors.colorSecundary}`)};
    }
  }
`;
