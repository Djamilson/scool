import React from 'react';
import { FiList, FiCheckSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, Content, AnimationContainer, Background } from './styles';

const MessagePayment: React.FC = () => {
  return (
    <Container>
      <Background>
        <div>
          <section>
            <FiCheckSquare />
            <span>Pagamento efetuado com sucesso!</span>
          </section>
        </div>
      </Background>
      <Content>
        <AnimationContainer>
          <h1>Vamos começar os estudos!</h1>
          <Link to="/dashboard">
            <FiList />
            Estudar
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default MessagePayment;
