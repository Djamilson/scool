import React, { useCallback, useRef } from 'react';
import { FiCheck, FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Layout from '../_layout';
import { Form, Header } from '../_layout/styles';
import api from '../../../_services/api';
import Button from '../../../components/Button';
import Input from '../../../components/Form/Input';
import { useAuth } from '../../../hooks/auth';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import authRoutes from '../../../routes/Routes/AuthRoutes';
import getValidationErros from '../../../utils/getValidationErros';
import { ScheduleItem } from './styles';

interface PasswordFormData {
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Password: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { addLoading, removeLoading } = useLoading();
  const { user } = useAuth();

  const handleSubmit = useCallback(
    async (data: PasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          old_password: Yup.string().required('Campo obrigatório'),
          password: Yup.string().when('old_password', {
            is: (val: any) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: any) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), 'null'], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put('/profile/passwords', data);

        history.push(authRoutes.orders);

        addToast({
          type: 'success',
          title: 'Perfil atualizando',
          description:
            'Suas informações do perfil foram atualizados com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Falha na atualização do perfil!',
          description: 'Falha na atualização do perfil, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [addToast, addLoading, removeLoading, history],
  );

  return (
    <Layout>
      <Form
        ref={formRef}
        initialData={{
          name: user.person.name,
          email: user.person.email,
        }}
        onSubmit={handleSubmit}
      >
        <Header>
          <h2>Minha Senha!</h2>

          <Button type="submit">
            <span>
              <FiCheck />
            </span>
            <strong>Salvar</strong>
          </Button>
        </Header>

        <fieldset>
          <legend>Senha atual</legend>

          <Input
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Sua senha atual"
          />
        </fieldset>

        <fieldset>
          <legend>Nova senha</legend>
          <ScheduleItem>
            <Input
              label="Sua nova senha"
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />

            <Input
              label="Confirma sua nova senha"
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
            />
          </ScheduleItem>
        </fieldset>
      </Form>
    </Layout>
  );
};

export default Password;
