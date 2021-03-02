import React, { useRef, useCallback } from 'react';
import { FiCheckCircle, FiLogIn, FiMail } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../../_services/api';
import logoCurso from '../../../../assets/images/logo.svg';
import Input from '../../../../components/Form/Input';
import { useLoading } from '../../../../hooks/loading';
import { useToast } from '../../../../hooks/toast';
import authRoutes from '../../../../routes/Routes/AuthRoutes';
import getValidationErros from '../../../../utils/getValidationErros';
import { MyButton } from '../SignIn/styles';
import { Container, Content, AnimationContainer, Background } from './styles';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação de senha',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.',
        });

        history.push(authRoutes.home);
      } catch (err) {
        addLoading({
          loading: false,
        });

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Falha na recuperação de senha',
          description:
            'Ocorreu uma falha ao tentar recuperar a senha, tente novamente.',
        });
      } finally {
        removeLoading();
      }
    },
    [addLoading, removeLoading, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <MyButton type="submit">
              <span>
                <FiCheckCircle />
              </span>
              <strong>Recuperar</strong>
            </MyButton>
          </Form>

          <Link to={authRoutes.signin}>
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background>
        <div>
          <section>
            <img src={logoCurso} alt="Proffy" />
            <span>Recuperando senha!</span>
          </section>
        </div>
      </Background>
    </Container>
  );
};

export default ForgotPassword;
