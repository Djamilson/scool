import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser } from 'react-icons/fi';
import { FiCheck } from 'react-icons/fi';
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

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { addLoading, removeLoading } = useLoading();
  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const res = await api.put('/profile', data);

        const { name, email } = res.data.person;

        updateUser({
          ...user,
          person: {
            ...user.person,
            name,
            email,
          },
        });

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
    [addToast, addLoading, removeLoading, history, updateUser, user],
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
          <h2>Meu Perfil!</h2>

          <Button type="submit">
            <span>
              <FiCheck />
            </span>
            <strong>Salvar</strong>
          </Button>
        </Header>

        <fieldset>
          <legend>Dados</legend>

          <Input label="Nome" name="name" icon={FiUser} placeholder="Nome" />

          <Input
            label="Email"
            name="email"
            icon={FiMail}
            placeholder="E-mail"
          />
        </fieldset>
      </Form>
    </Layout>
  );
};

export default Profile;
