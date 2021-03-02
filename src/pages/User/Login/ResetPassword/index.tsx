import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiLock, FiCheck } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../../_services/api';
import logoCurso from '../../../../assets/images/logo.svg';
import Input from '../../../../components/Form/Input';
import { useLoading } from '../../../../hooks/loading';
import { useToast } from '../../../../hooks/toast';
import getValidationErros from '../../../../utils/getValidationErros';
import { MyButton } from '../SignIn/styles';
import { Container, Content, AnimationContainer, Background } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), 'null'],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Falha ao resetar senha',
          description:
            'Ocorreu uma falha ao tentar resetar sua senha, tente novamente.',
        });
      } finally {
        removeLoading();
      }
    },
    [addToast, addLoading, removeLoading, location.search, history],
  );

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senhar</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />

            <MyButton type="submit">
              <span>
                <FiCheck />
              </span>
              <strong>Resetar</strong>
            </MyButton>
          </Form>

          <button type="button" onClick={() => goBack()}>
            <FiLogIn />
            Voltar login
          </button>
        </AnimationContainer>
      </Content>
      <Background>
        <div>
          <section>
            <img src={logoCurso} alt="Proffy" />
            <span>Criando nova senha!</span>
          </section>
        </div>
      </Background>
    </Container>
  );
};

export default ResetPassword;
