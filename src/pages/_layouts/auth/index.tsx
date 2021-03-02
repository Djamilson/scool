import React from 'react';

import Header from '../../../components/Header';
import { Wrapper, Content } from './styles';

interface AuthLayoutProps {
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ className, children }) => {
  return (
    <Wrapper className={className}>
      <Header />
      <Content> {children} </Content>
    </Wrapper>
  );
};

export default AuthLayout;
