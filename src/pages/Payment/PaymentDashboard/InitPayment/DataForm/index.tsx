import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Layout from '../../../../_layouts/auth';
import { Header, Form } from '../../../../_layouts/auth/styles';
import api from '../../../../../_services/api';
import warningIcon from '../../../../../assets/images/icons/warning.svg';
import Button from '../../../../../components/Button';
import { useAuth } from '../../../../../hooks/auth';
import { useLoading } from '../../../../../hooks/loading';
import { useToast } from '../../../../../hooks/toast';
import authRoutes from '../../../../../routes/Routes/AuthRoutes';
import IPerson from '../../../../../types/person';
import getValidationErrors from '../../../../../utils/getValidationErros';
import {
  schemaValidationCep,
  schemaValidationNumber,
  schemaValidationPhone,
  schemaValidationState,
  schemaValidationCity,
  schemaValidationDate,
  schemaValidationCpf,
  schemaValidationRG,
} from '../../../../../utils/schema';
import Address from '../../../../MyAccount/Form/Address';
import Documents from '../../../../MyAccount/Form/Documents';
import Phone from '../../../../MyAccount/Form/Phone';

interface SignUpFormData {
  birdthDate: Date;
  cpf: string;
  rg: string;
  rgss: string;

  number: string;
  street: string;
  complement?: string;
  neighborhood: string;
  zip_code: string;
  state: string;
  city: string;
  phone: string;
}

