import React, { useCallback, useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';

import Layout from '../_layout';
import { Header } from '../_layout/styles';
import api from '../../../_services/api';
import Button from '../../../components/Button';
import { useAuth } from '../../../hooks/auth';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import ModalDeletePhone from './ModalDeletePhone';
import ModalEditPhone from './ModalEditPhone';
import ModalNewPhone from './ModalNewPhone';
import Table from './Table';

interface IPhone {
  id: string;
  person_id: string;
  phone: string;
  main: boolean;
}

const Phone: React.FC = () => {
  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();
  const { user, updateUser } = useAuth();

  const [phones, setPhones] = useState<IPhone[]>([] as IPhone[]);
  const [selectedPhone, setSelectedPhone] = useState<IPhone>({} as IPhone);

  const [modalOpenNewPhone, setModalOpenNewPhone] = useState(false);
  const [modalOpenEditPhone, setModalOpenEditPhone] = useState(false);
  const [modalOpenDeletePhone, setModalOpenDeletePhone] = useState(false);
  const [selectedPhoneId, setSelectedPhoneId] = useState<string>('');

  const loadPhones = useCallback(async () => {
    const { data } = await api.get(`phones/users`);

    setPhones(data);
  }, [setPhones]);

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  function toggleModalNewPhone(): void {
    setModalOpenNewPhone(!modalOpenNewPhone);
  }

  async function handlerNewPhone(
    mePhone: Omit<IPhone, 'id' | 'person_id' | 'main'>,
  ): Promise<void> {
    try {
      const { data } = await api.post('phones/users', mePhone);

      const serealizablePhones = phones.map((phone) => {
        return { ...phone, main: false };
      });

      updateUser({
        ...user,
        person: {
          ...user.person,
          phone_id_man: data.id,
        },
      });

      setPhones([data, ...serealizablePhones]);
    } catch (erro) {}
  }

  function toggleModalEditPhone(): void {
    setModalOpenEditPhone(!modalOpenEditPhone);
  }

  async function handlerEditPhone(
    phoneNumber: string,
  ): Promise<IPhone | undefined> {
    try {
      const { id, person_id } = selectedPhone;
      const { data } = await api.put(`phones/users`, {
        id,
        person_id,
        phone: phoneNumber,
      });

      const editPhones = phones.map((myPhone) => {
        if (myPhone.id === data.id) return { ...myPhone, phone: data.phone };

        return myPhone;
      });

      setPhones(editPhones);
      return data;
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Falha na edição!',
        description:
          'Ocorreu uma falha ao tentar fazer a edição, tente novamente!',
      });
    }
  }

  const loadPhone = useCallback(
    async (id: string) => {
      try {
        const { data } = await api.get(`phones/${id}`);
        setSelectedPhone(data);
      } catch (erro) {
        addToast({
          type: 'error',
          title: 'Falha no carregamento!',
          description:
            'Ocorreu uma falha ao tentar carregar o fone para edição, tente novamente!',
        });
      }
    },
    [addToast],
  );

  async function handlerToggleModalEditPhone(phoneId: string): Promise<void> {
    try {
      loadPhone(phoneId);
      toggleModalEditPhone();
    } catch (error) {}
  }

  const phoneMain = useCallback(
    async (phoneId: string) => {
      try {
        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        await api.put(`phones/main/${phoneId}`);
        const upDatePhones = phones.map((myPhone) => {
          if (myPhone.id === phoneId) return { ...myPhone, main: true };

          return { ...myPhone, main: false };
        });
        setPhones(upDatePhones);

        updateUser({
          ...user,
          person: {
            ...user.person,
            phone_id_man: phoneId,
          },
        });

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Fone definido como principal!',
        });
      } catch (erro) {
        addToast({
          type: 'error',
          title: 'Falha!',
          description:
            'Ocorreu uma falha ao tentar definir o fone como o principal, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [addToast, setPhones, phones, addLoading, removeLoading, user, updateUser],
  );

  async function handlerPhoneMain(phoneId: string): Promise<void> {
    try {
      phoneMain(phoneId);
    } catch (error) {}
  }

  function toggleModalDeletePhone(): void {
    setModalOpenDeletePhone(!modalOpenDeletePhone);
  }

  async function handlerToggleModalDeletePhone(
    PhoneIdDelete: string,
  ): Promise<void> {
    try {
      setSelectedPhoneId(PhoneIdDelete);
      toggleModalDeletePhone();
    } catch (error) {}
  }

  async function handlerDeletePhone(phoneId: string): Promise<void> {
    try {
      await api.delete(`/phones/${phoneId}`);

      setPhones(phones.filter((phone) => phone.id !== phoneId));
    } catch (error) {}
  }

  return (
    <Layout>
      <ModalNewPhone
        isOpen={modalOpenNewPhone}
        setIsOpen={toggleModalNewPhone}
        handlerNewPhone={handlerNewPhone}
      />

      <ModalEditPhone
        isOpen={modalOpenEditPhone}
        setIsOpen={toggleModalEditPhone}
        handlerEditPhone={handlerEditPhone}
        phone={selectedPhone}
      />

      <ModalDeletePhone
        isOpen={modalOpenDeletePhone}
        setIsOpen={toggleModalDeletePhone}
        handlerDeletePhone={handlerDeletePhone}
        phoneId={selectedPhoneId}
      />

      <Header>
        <h2>Meus Fones!</h2>

        <Button type="button" onClick={() => toggleModalNewPhone()}>
          <span>
            <FiPlusCircle />
          </span>
          <strong>Novo fone</strong>
        </Button>
      </Header>

      <Table
        phones={phones}
        handlerToggleModalEditPhone={handlerToggleModalEditPhone}
        handlerPhoneMain={handlerPhoneMain}
        handlerToggleModalDeletePhone={handlerToggleModalDeletePhone}
      />
    </Layout>
  );
};

export default Phone;
