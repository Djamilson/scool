import styled from 'styled-components';

import { Footer, Header } from '../../../_layouts/auth/styles';
import { colors } from '../../../../styles';

export const Container = styled.div`
  background: ${colors.colorBoxBase};
  width: 100%;
  margin-top: 0px;
  padding-top: 0;
  overflow: hidden;
`;

export const MyHeader = styled(Header)`
  margin-top: 0;
  margin-left: 0;
`;

export const MyFooter = styled(Footer)`
  margin-bottom: 0px;
`;
