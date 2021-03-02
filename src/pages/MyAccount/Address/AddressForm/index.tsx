import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FiCheck, FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Layout from '../../../_layouts/auth';
import {
  Header,
  GroupButton,
  GobackButton,
  Form,
} from '../../../_layouts/auth/styles';
import api from '../../../../_services/api';
import warningIcon from '../../../../assets/images/icons/warning.svg';
import Button from '../../../../components/Button';
import { useAuth } from '../../../../hooks/auth';
import { useLoading } from '../../../../hooks/loading';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErros';
import {
  schemaValidationCep,
  schemaValidationCity,
  schemaValidationNumber,
  schemaValidationState,
} from '../../../../utils/schema';
import Address from '../../Form/Address';

interface SignUpFormData {
  number: string;
  street: string;
  complement?: string;
  neighborhood: string;
  zip_code: string;
  city: string;
  state: string;
}

interface ParamTypes {
  addressId: string;
}

const AddressForm: React.FC = () => {
  const { addressId } = useParams<ParamTypes>();

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { addLoading, removeLoading } = useLoading();

  const { user, updateUser } = useAuth();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

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

  useEffect(() => {
    async function searchAddress() {
      if (typeof addressId !== typeof undefined) {
        try {
          addLoading({
            loading: true,
            description: 'Aguarde ...',
          });

          const { data } = await api.get(`addresses/users/${addressId}`);

          formRef.current?.setData(data);

          const { city } = data;

          setCitySelect({ value: city.id, label: city.name });
          setStateSelect({ value: city.state.id, label: city.state.name });
          setEdit(true);
        } catch (err) {
          addToast({
            type: 'error',
            title: 'Falha na busca,',
            description:
              'Ocorreu uma falha ao fazer a busca, tente volta para página anterior!',
          });
        } finally {
          removeLoading();
        }
      }
    }
    searchAddress();
  }, [addLoading, addToast, removeLoading, addressId, setEdit]);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schemaAddress = Yup.object().shape({
          number: schemaValidationNumber,
          street: Yup.string().required('Quadra/Rua obrigatório'),
          complement: Yup.string(),
          neighborhood: Yup.string().required('Bairro obrigatório'),
          zip_code: schemaValidationCep,
          state: schemaValidationState(stateSelect.value),
          city: schemaValidationCity(citySelect.value),
        });

        await schemaAddress.validate(data, {
          abortEarly: false,
        });

        if (typeof addressId !== typeof undefined) {
          await api.put('addresses', {
            ...data,
            id: addressId,
            city_id: citySelect.value,
          });
          addToast({
            type: 'success',
            title: 'Editado!',
            description: 'Dados editados com sucesso!',
          });
        } else {
          const res = await api.post('addresses', {
            ...data,
            city_id: citySelect.value,
          });

          updateUser({
            ...user,
            person: {
              ...user.person,
              address_id_main: res.data.id,
            },
          });

          addToast({
            type: 'success',
            title: 'Cadastrada!',
            description: 'Dados cadastrado com sucesso!',
          });
        }

        history.goBack();
      } catch (err) {
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
      addLoading,
      removeLoading,
      addressId,
      history,
      user,
      updateUser,
      stateSelect.value,
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
          <h2>Cadastro de endereço</h2>
          <GroupButton>
            <GobackButton type="button" onClick={() => goBack()}>
              <span>
                <FiArrowLeft />
              </span>
              <strong>Voltar</strong>
            </GobackButton>

            <Button type="submit">
              <span>
                <FiCheck />
              </span>
              <strong>Salvar</strong>
            </Button>
          </GroupButton>
        </Header>
        <Address
          edit={edit}
          handleSelectState={handleSelectState}
          stateSelectOption={stateSelect}
          citySelect={citySelect}
          handleSelectCity={handleSelectCity}
        />
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

export default AddressForm;