const DataForm: React.FC = () => {
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const addressId = user?.person?.address_id_main;
  const phoneId = user?.person?.phone_id_man;
  const personId = user?.person?.id;

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const { addLoading, removeLoading } = useLoading();

  const INITIAL_CITY = {
    value: '0',
    label: 'Selecione a cidade',
  };

  const INITIAL_STATE = {
    value: '0',
    label: 'Nome do estado...',
  };

  const [stateSelect, setStateSelect] = useState(INITIAL_STATE);
  const [citySelect, setCitySelect] = useState(INITIAL_CITY);
  const [edit, setEdit] = useState<boolean>(false);
  const [person, setPerson] = useState<IPerson>({} as IPerson);

  const loadPerson = useCallback(async () => {
    const { data } = await api.get(`persons/${personId}`);
    setPerson(data);
  }, [personId]);

  useEffect(() => {
    loadPerson();
  }, [loadPerson]);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        if (person.cpf === null && phoneId === null && addressId === null) {
          const schema = Yup.object().shape({
            birdthDate: schemaValidationDate,
            cpf: schemaValidationCpf,
            rg: schemaValidationRG,
            rgss: Yup.string().required('Órgão de expedição obrigatório'),
            number: schemaValidationNumber,

            street: Yup.string().required('Quadra/Rua obrigatório'),
            complement: Yup.string(),
            neighborhood: Yup.string().required('Bairro obrigatório'),
            zip_code: schemaValidationCep,
            state: schemaValidationState(stateSelect.value),
            city: schemaValidationCity(citySelect.value),

            phone: schemaValidationPhone,
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const {
            birdthDate,
            cpf,
            rg,
            rgss,
            number,
            street,
            complement,
            neighborhood,
            zip_code,
            phone,
          } = data;

          const newDocuments = {
            birdthDate,
            cpf,
            rg,
            rgss: rgss.toUpperCase(),
          };

          const myAddress = {
            number,
            street,
            complement,
            neighborhood,
            zip_code,
            city_id: citySelect.value,
          };

          const res = await api.post('persons/documents/all', {
            ...newDocuments,
            ...myAddress,
            phone,
          });

          console.log('', res.data);
          updateUser({
            ...user,
            person: {
              ...user.person,
              address_id_main: res.data.address_id_main,
              phone_id_man: res.data.phone_id_man,
            },
          });
        }

        if (person.cpf === null && phoneId !== null && addressId !== null) {
          const schemaDocuments = Yup.object().shape({
            birdthDate: schemaValidationDate,
            cpf: schemaValidationCpf,
            rg: schemaValidationRG,
            rgss: Yup.string().required('Órgão de expedição obrigatório'),
          });
          await schemaDocuments.validate(data, {
            abortEarly: false,
          });

          const { birdthDate, cpf, rg, rgss } = data;
          await api.put('persons/documents', { birdthDate, cpf, rg, rgss });
        }

        if (person.cpf !== null && phoneId === null && addressId !== null) {
          const schemaDocuments = Yup.object().shape({
            phone: schemaValidationPhone,
          });
          await schemaDocuments.validate(data, {
            abortEarly: false,
          });
          const { phone } = data;

          const newPhone = await api.post('phones/users', { phone });

          updateUser({
            ...user,
            person: {
              ...user.person,
              phone_id_man: newPhone.data.id,
            },
          });
        }

        if (person.cpf !== null && phoneId !== null && addressId === null) {
          const schemaAddress = Yup.object().shape({
            street: Yup.string().required('Quadra/Rua obrigatório'),
            number: schemaValidationNumber,
            complement: Yup.string(),
            neighborhood: Yup.string().required('Bairro obrigatório'),
            zip_code: schemaValidationCep,
            state: schemaValidationState(stateSelect.value),
            city: schemaValidationCity(citySelect.value),
          });

          await schemaAddress.validate(data, {
            abortEarly: false,
          });

          const { street, complement, neighborhood, zip_code, number } = data;

          const newAddress = await api.post('addresses', {
            number,
            street,
            complement,
            neighborhood,
            zip_code,
            city_id: citySelect.value,
          });

          updateUser({
            ...user,
            person: {
              ...user.person,
              address_id_main: newAddress.data.id,
            },
          });
        }

        if (person.cpf === null && phoneId !== null && addressId === null) {
          const schemaAddress = Yup.object().shape({
            birdthDate: schemaValidationDate,
            cpf: schemaValidationCpf,
            rg: schemaValidationRG,
            rgss: Yup.string().required('Órgão de expedição obrigatório'),

            street: Yup.string().required('Quadra/Rua obrigatório'),
            number: schemaValidationNumber,
            complement: Yup.string(),
            neighborhood: Yup.string().required('Bairro obrigatório'),
            zip_code: schemaValidationCep,
            state: schemaValidationState(stateSelect.value),
            city: schemaValidationCity(citySelect.value),
          });

          await schemaAddress.validate(data, {
            abortEarly: false,
          });

          const {
            birdthDate,
            cpf,
            rg,
            rgss,

            street,
            complement,
            neighborhood,
            zip_code,
            number,
          } = data;

          const meData = {
            birdthDate,
            cpf,
            rg,
            rgss,

            number,
            street,
            complement,
            neighborhood,
            zip_code,
            city_id: citySelect.value,
          };

          const newData = await api.post('persons/documents/addresses', meData);

          updateUser({
            ...user,
            person: {
              ...user.person,
              address_id_main: newData.data.address_id_main,
            },
          });
        }

        if (person.cpf === null && phoneId === null && addressId !== null) {
          const schemaAddress = Yup.object().shape({
            birdthDate: schemaValidationDate,
            cpf: schemaValidationCpf,
            rg: schemaValidationRG,
            rgss: Yup.string().required('Órgão de expedição obrigatório'),
            phone: schemaValidationPhone,
          });

          await schemaAddress.validate(data, {
            abortEarly: false,
          });

          const {
            birdthDate,
            cpf,
            rg,
            rgss,

            phone,
          } = data;

          const meData = {
            birdthDate,
            cpf,
            rg,
            rgss: rgss.toUpperCase(),
            phone,
          };

          const newData = await api.post('persons/documents/phones', meData);

          updateUser({
            ...user,
            person: {
              ...user.person,
              phone_id_man: newData.data.phone_id_man,
            },
          });
        }

        if (person.cpf !== null && phoneId === null && addressId === null) {
          const schemaAddress = Yup.object().shape({
            street: Yup.string().required('Quadra/Rua obrigatório'),
            number: schemaValidationNumber,
            complement: Yup.string(),
            neighborhood: Yup.string().required('Bairro obrigatório'),
            zip_code: schemaValidationCep,
            state: schemaValidationState(stateSelect.value),
            city: schemaValidationCity(citySelect.value),
            phone: schemaValidationPhone,
          });

          await schemaAddress.validate(data, {
            abortEarly: false,
          });

          const {
            street,
            complement,
            neighborhood,
            zip_code,
            number,

            phone,
          } = data;

          const meData = {
            number,
            street,
            complement,
            neighborhood,
            zip_code,
            city_id: citySelect.value,
            phone,
          };

          const newData = await api.post('persons/addresses/phones', meData);

          updateUser({
            ...user,
            person: {
              ...user.person,
              address_id_main: newData.data.address_id_main,
              phone_id_man: newData.data.phone_id_man,
            },
          });
        }

        addToast({
          type: 'success',
          title: 'Cadastrada!',
          description: 'Dados cadastrado com sucesso!',
        });

        history.push(authRoutes.paymentsDashboards);
      } catch (err) {
        console.log('errr:::::', err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Falha no cadastro!',
          description:
            'Ocorreu uma falha ao tentar fazer o cadastro, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [
      addToast,
      citySelect,
      stateSelect,
      addLoading,
      removeLoading,
      history,
      phoneId,
      updateUser,
      addressId,
      person.cpf,
      user,
    ],
  );

  const handleSelectCity = useCallback(
    (selectedOption: any) => {
      setCitySelect(selectedOption);
      setEdit(false);
    },
    [setEdit, setCitySelect],
  );

  const handleSelectState = useCallback(
    (selectedOption: any) => {
      setEdit(false);
      setStateSelect(selectedOption);
    },
    [setEdit, setStateSelect],
  );

  return (
    <Layout>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Header>
          <h2>Complete o seu cadastro antes de prosseguir!</h2>

          <Button type="submit">
            <span>
              <FiCheck />
            </span>
            <strong>Salvar</strong>
          </Button>
        </Header>

        {person.cpf === null && <Documents />}

        {addressId === null && (
          <Address
            edit={edit}
            handleSelectState={handleSelectState}
            stateSelectOption={stateSelect}
            citySelect={citySelect}
            handleSelectCity={handleSelectCity}
          />
        )}
        {phoneId === null && <Phone />}

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
        </footer>
      </Form>
    </Layout>
  );
};

export default DataForm;
