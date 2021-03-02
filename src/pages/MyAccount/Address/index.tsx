import React, { useCallback, useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Layout from '../_layout';
import { Header } from '../_layout/styles';
import api from '../../../_services/api';
import { useAuth } from '../../../hooks/auth';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import ModalDeleteAddress from './ModalDeleteAddress';
import Table from './Table';

interface IAddress {
  id: string;
  number: number;
  street: string;
  complement: string;
  zip_code: string;
  neighborhood: string;
  city: string;
  state: string;
  main: boolean;
}

const Address: React.FC = () => {
  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();
  const { user, updateUser } = useAuth();

  const history = useHistory();

  const [addresses, setAddresses] = useState<IAddress[]>([] as IAddress[]);

  const [modalOpenDeleteAddress, setModalOpenDeleteAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');

  const loadAddresses = useCallback(async () => {
    const { data } = await api.get(`addresses/users`);

    setAddresses(data);
  }, [setAddresses]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const addressMain = useCallback(
    async (addressId: string) => {
      try {
        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        await api.put(`addresses/main/${addressId}`);
        const upDatePAddresses = addresses.map((myAddress) => {
          if (myAddress.id === addressId) return { ...myAddress, main: true };

          return { ...myAddress, main: false };
        });
        setAddresses(upDatePAddresses);

        updateUser({
          ...user,
          person: {
            ...user.person,
            address_id_main: addressId,
          },
        });

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Endereço definido como principal!',
        });
      } catch (erro) {
        addToast({
          type: 'error',
          title: 'Falha!',
          description:
            'Ocorreu uma falha ao tentar definir o andereço como o principal, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [
      addToast,
      setAddresses,
      addresses,
      addLoading,
      removeLoading,
      user,
      updateUser,
    ],
  );

  async function handlerAddressMain(addressId: string): Promise<void> {
    try {
      addressMain(addressId);
    } catch (error) {}
  }

  function toggleModalDeleteAddress(): void {
    setModalOpenDeleteAddress(!modalOpenDeleteAddress);
  }

  async function handlerToggleModalDeleteAddress(
    AddressIdDelete: string,
  ): Promise<void> {
    try {
      setSelectedAddressId(AddressIdDelete);
      toggleModalDeleteAddress();
    } catch (error) {}
  }

  async function handlerDeleteAddress(addressId: string): Promise<void> {
    try {
      await api.delete(`/addresses/${addressId}`);

      setAddresses(addresses.filter((address) => address.id !== addressId));
    } catch (error) {}
  }

  function handlerEditAddress(addressId: string) {
    history.push(`/addresses/edit/${addressId}`);
  }

  return (
    <Layout>
      <ModalDeleteAddress
        isOpen={modalOpenDeleteAddress}
        setIsOpen={toggleModalDeleteAddress}
        handlerDeleteAddress={handlerDeleteAddress}
        addressId={selectedAddressId}
      />

      <Header>
        <h2>Meus Endereços!</h2>

        <Link to="/addresses/new">
          <span>
            <FiPlusCircle />
          </span>
          <strong>Novo endereço</strong>
        </Link>
      </Header>

      <Table
        handlerEditAddress={handlerEditAddress}
        addresses={addresses}
        handlerAddressMain={handlerAddressMain}
        handlerToggleModalDeleteAddress={handlerToggleModalDeleteAddress}
      />
    </Layout>
  );
};

export default Address;
