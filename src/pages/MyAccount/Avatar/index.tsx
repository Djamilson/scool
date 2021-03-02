import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiCamera } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';

import Layout from '../_layout';
import { Form, Header } from '../_layout/styles';
import api from '../../../_services/api';
import { useAuth } from '../../../hooks/auth';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import authRoutes from '../../../routes/Routes/AuthRoutes';
import { AvatarInput } from './styles';

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { addLoading, removeLoading } = useLoading();
  const { user, updateUser } = useAuth();

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        try {
          addLoading({
            loading: true,
            description: 'Aguarde, atualizando o avatar ...',
          });

          const data = new FormData();

          data.append('file', e.target.files[0]);

          const res = await api.patch('/users/avatar', data);

          const { avatar, avatar_url } = res.data.person;

          const newUser = {
            ...user,
            person: { ...user.person, avatar, avatar_url },
          };

          updateUser(newUser);
          history.push(authRoutes.orders);

          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        } catch (err) {
          addToast({
            type: 'error',
            title: 'Falha ao atualizar o avatar!',
            description:
              'Ocorreu uma falha ao tentar fazer o atualização do avatar, tente novamente!',
          });
        } finally {
          removeLoading();
        }
      }
    },
    [addToast, addLoading, removeLoading, updateUser, user, history],
  );

  return (
    <Layout>
      <Form
        ref={formRef}
        initialData={{
          name: user.person.name,
          email: user.person.email,
        }}
        onSubmit={() => {}}
      >
        <Header>
          <h2>Meu Avatar!</h2>
        </Header>

        <AvatarInput>
          <img src={user.person.avatar_url} alt={user.person.name} />
          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleAvatarChange} />
          </label>
        </AvatarInput>
      </Form>
    </Layout>
  );
};

export default Profile;
