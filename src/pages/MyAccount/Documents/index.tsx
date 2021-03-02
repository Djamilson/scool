import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiCheck, FiEdit } from 'react-icons/fi';
import { MdCheck } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Layout from '../_layout';
import { Form, Header } from '../_layout/styles';
import { ScheduleItemEdit } from '../../_layouts/auth/styles';
import api from '../../../_services/api';
import Button from '../../../components/Button';
import Input from '../../../components/Form/Input';
import { useAuth } from '../../../hooks/auth';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import authRoutes from '../../../routes/Routes/AuthRoutes';
import IDocuments from '../../../types/documents';
import { onlyNumbers, onlyLetters } from '../../../utils';
import getValidationErrors from '../../../utils/getValidationErros';
import * as masks from '../../../utils/masks';
import {
  schemaValidationDate,
  schemaValidationCpf,
} from '../../../utils/schema';

interface IPerson {
  id: string;
  documents: IDocuments;
}

const Documents: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { addLoading, removeLoading } = useLoading();
  const { user } = useAuth();
  const [person, setPerson] = useState<IPerson>({} as IPerson);

  const [disabledCpf, setDisabledCpf] = useState<boolean>(false);
  const [disabledRg, setDisabledRg] = useState<boolean>(false);
  const [disabledRgss, setDisabledRgss] = useState<boolean>(false);
  const [disabledBirdthDate, setDisabledBirdthDate] = useState<boolean>(false);

  const [visibleButtonEditCpf, setVisibleButtonEditCpf] = useState<boolean>(
    false,
  );
  const [visibleButtonEditRg, setVisibleButtonEditRg] = useState<boolean>(
    false,
  );
  const [visibleButtonEditRgss, setVisibleButtonEditRgss] = useState<boolean>(
    false,
  );

  const [
    visibleButtonEditBirdthDate,
    setVisibleButtonEditBirdthDate,
  ] = useState<boolean>(false);

  const changerInit = useCallback(() => {
    setVisibleButtonEditCpf(true);
    setDisabledCpf(true);

    setVisibleButtonEditRg(true);
    setDisabledRg(true);

    setVisibleButtonEditRgss(true);
    setDisabledRgss(true);

    setVisibleButtonEditBirdthDate(true);
    setDisabledBirdthDate(true);
  }, [
    setVisibleButtonEditCpf,
    setDisabledCpf,
    setVisibleButtonEditRg,
    setDisabledRg,

    setVisibleButtonEditRgss,
    setDisabledRgss,

    setVisibleButtonEditBirdthDate,
    setDisabledBirdthDate,
  ]);

  const changerCpf = useCallback(() => {
    setDisabledCpf(!disabledCpf);
    const nameInput = formRef.current?.getFieldRef('cpf');
    nameInput.focus();
  }, [setDisabledCpf, disabledCpf, formRef]);

  const changerBirdthDate = useCallback(() => {
    setDisabledBirdthDate(!disabledBirdthDate);

    const nameInputBirdthDate = formRef.current?.getFieldRef('birdthDate');
    nameInputBirdthDate.focus();
  }, [setDisabledBirdthDate, disabledBirdthDate, formRef]);

  const changerRg = useCallback(() => {
    setDisabledRg(!disabledRg);
    const nameInputRg = formRef.current?.getFieldRef('rg');
    nameInputRg.focus();
  }, [setDisabledRg, disabledRg, formRef]);

  const changerRgss = useCallback(() => {
    setDisabledRgss(!disabledRgss);
    const nameInputRgss = formRef.current?.getFieldRef('rgss');

    nameInputRgss.focus();
  }, [setDisabledRgss, disabledRgss, formRef]);

  const loadPerson = useCallback(async () => {
    const { data } = await api.get(`persons/${user.person.id}`);

    const { id, birdth_date, cpf, rg, rgss } = data;

    if (cpf.length > 0) {
      changerInit();

      formRef.current?.setData({
        birdthDate: masks.dateMask.maskDefault(birdth_date),
        cpf: masks.cpfByMask.maskDefault(cpf),
        rg,
        rgss,
      });
    }
    setPerson({
      id,
      documents: {
        birdthDate: birdth_date,
        cpf,
        rg,
        rgss,
      },
    });
  }, [user, setPerson, formRef, changerInit]);

  useEffect(() => {
    if (Object.keys(person).length !== 0) return;
    loadPerson();
  }, [loadPerson, person]);

  const handleSubmit = useCallback(
    async (data: IDocuments) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          birdthDate: schemaValidationDate,
          cpf: schemaValidationCpf,
          rg: Yup.string().required('RG obrigatório'),
          rgss: Yup.string().required('Órgão de expedição obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const newData = {
          ...data,
          rg: onlyNumbers(data.rg),
          rgss: onlyLetters(data.rgss),
        };

        await api.put('persons/documents', newData);

        history.push(authRoutes.orders);

        addToast({
          type: 'success',
          title: 'Perfil atualizando',
          description:
            'Suas informações do perfil foram atualizados com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
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

  const buttonHidderRg = () => {
    return (
      visibleButtonEditRg !== false && (
        <button type="button" onClick={() => changerRg()}>
          <span>
            <FiEdit />
          </span>
        </button>
      )
    );
  };

  const buttonHidderRgss = () => {
    return (
      visibleButtonEditRgss !== false && (
        <button type="button" onClick={() => changerRgss()}>
          <span>
            <FiEdit />
          </span>
        </button>
      )
    );
  };

  const buttonHidderBirdthDate = () => {
    return (
      visibleButtonEditBirdthDate !== false && (
        <button type="button" onClick={() => changerBirdthDate()}>
          <span>
            <FiEdit />
          </span>
        </button>
      )
    );
  };

  return (
    <Layout>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Header>
          <h2>Meus Documentos!</h2>

          <Button type="submit">
            <span>
              <FiCheck />
            </span>
            <strong>Salvar</strong>
          </Button>
        </Header>

        <fieldset>
          <legend>
            Dados{' '}
            {visibleButtonEditCpf !== true && `[Completer o seu cadastro]`}
          </legend>

          <ScheduleItemEdit>
            <Input
              id="idCpf"
              name="cpf"
              icon={MdCheck}
              label="CPF"
              placeholder="CPF"
              onChange={masks.cpfByMask.onChange}
              disabled={disabledCpf}
            />
            {visibleButtonEditCpf !== false && (
              <button type="button" onClick={() => changerCpf()}>
                <span>
                  <FiEdit />
                </span>
              </button>
            )}
          </ScheduleItemEdit>
          <ScheduleItemEdit>
            <Input
              id="birdthDate"
              name="birdthDate"
              icon={MdCheck}
              label="Data de Nascimento"
              placeholder="Ex: dd/MM/yyyy"
              onChange={masks.dateMask.onChange}
              disabled={disabledBirdthDate}
            />

            {buttonHidderBirdthDate()}
          </ScheduleItemEdit>
          <ScheduleItemEdit>
            <Input
              placeholder="RG"
              name="rg"
              icon={MdCheck}
              label="RG"
              disabled={disabledRg}
            />
            {buttonHidderRg()}
          </ScheduleItemEdit>
          <ScheduleItemEdit>
            <Input
              placeholder="Órgão Expedidor RG"
              name="rgss"
              icon={MdCheck}
              label="Órgão expedidor RG"
              disabled={disabledRgss}
            />
            {buttonHidderRgss()}
          </ScheduleItemEdit>
        </fieldset>
      </Form>
    </Layout>
  );
};

export default Documents;
