import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock, FiHome, FiCheck } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoCurso from '../../../../assets/images/logo.svg';
import Input from '../../../../components/Form/Input';
import { useAuth } from '../../../../hooks/auth';
import { useLoading } from '../../../../hooks/loading';
import { useToast } from '../../../../hooks/toast';
import authRoutes from '../../../../routes/Routes/AuthRoutes';
import getValidationErros from '../../../../utils/getValidationErros';
import {
  Container,
  Content,
  AnimationContainer,
  Background,
  MyButton,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn, loadMenus, updateUser } = useAuth();
  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const user = await signIn({
          email: data.email,
          password: data.password,
        });

        updateUser({ ...user, menus: loadMenus(user.user_groups) });

        history.push(authRoutes.dashboard);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Falha na autenticação',
          description:
            'Ocorreu uma falha ao tentar fazer o login, cheque as credenciais',
        });
      } finally {
        removeLoading();
      }
    },
    [
      signIn,
      addToast,
      removeLoading,
      addLoading,
      history,
      updateUser,
      loadMenus,
    ],
  );

  return (
    <Container>
      <Background>
        <div>
          <section>
            <img src={logoCurso} alt="Proffy" />
            <span>Sua plataforma de estudos online</span>
          </section>
        </div>
      </Background>
      <Content>
        <AnimationContainer>
          <Link to={authRoutes.home}>
            <FiHome />
            Home
          </Link>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Sua senha"
            />
            <MyButton type="submit">
              <span>
                <FiCheck />
              </span>
              <strong>Entrar</strong>
            </MyButton>
            <Link to={authRoutes.forgotPassword}>Esqueci minha senha</Link>
          </Form>

          <Link to={authRoutes.signup}>
            <FiLogIn />
            Cadastre-se
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
